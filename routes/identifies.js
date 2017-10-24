var express = require('express');
var router = express.Router();
// 加载数据模型对象
var identifiesModel = require('../models/schemaModels').identifies;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 identifies 信息
    identifiesModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('identifies',{identifiesData:data});
        // }).sort({_id:-1});
    })
});
router.get('/identifiesAdd', function(req, res, next) {
    res.redirect('identifiesAdd');
});


module.exports = router;
