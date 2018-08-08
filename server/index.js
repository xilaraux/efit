const url = require('url');
const server = require('./server');
const logger = require('./logger');

server.listen('/', (req, res) => {
    res.end('root');
});

server.listen('/main', (req, res) => {
    res.end('main');
});

server.listen('/logger', (req, res) => {
    const URL = url.parse(req.url, true);
    const module = URL.query.module;

    res.end(logger.read(module));
});

server.run(3000);
