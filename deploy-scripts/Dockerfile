FROM ubuntu:18.04


RUN apt-get update
RUN apt-get install -y lsof nginx curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs sudo

RUN npm install pm2 -g
#ENV PM2_PUBLIC_KEY cqc9yzqkb8mfxs6
#ENV PM2_SECRET_KEY 4nufp4wclgu3t0e

RUN echo >> /etc/sudoers "dev ALL=NOPASSWD: /app/restart_nginx.sh"

COPY pm2_services.json /app/pm2_services.json
COPY restart_nginx.sh /app/restart_nginx.sh
COPY nginx.sh /app/nginx.sh
RUN chmod +x /app/restart_nginx.sh
RUN chmod +x /app/nginx.sh

RUN useradd -ms /bin/bash dev
USER dev
WORKDIR /app

CMD /app/nginx.sh && pm2-runtime /app/pm2_services.json