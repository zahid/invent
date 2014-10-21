invent
==============
###### start your own invention.
--------------

This is a tool to jumpstart your nodejs development in conjuntion with mongodb.
Similar to the other generator tools out there, this is a vagrant environment generator.
## tldr;

Install

* [Vagrant](https://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)
* [Chef Development Kit](http://downloads.getchef.com/chef-dk/)

Then:
```
$ vagrant plugin install vagrant-omnibus
$ vagrant plugin install vagrant-berkshelf
$ npm install -g invent
$ invent my_app
$ cd my_app && vagrant up
```
SSH into the VM via `$ vagrant ssh` from the project directory. 

--------------
## Dependancies
So you want to do some application development via vagrant as your environment control, first install some dependancies to get you going:

* [Vagrant](https://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)
* [Chef Development KitK](http://downloads.getchef.com/chef-dk/)
* [vagrant-omnibus](https://github.com/opscode/vagrant-omnibus) plugin
* [vagrant-berkshelf](https://github.com/berkshelf/vagrant-berkshelf) plugin

--------------
## Installation
Then install this module via: 
```
$ npm install -g invent
``` 

--------------
## Usage
Use via:
````
$ invent my_app
```
You can now serve applications out of 192.168.111.111 (as specifed in your *Vagrantfile*)

How it works
* Copies over template files for package.json and the Vagrantfile
* Downloads Trusty 64 from Ubuntu Cloud Images
* Downloads and uncompresses required chef cookbooks

Installs 
* Ubuntu 14.04
    * Node.js
    * npm
    * MongoDB

###### Example webserver
* SSH into the box - `$ vagrant ssh`
* Create the file app.js - `$ vim app.js`
```
/* app.js */
var http = require('http');
var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Start your own invention\n");
});
server.listen(80);
console.log("Server running at http://127.0.0.1:80/");
```
* From the guest machine, run the app - `sudo node app.js` 
* From the host machine, visit - `192.168.111.111`
--------------
## Issues:
There is a known issue with Chef Development Kit installation in regards to Nokogiri on OSX, the Nokogiri team has the solution documented [here](http://www.nokogiri.org/tutorials/installing_nokogiri.html)


If you're having any problems getting this working or have a question / comment, consider submitting an [issue](https://github.com/zahid/invent/issues/new)
