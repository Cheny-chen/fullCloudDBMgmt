var express = require('express');
var router = express.Router();
// 加载数据模型对象
var scenesModel = require('../models/schemaModels').scenes;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 clouds 信息
    scenesModel.find({},{},{
        // 定义选项
        sort : {_id:1}

    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('scenes',{scenesData:data});
        // }).sort({_id:-1});
    })
});

module.exports = router;
