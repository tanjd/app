FROM php:7.3-apache

COPY . /var/www/html/
COPY ./vhost.conf /etc/apache2/sites-available/000-default.conf
EXPOSE 80
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]