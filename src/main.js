'use strict';

const req = require('request');
const fs = require('fs');
const csvSync = require('csv-parse/lib/sync');
const log4js = require('log4js');
const config = require('config');

log4js.configure('log4jsConfig.json');


// Errorロガー
const errorLogger = log4js.getLogger('error');

// パラメータ
const file = process.argv[2]      // 読み込むデータファイルのパス
const apiUrl = process.argv[3]    // Elasticsearchの対象Indexのエンドポイント


// CSV読み込み
let data = fs.readFileSync(file);

let csv = csvSync(data, {
  columns: true
});


//ESにデータ投入
csv.forEach(function(csv_record){

  var opts = {
    method: 'POST',
    uri: "",
    headers: {
      "Content-type": "application/json",
    },
    auth: {
      user: config.auth.user,
      password: config.auth.password
    },
    json: {}
  };

  var doc_id = csv_record._id;
  opts.uri = `${apiUrl}/_doc/${doc_id}`
  opts.json = {"title": csv_record.title}

  req(opts, function (error, response, body) {
    if(body) {
      console.log(body);
    }

    if(error) {
      errorLogger.error(`Error doc_id = ${doc_id}`);
      errorLogger.error(error);
      console.log("Error!!");
    }

  })

});
