FROM nginx:latest
MAINTAINER Lei tian <taylor840326@gmail.com>

COPY nginx.conf /etc/nginx/conf.d/proxysql.conf

RUN mkdir -p /usr/share/nginx/static
COPY dist/index.html /usr/share/nginx/html/index.html
COPY dist/index.js /usr/share/nginx/html/index.js
COPY dist/index.css /usr/share/nginx/html/index.css
COPY dist/static/yay.44dd3333.jpg /usr/share/nginx/html/static/yay.44dd3333.jpg


