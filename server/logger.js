class Logger {
    constructor() {
        this.messages = {};
    }

    create(module) {
        if (typeof module !== 'string') {
            throw TypeError(`Cannot register logger with ${module} module name.`);
        }

        this.messages[module] = [];

        return (message) => {
            this.messages[module].push(message);
        };
    }

    read(module) {
        if (!this.messages[module]) {
            return '';
        }

        return this.messages[module].join('\n');
    }
}

module.exports = new Logger();
