"use strict"
// const self = module.exports;

const Promise = require('bluebird');
const fs = Promise.promisify(require("fs").readFile);

exports.readFile = function(file) {
  return fs(file, 'utf8').then(fileContents => {
    return fileContents;
  });
}

exports.isNumeric = function(str) {
  if (/\d+/.test(str)) {
    return true;
  } else {
    return false;
  }
}
