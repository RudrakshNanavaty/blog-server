FROM nginx:stable

# replace default configuration
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificate and key
COPY ./ssl/nginx-selfsigned.crt /etc/ssl/certs/nginx-selfsigned.crt
COPY ./ssl/nginx-selfsigned.key /etc/ssl/private/nginx-selfsigned.key

EXPOSE 443