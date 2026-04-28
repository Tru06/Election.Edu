#!/bin/sh

# Generate nginx.conf with the correct PORT
sed "s/listen 80;/listen $PORT;/" /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

# Start nginx
nginx -g "daemon off;"
