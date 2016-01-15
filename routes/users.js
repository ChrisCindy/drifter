var express = require('express');
var router = express.Router();
var mongodb = require('../models/mongodb.js');

/* GET users listing. */
router.get('/:user', function(req, res) {
  mongodb.getAll(req.params.user,function(result){
  	res.json(result);
  });
});

module.exports = router;
