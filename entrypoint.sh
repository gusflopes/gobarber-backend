# entrypoint.sh

# Sequelize Migration
echo -e "\e[92mAguardando inicialização do Postgres" &&\
yarn sequelize db:migrate

# Start server
if [ "$NODE_ENV" = "development" ]; \
	then
    echo -e "\e[92mInicializando Ambiente de desenvolvimento" && \
    yarn dev & \
    yarn queue;  \
	else
    echo -e "\e[92Inicializando Ambiente de produção" && \
    yarn build && \
    pm2 start ecosystem.config.js --no-daemon; \
    # pm2-runtime ecosystem.config.js --only vuttr \
	fi
