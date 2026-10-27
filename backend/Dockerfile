FROM php:8.4.27-apache

WORKDIR /var/www/html

# システムライブラリとComposerを導入
RUN apt-get update && apt-get install -y \
    libzip-dev \
    libxml2-dev \
    libonig-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install \
        mysqli \
        pdo \
        pdo_mysql \
        zip \
        dom \
        gd \
        mbstring \
        xml \
        simplexml \
        xmlreader \
        xmlwriter \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . /var/www/html

# Composerの依存関係をインストール
RUN composer install --no-interaction --prefer-dist

EXPOSE 80

CMD ["apache2-foreground"]