var express = require('express');
var router = express.Router();
// 加载数据模型对象
var cloudsModel = require('../models/schemaModels').clouds;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 clouds 信息
    cloudsModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('clouds',{cloudsData:data});
        // }).sort({_id:-1});
    })
});
router.get('/cloudsAdd', function(req, res, next) {
    res.redirect('cloudsAdd');
});


module.exports = router;
