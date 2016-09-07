'use strict';

var fileName = 'accounts.txt';
var decodeDigits = {};

processAccounts(fileName);

function processAccounts(file){

  console.log("Starting...");
  createDecodeDigits();

  var fs = require('fs'),
      readline = require('readline'),
      stream = require('stream');

  var indata = fs.createReadStream(file);
  var outdata = new stream;
  outdata.readable = true;
  outdata.writeable = true;

  var rl = readline.createInterface({
    input: indata,
    output: outdata,
    terminal: false
  });

  var l = 0;
  var accounts = new Array();
  var account = new Array(9);
  rl.on('line', function(line){
    var chars = line.match(/.{1,3}/g);
    if (l == 0){
      for(var i in chars){
        account[i] = chars[i];
      }
      l++;
    }
    else if (l < 3) {
      for(var i in chars){
        account[i] += chars[i];
      }
      l++;
    }
    else if (l == 3) {
      l = 0;
      var num = accountsToNum(account);
      accounts.push(num);
      account = new Array(9);
    }
  });
  console.log(accounts);
  console.log("Done");
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
