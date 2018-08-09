import type { IServer } from './server';

const server: IServer = require('./server');
const { server: { port } } = require('../config.json');

server.listen('/', (req, res) => {
    res.end('root');
});

server.listen('/main', (req, res) => {
    res.end('main');
});

server.listen('/404', (req, res) => {
    res.end('404');
});

console.log(`Server is running on the port ${port}.`);
server.run(port);
