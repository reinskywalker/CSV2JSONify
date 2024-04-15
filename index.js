"use strict";

let csvToJson = require("./src/csvToJson.js");

const encodingOps = {
    utf8: 'utf8',
    ucs2: 'ucs2',
    utf16le: 'utf16le',
    latin1: 'latin1',
    ascii: 'ascii',
    base64: 'base64',
    hex: 'hex'
};

exports.formatValueByType = function (active = true) {
  csvToJson.formatValueByType(active);
  return this;
};

exports.supportQuotedField = function (active = false) {
  csvToJson.supportQuotedField(active);
  return this;
};

exports.fieldDelimiter = function (delimiter) {
  csvToJson.fieldDelimiter(delimiter);
  return this;
};

exports.indexHeader = function (index) {
  csvToJson.indexHeader(index);
  return this;
};

exports.parseSubArray = function (delimiter, separator) {
  csvToJson.parseSubArray(delimiter, separator);
  return this;
};

exports.customEncoding = function (encoding) {
  csvToJson.encoding = encoding;
  return this;
};

exports.utf8Encoding = function utf8Encoding() {
  csvToJson.encoding = encodingOps.utf8;
  return this;
};

exports.ucs2Encoding = function () {
  csvToJson.encoding = encodingOps.ucs2;
  return this;
};

exports.utf16leEncoding = function () {
  csvToJson.encoding = encodingOps.utf16le;
  return this;
};

exports.latin1Encoding = function () {
  csvToJson.encoding = encodingOps.latin1;
  return this;
};

exports.asciiEncoding = function () {
  csvToJson.encoding = encodingOps.ascii;
  return this;
};

exports.base64Encoding = function () {
  this.csvToJson = encodingOps.base64;
  return this;
};

exports.hexEncoding = function () {
  this.csvToJson = encodingOps.hex;
  return this;
};

exports.generate = function(inputFileName, outputFileName) {
  if (!inputFileName) {
    throw new Error("inputFileName is not defined!!!");
  }
  if (!outputFileName) {
    throw new Error("outputFileName is not defined!!!");
  }
  csvToJson.generate(inputFileName, outputFileName);
};

exports.getJsonFromCsv = function(inputFileName) {
  if (!inputFileName) {
    throw new Error("inputFileName is not defined!!!");
  }
  return csvToJson.getJsonFromCsv(inputFileName);
};

exports.csvStringToJson = function(csvString) {
  return csvToJson.csvStringToJson(csvString);
};

exports.jsonToCsv = function(inputFileName, outputFileName) {
  csvToJson.generate(inputFileName, outputFileName);
};
