"use strict";

/**
 * @typedef {Object} EncodingOptions
 * @property {string} utf8 - UTF-8 encoding
 * @property {string} ucs2 - UCS-2 encoding
 * @property {string} utf16le - UTF-16LE encoding
 * @property {string} latin1 - Latin-1 encoding
 * @property {string} ascii - ASCII encoding
 * @property {string} base64 - Base64 encoding
 * @property {string} hex - Hex encoding
 */

/** @type {EncodingOptions} */
const encodingOps = {
    utf8: 'utf8',
    ucs2: 'ucs2',
    utf16le: 'utf16le',
    latin1: 'latin1',
    ascii: 'ascii',
    base64: 'base64',
    hex: 'hex'
};

const csvToJson = require("./src/csvToJson.js");

/**
 * Sets whether to format the values by their types.
 * @param {boolean} [active=true] - Boolean indicating whether to format values by types.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.formatValueByType = function (active = true) {
    csvToJson.formatValueByType(active);
    return this;
};

/**
 * Sets whether to support quoted fields.
 * @param {boolean} [active=false] - Boolean indicating whether to support quoted fields.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.supportQuotedField = function (active = false) {
    csvToJson.supportQuotedField(active);
    return this;
};

/**
 * Sets the field delimiter.
 * @param {string} delimiter - The field delimiter to be used.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.fieldDelimiter = function (delimiter) {
    csvToJson.fieldDelimiter(delimiter);
    return this;
};

/**
 * Sets the index of the header.
 * @param {number} index - The index of the header.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.indexHeader = function (index) {
    csvToJson.indexHeader(index);
    return this;
};

/**
 * Sets the delimiter and separator for parsing sub-arrays.
 * @param {string} delimiter - The delimiter for sub-arrays.
 * @param {string} separator - The separator for sub-arrays.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.parseSubArray = function (delimiter, separator) {
    csvToJson.parseSubArray(delimiter, separator);
    return this;
};

/**
 * Sets a custom encoding.
 * @param {string} encoding - The custom encoding to be used.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.customEncoding = function (encoding) {
    csvToJson.encoding = encoding;
    return this;
};

// Methods for setting specific encodings

/**
 * Sets UTF-8 encoding.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.utf8Encoding = function () {
    csvToJson.encoding = encodingOps.utf8;
    return this;
};

/**
 * Sets UCS-2 encoding.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.ucs2Encoding = function () {
    csvToJson.encoding = encodingOps.ucs2;
    return this;
};

/**
 * Sets UTF-16LE encoding.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.utf16leEncoding = function () {
    csvToJson.encoding = encodingOps.utf16le;
    return this;
};

/**
 * Sets Latin-1 encoding.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.latin1Encoding = function () {
    csvToJson.encoding = encodingOps.latin1;
    return this;
};

/**
 * Sets ASCII encoding.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.asciiEncoding = function () {
    csvToJson.encoding = encodingOps.ascii;
    return this;
};

/**
 * Sets Base64 encoding.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.base64Encoding = function () {
    this.csvToJson = encodingOps.base64;
    return this;
};

/**
 * Sets Hex encoding.
 * @returns {Object} - Returns the current instance for method chaining.
 */
exports.hexEncoding = function () {
    this.csvToJson = encodingOps.hex;
    return this;
};

/**
 * Generates JSON from a CSV file.
 * @param {string} inputFileName - The input CSV file name.
 * @param {string} outputFileName - The output JSON file name.
 * @throws {Error} - Throws an error if inputFileName or outputFileName is not defined.
 */
exports.generate = function (inputFileName, outputFileName) {
    if (!inputFileName) {
        throw new Error("inputFileName is not defined!!!");
    }
    if (!outputFileName) {
        throw new Error("outputFileName is not defined!!!");
    }
    csvToJson.generate(inputFileName, outputFileName);
};

/**
 * Retrieves JSON from a CSV file.
 * @param {string} inputFileName - The input CSV file name.
 * @returns {Object} - Returns the JSON parsed from the CSV file.
 * @throws {Error} - Throws an error if inputFileName is not defined.
 */
exports.getJsonFromCsv = function (inputFileName) {
    if (!inputFileName) {
        throw new Error("inputFileName is not defined!!!");
    }
    return csvToJson.getJsonFromCsv(inputFileName);
};

/**
 * Converts CSV string to JSON.
 * @param {string} csvString - The CSV string to be converted.
 * @returns {Array<Object>} - Returns an array of JSON objects parsed from the CSV string.
 */
exports.csvStringToJson = function (csvString) {
    return csvToJson.csvStringToJson(csvString);
};

/**
 * Generates CSV from JSON.
 * @param {string} inputFileName - The input JSON file name.
 * @param {string} outputFileName - The output CSV file name.
 */
exports.jsonToCsv = function (inputFileName, outputFileName) {
    csvToJson.generate(inputFileName, outputFileName);
};
