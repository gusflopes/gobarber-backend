import * as Yup from 'yup';
import aws from 'aws-sdk';
import File from '../models/File';
import User from '../models/User';

const s3 = new aws.S3();

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { avatar_id } = req.body;
    if (avatar_id) {
      console.log('ALTERANDO AVATAR_ID!!');

      // Buscar os dados antes do Update
      console.log(`user Atual: ${JSON.stringify(user)}`);

      const { id: avatarDestroy, path: avatarPath } = user.avatar;

      console.log(`Avatar: ${avatarDestroy} e Path: ${avatarPath}`);

      await user.update(req.body);

      // Deletar o Avatar antigo no SQL
      File.destroy({
        where: {
          id: avatarDestroy,
        },
      });

      // Delete Avatar antigo na AWS
      if (process.env.STORAGE_TYPE === 's3') {
        s3.deleteObject(
          {
            Bucket: 'godent',
            Key: avatarPath,
          },
          async err => {
            if (err) console.log(err, err.stack);
            // an error occurred
            else console.log('File deleted'); // successful response
          }
        );
      }
    }

    const { id, name, avatar, provider } = await User.findByPk(req.userId, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json({
      id,
      name,
      email,
      avatar,
      provider,
    });
  }
}

export default new UserController();
