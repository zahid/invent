var program = require('commander');
var Invent = require('./invent.js');

program
    .usage('[options] [destination]')
    .option('-f, --force', 'force on non-empty destination')
    .option('--no-color', 'no colored output')
    .parse(process.argv);
    
var opts = {
	name: program.args.shift() || '.',
	color: program.color,
	force: program.force
};

new Invent(opts).create();
