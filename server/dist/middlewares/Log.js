"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Log {
    constructor() {
        // Auth tags
        this.TAG_AUTH = 'AUTH';
        this.TAG_SIGNUP = 'SIGNUP';
        this.TAG_LOGIN = 'LOGIN';
        this.TAG_FAILED_CHALLENGE = 'FAILED_CHALLENGE';
        this.TAG_RESTARTED = 'RESTARTED';
        this.TAG_API_ERROR = 'API_ERROR';
        this.today = new Date();
        let _dateString = `${this.today.getFullYear()}-${('0' + (this.today.getMonth() + 1)).slice(-2)}-${('0' + this.today.getDate()).slice(-2)}`;
        let _timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;
        this.baseDir = path.join(__dirname, '../../.logs/');
        this.fileName = `${_dateString}.log`;
        this.linePrefix = `[${_dateString} ${_timeString}]`;
    }
    // Adds INFO prefix string to the log string
    info(_string, tags = []) {
        this.addLog('INFO', _string, tags);
    }
    // Adds WARN prefix string to the log string
    warn(_string, tags = []) {
        this.addLog('WARN', _string, tags);
    }
    // Adds ERROR prefix string to the log string
    error(_string, tags = []) {
        // Line break and show the first line
        console.log('\x1b[31m%s\x1b[0m', '[ERROR] :: ' + _string.split(/r?\n/)[0]);
        this.addLog('ERROR', _string);
    }
    // Adds the custom prefix string to the log string
    custom(_filename, _string) {
        this.addLog(_filename, _string);
    }
    /**
     * Creates the file if does not exist, and
     * append the log kind & string into the file.
     */
    addLog(_kind, _string, tags = []) {
        if (process.env.NODE_ENV === 'development') {
            console.log(_string);
        }
        const _that = this;
        _kind = _kind.toUpperCase();
        const addTags = () => {
            let result = '';
            if (tags) {
                tags.forEach(tag => {
                    result += `[${tag}] `;
                });
            }
            return result;
        };
        fs.open(`${_that.baseDir}${_that.fileName}`, 'a', (_err, _fileDescriptor) => {
            if (!_err && _fileDescriptor) {
                // Append to file and close it
                fs.appendFile(_fileDescriptor, `${_that.linePrefix} [${_kind}] ${addTags()}${_string}\n`, (_err) => {
                    if (!_err) {
                        fs.close(_fileDescriptor, (_err) => {
                            if (!_err) {
                                return true;
                            }
                            else {
                                return console.log('\x1b[31m%s\x1b[0m', 'Error closing log file that was being appended');
                            }
                        });
                    }
                    else {
                        return console.log('\x1b[31m%s\x1b[0m', 'Error appending to the log file');
                    }
                });
            }
            else {
                return console.log('\x1b[31m%s\x1b[0m', 'Error couldn\'t open the log file for appending');
            }
        });
    }
}
exports.default = new Log;
//# sourceMappingURL=Log.js.map