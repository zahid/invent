var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

exports = module.exports = new Invent();

function Invent() {
    this.templatePath = path.join(__dirname, 'templates');
};

Invent.prototype.create = function (options) {
    options || (options = {});
    this.name = options.name || 'invent';
    this.destination = options.name || '.';
    this.color = options.color || true;
    this.force = options.force || false;
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
        self.write('Vagrantfile');
        self.write('package.json');
        self.write('Berksfile');
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

Invent.prototype.write = function (template) {
    var contents = fs.readFileSync(
            path.join(this.templatePath, template), 'utf-8'
        ).replace('{appName}', this.name);
    fs.writeFile(path.join(this.destination, template), contents, { mode: 0666 });
    if (this.color) {
        console.log(' \x1b[36mcreated\x1b[0m : ' + path.join(this.destination, template));
    } else {
        console.log(' created : ' + path.join(this.destination, template));
    }
};
