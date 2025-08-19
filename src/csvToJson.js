"use strict";

let SetFile = require("./util/setFile");
let SetStrings = require("./util/setStrings");
let setJsons = require("./util/setJson");

const newLine = /\r?\n/;
const defaultFieldDelimiter = ";";

class CsvToJson {

    formatValueByType(active) {
        this.printValueFormatByType = active;
        return this;
    }

    supportQuotedField(active) {
        this.isSupportQuotedField = active;
        return this;
    }

    fieldDelimiter(delimiter) {
        this.delimiter = delimiter;
        return this;
    }

    indexHeader(indexHeader) {
        if (isNaN(indexHeader)) {
            throw new Error('The index Header must be a Number!');
        }
        this.indexHeader = indexHeader;
        return this;
    }


    parseSubArray(delimiter = '*', separator = ',') {
        this.parseSubArrayDelimiter = delimiter;
        this.parseSubArraySeparator = separator;
    }

    encoding(encoding) {
        this.encoding = encoding;
        return this;
    }

    generate(fileInputName, fileOutputName) {
        let jsonStringified = this.getJsonFromCsvStringified(fileInputName);
        SetFile.writeFile(jsonStringified, fileOutputName);
    }

    getJsonFromCsvStringified(fileInputName) {
        let json = this.getJsonFromCsv(fileInputName);
        let jsonStringified = JSON.stringify(json, null, 2);
        setJsons.validateJson(jsonStringified);
        return jsonStringified;
    }

    getJsonFromCsv(fileInputName) {
        let parsedCsv = SetFile.readFile(fileInputName, this.encoding);
        return this.csvToJson(parsedCsv);
    }

    csvStringToJson(csvString) {
        return this.csvToJson(csvString);
    }

    csvToJson(parsedCsv) {
        this.validateInputConfig();
        const lines = parsedCsv.split(newLine);
        const fieldDelimiter = this.getFieldDelimiter();
        let index = this.getIndexHeader();
        let headers;

        if (this.isSupportQuotedField) {
            headers = this.split(lines[index]);
        } else {
            headers = lines[index].split(fieldDelimiter);
        }

        while (!SetStrings.hasContent(headers) && index < lines.length - 1) {
            index++;
            headers = this.isSupportQuotedField ?
                this.split(lines[index]) :
                lines[index].split(fieldDelimiter);
        }

        const jsonResult = [];
        for (let i = index + 1; i < lines.length; i++) {
            let currentLine;
            if (this.isSupportQuotedField) {
                currentLine = this.split(lines[i]);
            } else {
                currentLine = lines[i].split(fieldDelimiter);
            }
            if (SetStrings.hasContent(currentLine)) {
                jsonResult.push(this.buildJsonResult(headers, currentLine));
            }
        }
        return jsonResult;
    }


    getFieldDelimiter() {
        if (this.delimiter) {
            return this.delimiter;
        }
        return defaultFieldDelimiter;
    }

    getIndexHeader() {
        if (this.indexHeader !== null && !isNaN(this.indexHeader)) {
            return this.indexHeader;
        }
        return 0;
    }

    buildJsonResult(headers, currentLine) {
        let jsonObject = {};
        for (let j = 0; j < headers.length; j++) {
            let propertyName = SetStrings.trimPropertyName(headers[j]);
            let value = currentLine[j];

            if (this.isParseSubArray(value)) {
                value = this.buildJsonSubArray(value);
            }

            if (this.printValueFormatByType && !Array.isArray(value)) {
                value = SetStrings.getValueFormatByType(currentLine[j]);
            }

            jsonObject[propertyName] = value;
        }
        return jsonObject;
    }

    buildJsonSubArray(value) {
        const extractedValues = value.substring(
            value.indexOf(this.parseSubArrayDelimiter) + 1,
            value.lastIndexOf(this.parseSubArrayDelimiter)
        );
        extractedValues.trim();
        value = extractedValues.split(this.parseSubArraySeparator);
        if (this.printValueFormatByType) {
            for (let i = 0; i < value.length; i++) {
                value[i] = SetStrings.getValueFormatByType(value[i]);
            }
        }
        return value;
    }

    isParseSubArray(value) {
        if (this.parseSubArrayDelimiter) {
            if (value && (value.indexOf(this.parseSubArrayDelimiter) === 0 && value.lastIndexOf(this.parseSubArrayDelimiter) === (value.length - 1))) {
                return true;
            }
        }
        return false;
    }

    validateInputConfig() {
        if (this.isSupportQuotedField) {
            const fieldDelimiter = this.getFieldDelimiter();
            const subArraySeparator = this.parseSubArraySeparator;
            const subArrayDelimiter = this.parseSubArrayDelimiter;

            if (fieldDelimiter === '"') {
                throw new Error('The field delimiter cannot be a double quote (") when SupportQuotedFields is enabled.');
            }
            if (subArraySeparator === '"') {
                throw new Error('The field parseSubArraySeparator cannot be a double quote (") when SupportQuotedFields is enabled.');
            }
            if (subArrayDelimiter === '"') {
                throw new Error('The field parseSubArrayDelimiter cannot be a double quote (") when SupportQuotedFields is enabled.');
            }
        }
    }


    hasQuotes(line) {
        return line.includes('"');
    }

    split(line) {
        if (line.length === 0) {
            return [];
        }

        const delim = this.getFieldDelimiter();
        const subSplits = [''];

        if (this.hasQuotes(line)) {
            const chars = line.split('');
            let subIndex = 0;
            let inQuotes = false;
            let isEscapedQuote = false;

            chars.forEach((char, index) => {
                if (isEscapedQuote) {
                    subSplits[subIndex] += char;
                    isEscapedQuote = false;
                } else if (char === '"') {
                    if (chars[index + 1] === '"') {
                        isEscapedQuote = true;
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (char === delim && !inQuotes) {
                    subIndex++;
                    subSplits[subIndex] = '';
                } else {
                    subSplits[subIndex] += char;
                }
            });

            if (inQuotes) {
                throw new Error('Row contains mismatched quotes!');
            }

            return subSplits;
        } else {
            return line.split(delim);
        }
    }

}

module.exports = new CsvToJson();