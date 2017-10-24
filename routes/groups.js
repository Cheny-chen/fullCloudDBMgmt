var express = require('express');
var router = express.Router();
// 加载数据模型对象
var groupsModel = require('../models/schemaModels').groups;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 groups 信息
    groupsModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('groups',{groupsData:data});
        // }).sort({_id:-1});
    })
});
router.get('/groupsAdd', function(req, res, next) {
    res.redirect('groupsAdd');
});


module.exports = router;
