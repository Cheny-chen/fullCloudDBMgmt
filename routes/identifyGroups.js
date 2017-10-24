var express = require('express');
var router = express.Router();
// 加载数据模型对象
var identifyGroupsModel = require('../models/schemaModels').identifyGroups;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 identifyGroups 信息
    identifyGroupsModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('identifyGroups',{identifyGroupsData:data});
        // }).sort({_id:-1});
    })
});
router.get('/identifyGroupsAdd', function(req, res, next) {
    res.redirect('identifyGroupsAdd');
});


module.exports = router;
