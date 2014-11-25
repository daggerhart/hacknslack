#!/bin/sh

exec forever start --spinSleepTime 10000 /var/www/node.dev/hello.js >> /var/log/node.dev.log 2>&1

echo "Started node.dev"
