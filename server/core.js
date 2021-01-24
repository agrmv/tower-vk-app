
const db = require('./db');

class Core {

    async init() {
        // Init mongoDB
        this.db = await db();

        return this;
    }
}

module.exports = function () {
    return (new Core()).init();
};