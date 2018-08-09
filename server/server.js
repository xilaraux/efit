import typeof HTTP from 'http';
import type { Server, IncomingMessage, ClientRequest } from 'http';

const http: HTTP = require('http');

type PathHandler = (req: IncomingMessage, res: ClientRequest) => void;

export interface IServer {
    server: Server;
    path: { [path: string]: PathHandler };
    run(port: number): void;
    listen(path: string, handler: PathHandler): void;
}

const NOT_FOUND = '/404';

class ServerImpl implements IServer {
    path;
    server;

    constructor() {
        this.path = {};
        this.server = new http.Server();
    }

    listen(path: string, handler: PathHandler) {
        this.path[path] = handler;
    }

    run(port: number) {
        this.server.on('request', (req, res) => {
            const currentPath = req.url;
            const handler = this.path[currentPath];

            if (handler) {
                handler(req, res);
            } else if (this.path[NOT_FOUND]) {
                this.path[NOT_FOUND](req, res);
            }
        });

        this.server.listen(port, 'localhost');
    }
}

module.exports = new ServerImpl();
