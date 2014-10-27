var fs = require('fs');
var path = require('path');

exports = module.exports = new Invent();
exports.invent = Invent;

function Invent(options) {
    options || (options = {});
    this.name = options.name || 'invent';
    this.destination = options.name || '.';
    this.color = options.color || true;
    this.force = options.force || false;
    this.templatePath = path.join(__dirname, '..', 'templates');
};

function isEmpty(path, cb) {
    fs.readdir(path, function (err, files) {
        if (err && 'ENOENT' !== err.code) {
            throw err;
        }
        cb(!files || !files.length);
    });
};

Invent.prototype.create = function (destination) {
    process.on('exit', function (code) {
        if (code === 0) {
            console.log();
            console.log(' getting started :');
            console.log(' $ cd ' + destination + ' && vagrant up');
            console.log(' $ vagrant ssh');
            console.log();
            if (this.color) {
                console.log(' \x1b[36mstart inventing ;)\x1b[0m');
            } else {
                console.log(' start inventing ;)');
            }
            console.log();
        }
    });
    mkdir(destination, function () {
        writeTemplate('Vagrantfile');
        writeTemplate('package.json');
        writeTemplate('Berksfile');
    });
};

Invent.prototype.write = function (destination, content, mode) {
    fs.writeFile(destination, content, { mode: mode || 0666 });
    if (this.color) {
        console.log(' \x1b[36mcreated\x1b[0m : ' + destination);
    } else {
        console.log(' created : ' + destination);
    }
};

Invent.prototype.writeTemplate = function (template) {
    var template = fs.readFileSync(
            path.join(templatePath, template), 'utf-8'
        ).replace('{appName}', this.appName);
    write(path.join(destinationPath, template), template);
};

Invent.prototype.mkdir = function (path, cb) {
    mkdirp(path, 0755, function (err) {
    if (err) {
        throw err;
    }
    if (program.color) {
        console.log(' \033[36mcreated\033[0m : ' + path);
    } else {
        console.log(' created : ' + path);
    }
    cb && cb();
    });
}
