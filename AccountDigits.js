'use strict';

var fileName = 'accounts.txt';
var decodeDigits = {};

createDecodeDigits();
readInFile(fileName, processFile);

function readInFile(file, callback){
  var indata, outdata;
  var fs = require('fs'),
      readline = require('readline'),
      stream = require('stream');

  indata = fs.createReadStream(file);
  outdata = new stream;
  outdata.readable = true;
  outdata.writeable = true;

  var rl = readline.createInterface({
    input: indata,
    output: outdata,
    terminal: false
  });

  var fileData = [];
  rl.on('line', function(line){
    fileData.push(line);
  }).on('close', () => {
    callback(fileData);
    process.exit(0);
  });
}

function processFile(data){
  var accounts = [];
  var account = new Array(9);
  for(var i = 0; i < data.length; i++) {
    if(((i + 1) % 4) == 0) {
      var num = accountsToNum(account);
      accounts.push(num);
      account = new Array(9);
    } else {
      buildAccountNumber(data[i], account);
    }
  }
  console.log(accounts);
  console.log("Done");
}

function buildAccountNumber(acc_line, account){
  var chars = acc_line.match(/.{1,3}/g);
  for(var i in chars){
    if (account[i]) {
      account[i] += chars[i];
    } else {
      account[i] = chars[i];
    }
  }
}

function accountsToNum (account){
  var accNum = '';
  for (var d in account){
    accNum += decodeDigits[account[d]];
  }
  return accNum;
}

function createDecodeDigits(){
  // 1
  decodeDigits[
    "   " +
    "  |" +
    "  |"] = 1;
  // 2
  decodeDigits[
    " _ " +
    " _|" +
    "|_ "] = 2 ;
  // 3
  decodeDigits[
    " _ " +
    " _|" +
    " _|"] = 3 ;
  // 4
  decodeDigits[
    "   " +
    "|_|" +
    "  |"] = 4;
  // 5
  decodeDigits[
    " _ " +
    "|_ " +
    " _|"] = 5;
  // 6
  decodeDigits[
    " _ " +
    "|_ " +
    "|_|"] = 6;
  // 7
  decodeDigits[
    " _ " +
    "  |" +
    "  |"] = 7;
  // 8
  decodeDigits[
    " _ " +
    "|_|" +
    "|_|"] = 8;
  // 9
  decodeDigits[
    " _ " +
    "|_|" +
    " _|"] = 9;
  // 0
  decodeDigits[
    " _ " +
    "| |" +
    "|_|"] = 0;
}
