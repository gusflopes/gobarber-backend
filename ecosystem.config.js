const path = require('path');

module.exports = {
  apps: [
    {
      name: 'gobarber',
      script: 'dist/server.js',
      exec_mode: 'cluster',
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
    },
  ],
};
