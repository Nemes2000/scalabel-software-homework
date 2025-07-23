FROM debian:bullseye-slim

RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    nginx \
    openssl \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/local/share/ca-certificates/

COPY localhost.crt /usr/local/share/ca-certificates/localhost.crt
COPY localhost.crt /etc/ssl/certs/
COPY localhost.key /etc/ssl/private/

RUN update-ca-certificates

COPY ssl_common.conf /etc/nginx/conf.d/
COPY cors_headers.conf /etc/nginx/conf.d/
COPY proxy_headers.conf /etc/nginx/conf.d/
COPY nginx-proxy-https.conf /etc/nginx/nginx.conf

EXPOSE 2000 2001

CMD ["nginx", "-g", "daemon off;"]