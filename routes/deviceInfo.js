var express = require('express');
var router = express.Router();
// 加载数据模型对象
var deviceInfoModel = require('../models/schemaModels').deviceInfo;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 deviceInfo 信息
    deviceInfoModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('deviceInfo',{deviceInfoData:data});
        // }).sort({_id:-1});
    })
});
router.get('/deviceInfoAdd', function(req, res, next) {
    res.redirect('deviceInfoAdd');
});


module.exports = router;
