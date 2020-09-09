"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kue = require("kue");
const path = require("path");
const dotenv = require("dotenv");
const Express_1 = require("./Express");
const Database_1 = require("./Database");
const Environment_1 = require("./Environment");
const Log_1 = require("../middlewares/Log");
class App {
    loadConfiguration() {
        Log_1.default.info('Configuration :: Booting @ Master...');
        dotenv.config({ path: path.join(__dirname, '../../.env') });
    }
    loadDatabase() {
        Log_1.default.info('Database :: Booting @ Master...');
        Database_1.Database.init();
    }
    loadServer() {
        Log_1.default.info('Server :: Booting @ Master...');
        Express_1.default.init();
    }
    loadQueue() {
        const isQueueMonitorEnabled = Environment_1.default.get().queueMonitor;
        const queueMonitorPort = Environment_1.default.get().queueMonitorHttpPort;
        if (isQueueMonitorEnabled) {
            kue.app.listen(queueMonitorPort);
            console.log('\x1b[33m%s\x1b[0m', `Queue Monitor :: Running @ 'http://localhost:${queueMonitorPort}'`);
        }
    }
}
exports.default = new App;
//# sourceMappingURL=App.js.map