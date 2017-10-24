var express = require('express');
var router = express.Router();
// 加载数据模型对象
var clientsModel = require('../models/schemaModels').clients;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 clients 信息
    clientsModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('clients',{clientsData:data});
        // }).sort({_id:-1});
    })
});
router.get('/clientsAdd', function(req, res, next) {
    res.redirect('clientsAdd');
});


module.exports = router;
