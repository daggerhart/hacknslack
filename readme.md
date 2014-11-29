all from the folder that contains vagrant box

vagrant up		// restart + check provision
vagrant provision	// rechecks config of vagrant

vagrant halt		// stop

vagrant resume		// resume

vagrant ssh 		// ssh into vagrant (as sudoer)

For windows-- install git and add "C:\%whatever git dir is%\bin" to user path

Add the line
192.168.56.101	hacknslack.dev
192.168.56.101	node.dev
to c:\windows\system32\drivers\etc\hosts

In vagrant:
cd /var/www/hacknslack.dev
node app.js

Bitbucket:
bitbucket.org (/daggerhart/hacknslack)
