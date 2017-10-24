var express = require('express');
var router = express.Router();
// 加载数据模型对象
var automationsModel = require('../models/schemaModels').automations;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 automations 信息
    automationsModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('automations',{automationsData:data});
        // }).sort({_id:-1});
    })
});
router.get('/automationsAdd', function(req, res, next) {
    res.redirect('automationsAdd');
});


module.exports = router;
