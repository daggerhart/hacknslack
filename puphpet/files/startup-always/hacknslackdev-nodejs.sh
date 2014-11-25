#!/bin/sh

exec forever start --spinSleepTime 10000 /var/www/hacknslack.dev/server.js >> /var/log/hacknslack.dev.log 2>&1

echo "Started hacknslack.dev"
