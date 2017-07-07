const Table = require('cli-table2');
const { Suite } = require('benchmark');
const lodash = require('lodash.find');
const curr = require('../');

const bench = new Suite();
const bar = obj => obj.name === 'cherries';
const foo = [
	{ name:'apples', quantity:2 },
	{ name:'bananas', quantity:0 },
	{ name:'cherries', quantity:5 }
];

bench
	.add('native', () => foo.find(bar))
	.add('current', () => curr(foo, bar))
	.add('lodash.find', () => lodash(foo, bar))
	.on('complete', function() {
		console.log('Fastest is ' + this.filter('fastest').map('name'));

		const tbl = new Table({
			head: ['Name', 'Mean time', 'Ops/sec', 'Diff']
		});

		let prev, diff;

		bench.forEach(el => {
			if (prev) {
				diff = ((el.hz - prev) * 100 / prev).toFixed(2) + '% faster';
			} else {
				diff = 'N/A'
			}
			prev = el.hz;
			tbl.push([el.name, el.stats.mean, el.hz.toLocaleString(), diff])
		});
		console.log(tbl.toString());
	})
	.run();