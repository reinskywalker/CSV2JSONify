'use strict';

const fs = require('fs');

class FileHandler {

    readFile(fileInputName, encoding) {
        return fs.readFileSync(fileInputName, encoding).toString();
    }

    writeFile(json, fileOutputName) {
        const start = process.hrtime.bigint();
        fs.writeFile(fileOutputName, json, function (err) {
            const end = process.hrtime.bigint();
            const duration = (end - start) / BigInt(1e6);
            if (err) {
                throw err;
            } else {
                console.log('\x1b[32m', '✔️ ', `Conversion successful: ${fileOutputName} (${duration} ms)`, '\x1b[0m');
            }
        });
    }

}

module.exports = new FileHandler();
