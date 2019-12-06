# entrypoint.sh

# Sequelize Migration
echo -e "\e[92mAguardando inicialização do Postgres" &&\
npx sequelize db:migrate

# Start server
if [ "$NODE_ENV" = "development" ]; \
	then
    echo -e "\e[92mInicializando Ambiente de desenvolvimento" &&
    yarn dev;  \
	else
    yarn build && \
    npx pm2 start ecosystem.config.js --no-daemon; \
    # pm2-runtime ecosystem.config.js --only vuttr \
	fi
