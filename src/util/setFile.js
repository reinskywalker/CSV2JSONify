'use strict';

const fs = require('fs');

/**
 * A class for handling file operations.
 */
class FileHandler {

    /**
     * Reads a file synchronously.
     * 
     * @param {string} fileInputName - The name of the input file.
     * @param {string} encoding - The encoding of the file.
     * @returns {string} The content of the file as a string.
     */
    readFile(fileInputName, encoding) {
        return fs.readFileSync(fileInputName, encoding).toString();
    }

    /**
     * Writes JSON data to a file.
     * 
     * @param {string} json - The JSON data to write to the file.
     * @param {string} fileOutputName - The name of the output file.
     */
    writeFile(json, fileOutputName) {
        console.log('\x1b[32m', 'Conversion started!', '\x1b[0m');

        const start = performance.now();

        fs.writeFile(fileOutputName, json, (err) => {
            const end = performance.now();
            const duration = `${(end - start).toFixed(2)} ms`;

            if (err) {
                console.error('\x1b[31m', '✖️ ', `Conversion failed: ${err.message}`, '\x1b[0m');
                throw new Error(`File write failed: ${err.message}`);
            } else {
                console.log('\x1b[32m', '✔️ ', `Conversion successful: ${fileOutputName} (\x1b[36m${duration}\x1b[0m)`, '\x1b[0m');
            }
        });
    }

}

module.exports = new FileHandler();