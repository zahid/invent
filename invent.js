var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

exports = module.exports = Invent;

function Invent(options) {
    options || (options = {});
    this.name = options.name || 'invent';
    this.destination = options.name || '.';
    this.color = options.color || true;
    this.force = options.force || false;
    this.templatePath = path.join(__dirname, 'templates');
};

Invent.prototype.create = function () {
    var self = this;
    process.on('exit', function (code) {
        if (code === 0) {
            console.log();
            console.log(' getting started :');
            console.log(' $ cd ' + self.destination + ' && vagrant up');
            console.log(' $ vagrant ssh');
            console.log();
            if (self.color) {
                console.log(' \x1b[36mstart inventing ;)\x1b[0m');
            } else {
                console.log(' start inventing ;)');
            }
            console.log();
        }
    });
    this.mkdir(this.destination, function () {
        self.writeTemplate('Vagrantfile');
        self.writeTemplate('package.json');
        self.writeTemplate('Berksfile');
    });
};

Invent.prototype.mkdir = function (destination, cb) {
    mkdirp(destination, 0755, function (err) {
    if (err) {
        throw err;
    }
    if (this.color) {
        console.log(' \033[36mcreated\033[0m : ' + destination);
    } else {
        console.log(' created : ' + destination);
    }
    cb && cb();
    });
};

Invent.prototype.writeTemplate = function (template) {
    var contents = fs.readFileSync(
            path.join(this.templatePath, template), 'utf-8'
        ).replace('{appName}', this.name);
    this.write(path.join(this.destination, template), contents);
};

Invent.prototype.write = function (destination, content, mode) {
    fs.writeFile(destination, content, { mode: mode || 0666 });
    if (this.color) {
        console.log(' \x1b[36mcreated\x1b[0m : ' + destination);
    } else {
        console.log(' created : ' + destination);
    }
};
