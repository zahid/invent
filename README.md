invent
==============

###### start your own invention.
[![Build Status](https://travis-ci.org/zahid/invent.svg?branch=master)](https://travis-ci.org/zahid/invent)

This is a tool to jumpstart your Node.js development in conjunction with MongoDB.
Similar to the other generator tools out there, this is a vagrant environment generator.

## tl;dr
Install

* [Vagrant](https://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)
* [Chef Development Kit](http://downloads.getchef.com/chef-dk/)

Then:

```shell
$ vagrant plugin install vagrant-omnibus
$ vagrant plugin install vagrant-berkshelf
$ npm install -g invent
$ invent my_app
$ cd my_app && vagrant up
```

SSH into the VM via `vagrant ssh` from the project directory. 

## Dependencies
So you want to do some application development via vagrant as your environment control, first install some dependencies to get you going:

Ruby v1.9 or higher is required for this to work.

* [Vagrant](https://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)
* [Chef Development Kit](http://downloads.getchef.com/chef-dk/)
* [vagrant-omnibus](https://github.com/opscode/vagrant-omnibus) plugin
* [vagrant-berkshelf](https://github.com/berkshelf/vagrant-berkshelf) plugin

## Installation
Then install this module via: 

```shell
$ npm install -g invent
``` 

## Usage
Use via:

````shell
$ invent my_app
```

You can now serve applications out of 192.168.111.111 (as specified in your *Vagrantfile*)

How it works
* Copies over template files for package.json and the Vagrantfile
* Downloads a Trusty 64 Vagrant basebox from Ubuntu Cloud Images
* Downloads and uncompresses required chef cookbooks via Berkshelf

Installs 
* Ubuntu 14.04
    * Node.js
    * npm
    * MongoDB

###### Example webserver
* SSH into the box - `$ vagrant ssh`
* Create the file app.js - `$ vim app.js`

```javascript
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

## API
To access the API, check out the [bin/invent](bin/invent) file for a primer.

### Class Invent
Main class for the Invent module

### Invent.create([options])
Triggers the invent class to create a new project

`@options`- possible fields:

`name`: String- name of project to build. Default ```'invent'```

`color`: Boolean- specify color output. Default ```true```

`force`: Boolean- force generation on non-empty directory. Default ```false```

## Issues
There is a known issue with Chef Development Kit installation in regards to Nokogiri on OSX, the Nokogiri team has the solution documented [here](http://www.nokogiri.org/tutorials/installing_nokogiri.html)


If you're having any problems getting this working or have a question / comment, consider submitting an [issue](https://github.com/zahid/invent/issues/new)
