var express = require('express');
var router = express.Router();
// 加载数据模型对象
var devicesModel = require('../models/schemaModels').devices;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 devices 信息
    devicesModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        res.render('devices',{devicesData:data});
        // }).sort({_id:-1});
    })
});
router.get('/devicesAdd', function(req, res, next) {
    res.redirect('devicesAdd');
});


module.exports = router;
