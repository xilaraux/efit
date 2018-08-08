const url = require('url');
const http = require('http');
const logger = require('./logger').create('server');

class Server {
    constructor() {
        this.path = {};
        this.server = suppressEmit(new http.Server());
    }

    listen(path, handler) {
        this.path[path] = handler;
    }

    run(port) {
        this.server.on('request', (req, res) => {
            const currentURL = url.parse(req.url);
            const currentPath = currentURL.pathname;
            const handler = this.path[currentPath];

            if (handler) {
                handler(req, res);
            }
        });

        this.server.listen(port, 'localhost');
    }
}

function suppressEmit(server) {
    const emit = server.emit;

    server.emit = function(event) {
        logger(`${event} \t ${new Date()}`);
        emit.apply(server, arguments);
    };

    return server;
}

module.exports = new Server();
