## VM Setup ##

Open a terminal and browse to the folder that contains this repository.  
Type 
```
vagrant up
```

Find something to do for 20 minutes. It will take about that long for it to download and spin up the VM.

### For windows ###

Install git - http://git-scm.com/download/win

Add git's bin to your system path so vagrant ssh will work:

Right click computer > properties > advanced system settings > advanced tab > environment variables button > edit path variable:
and add "C:\%whatever git dir is%\bin" to user path.  eg,  C:\Program Files (x86)\Git\bin

Open the following file as an administrator `c:\windows\system32\drivers\etc\hosts`

Add the lines:

```
192.168.56.101	hacknslack.dev
192.168.56.101	node.dev
```

## SSH into the new VM and start node.js ##

In your terminal, within this repo's directory, login to the vm with:

```
vagrant ssh
```

Then browse to the hackNslack directory:

```
cd /var/www/hacknslack.dev
```

And start the node.js server:

```
node app.js
```

To stop the node server press: `CTRL + C`

Bitbucket: bitbucket.org (/daggerhart/hacknslack)


### Vagrant Commands ###

These commands should be run from within this repo's directory.

* `vagrant up` - Start & check config VM 
* `vagrant provision` - Rechecks config of VM
* `vagrant halt` - Stop the VM
* `vagrant resume` - Resume a halted VM
* `vagrant ssh` - SSH into VM (as sudoer)