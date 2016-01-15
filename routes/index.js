var express = require('express');
var router = express.Router();
var redis = require('../models/redis.js');
var mongodb = require('../models/mongodb.js');


/*扔一个漂流瓶*/
router.post('/', function(req, res) {
	if (!(req.body.owner && req.body.type && req.body.content)) {
		return res.json({
			code: 0,
			msg: "信息不完整"
		});
	}
	redis.throw(req.body, function(result) {
		res.json(result);
	});
});



/*捡一个漂流瓶*/
router.get('/', function(req, res) {
	redis.pick(req.query,function(result){
		res.json(result);
		if(result.code === 1){
			mongodb.save(req.query.user,result.msg);
		}
	});
});

/*扔回海里一个漂流瓶*/
router.post('/back',function (req,res){
	redis.throwBack(req.body,function(result){
		res.json(result);
	});
});


router.get('/bottle/:_id',function(req,res){
	mongodb.getOne(req.params._id,function(result){
		res.json(result);
	});
});

router.post('/reply/:_id',function(req,res){
	if(!(req.body.user&&req.body.content)){
		return callback({code:0,msg:"回复信息不完整！"});
	}
	mongodb.reply(req.params._id,req.body,function(result){
		res.json(result);
	});
});

router.get('/delete/:_id',function(req,res){
	mongodb.delete(req.params._id,function(result){
		res.json(result);
	});
});

module.exports = router;