'use strict'
var express = require('express');
var router = express.Router();
const _ = require('underscore');
const utils = require('./../lib/helpers/utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  utils.readFile('lib/files/rainbows.txt').then(fileContents => {
    let fileCounts = {};
    let keys = [];
    let fileWords = fileContents.split(/[^\w']+/);

    for (let word of fileWords) {
      if (!utils.isNumeric(word)) {
        processWord(fileCounts, word.toLowerCase(), keys);
      }
    }
    sortKeys(keys, fileCounts);

    for (let key of keys) {
      console.log(key + " : " + fileCounts[key]);
    }
    res.render('wordcount/index',
      { title: 'wordcount'
      , keys: keys
      , fileCounts: fileCounts
    });
  }).catch(err => {
    console.log("An error... ");
    console.dir(err);
  });
});

function processWord(fileCounts, word, keys) {
  if (fileCounts[word] === undefined) {
    fileCounts[word] = 1;
    keys.push(word);
  } else {
    fileCounts[word] += 1;
  }
}

function sortKeys(keys, fileCounts) {
  return keys.sort(compare);

  function compare (a, b) {
    let countA = fileCounts[a];
    let countB = fileCounts[b];
    return countB - countA;
  }
}

module.exports = router;
