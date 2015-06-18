var ddb_utils = require('./documentDBUtils');
var DocumentDBClient = require('documentdb').DocumentClient;

function Lecture(documentDBClient, dbId, collId) {
  this.client = documentDBClient;
  this.dbId = dbId;
  this.collId = collId;

  this.db = null;
  this.coll = null;
}

Lecture.prototype = {
  init: function(cb) {
    var self = this;
    
    ddb_utils.getOrCreateDatabase(self.client, self.dbId, function(err, db) {
      if (err) { cb(err); return; }
      self.db = db;
      
      ddb_utils.getOrCreateCollection(
        self.client,
        self.db._self,
        self.collId,
        function(err, coll) {
          if (err) { cb(err); return; }
          self.coll = coll;
        }
      );
    });
  },
  
  find: function (query, cb) {
    var self = this;

    self.client
        .queryDocuments(self.coll._self, query)
        .toArray(function (err, results) {
           if (err) { cb(err); return; }
           cb(null, results);
        });
  },
  
  findAll: function (cb) {
    var self = this;
    
    var query = {
      query: 'SELECT * FROM root r'
    };

    self.find(query, cb);
  },
  
  addItem: function (item, cb) {
    var self = this;

    self.client.createDocument(
      self.coll._self,
      item,
      function (err, doc) {
        if (err) { cb(err); return; }
        cb(null, doc);
      });
  },
  
  getItem: function (item_id, cb) {
    var self = this;

    var querySpec = {
      query: 'SELECT * FROM root r WHERE r.id=@id',
      parameters: [{
          name: '@id',
          value: item_id
      }]
    };

    self.client.queryDocuments(
      self.coll._self,
      querySpec
    ).toArray(function (err, results) {
      if (err) { cb(err); return; }
      cb(null, results[0]);
    });
  },
  
  deleteItem: function(item_id, cb) {
    var self = this;
    this.getItem(item_id, function(err, item) {
      if (err) { cb(err); return; }
      console.log(item);
      self.client.deleteDocument(item._self, cb);
    });
  }
};

module.exports = Lecture;