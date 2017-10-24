var express = require('express');
var router = express.Router();
// 加载数据模型对象
var deviceGroupsModel = require('../models/schemaModels').deviceGroups;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 deviceGroups 信息
    deviceGroupsModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('deviceGroups',{deviceGroupsData:data});
        // }).sort({_id:-1});
    })
});
router.get('/deviceGroupsAdd', function(req, res, next) {
    res.redirect('deviceGroupsAdd');
});


module.exports = router;
