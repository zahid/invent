invent
==============
#### start your own invention.
--------------


This is a tool to jumpstart your nodejs development in conjuntion with mongodb.
Similar to the express-generator, this is a vagrant generator. 

install via: 

    npm install -g invent
    
Use via:

    invent my_app


How it works

* Copies over template files for package.json and the Vagrantfile
* Downloads and untars required chef cookbooks

Requires

    Vagrant Version 1.6.2
    VirtualBox Version 4.3.12

Installs 
* nodejs version 0.10.31
* npm version 1.4.23
* mongodb version @latest
