import { startOfHour, parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import User from '../models/User';
import Notification from '../schemas/Notification';
import Appointment from '../models/Appointment';

class CreateAppointmentService {
  async run({ provider_id, user_id, date }) {
    /**
     * Check if provider_id is a provider
     */
    const checkisProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkisProvider) {
      throw new Error('401 You can only create appointments with providers');
    }

    /** *
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      throw new Error('400 Past date are not permitted.');
    }

    /** *
     * Check date availability
     */
    const checkAvailability = await Appointment.findOne({
      where: { provider_id, canceled_at: null, date: hourStart },
    });

    if (checkAvailability) {
      throw new Error('Appointment time is not available.');
    }

    // Store at the database
    const appointment = await Appointment.create({
      user_id,
      provider_id,
      date,
    });

    /** *
     * Notify appointment provider
     */
    const user = await User.findByPk(user_id);
    const formattedDate = format(hourStart, "dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });

    /* const notification = */ await Notification.create({
      content: `Novo agendamento de ${user.name} para ${formattedDate}.`,
      user: provider_id,
    });

    /** *
     * Notifications via Socket.io
     */

    /* const ownerSocket = req.connectedUsers[provider_id];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('notification', notification);
    }
    */
    return appointment;
  }
}

export default new CreateAppointmentService();
