const http = require('http');
const fs = require('fs');
const serve = http.createServer();

serve.on('request', (req, res) => {
	console.log(req.url);
	if (req.url === '/') {
		fs.readFile('./index.html', 'utf-8', (err, data) => res.end(data));
	}
	if (req.url === '/dist/mini-axios.js')
		fs.readFile('../dist/mini-axios.js', 'utf-8', (err, data) => res.end(data));
	if (req.url === '/dist/lib-ts_adapters_xhr_ts.mini-axios.js')
		fs.readFile(
			'../dist/lib-ts_adapters_xhr_ts.mini-axios.js',
			'utf-8',
			(err, data) => res.end(data)
		);
	if (req.url === '/test') {
		// res.end('Test');
		setTimeout(() => res.end('Test'), 5000);
	}
});

serve.listen(8082, () => console.log('服务启动'));
