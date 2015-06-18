var config = require('../config');

var express = require('express');
var router = express.Router();

var DocumentDBClient = require('documentdb').DocumentClient;
var async = require('async');

var docDbClient = new DocumentDBClient(config.documentDB.host, {
    masterKey: config.documentDB.authKey
});

var Lecture = require('../models/lecture');
var lecture_model = new Lecture(
  docDbClient,
  config.documentDB.databaseId,
  config.documentDB.collectionId
);
lecture_model.init();

router.get('/', function(req, res, next) {
  lecture_model.findAll(function(err, items) {
    if (err) { throw(err); }
    
    res.render('index', {
      title: 'Open Cloud BBQ 2015',
      lectures: items
    });
  });
});

router.post('/lecture', function(req, res) {
  var item = req.body,
      today = new Date(),
      time = item.time.split(":");
  
  console.log(item);
  
  item.date = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    time[0],
    time[1],
    today.getSeconds()
  );
  
  lecture_model.addItem(item, function(err) {
    if (err) { throw(err); return; }
    res.redirect('/');
  });
});

router.post('/lecture/delete/:id', function(req, res) {
  var id = req.params.id;
  lecture_model.deleteItem(id, function(err) {
    if (err) { throw(err); }
    res.redirect('/');
  });
});

module.exports = router;
