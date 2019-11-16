const bcrypt = require('bcryptjs');

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Administrador',
          email: 'admin@gobarber.com',
          password_hash: bcrypt.hashSync('123456', 8),
          provider: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Cliente',
          email: 'cliente@gobarber.com',
          password_hash: bcrypt.hashSync('123456', 8),
          provider: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
