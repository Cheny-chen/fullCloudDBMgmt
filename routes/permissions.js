var express = require('express');
var router = express.Router();
// 加载数据模型对象
var permissionsModel = require('../models/schemaModels').permissions;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 permissions 信息
    permissionsModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('permissions',{permissionsData:data});
        // }).sort({_id:-1});
    })
});
router.get('/permissionsAdd', function(req, res, next) {
    res.redirect('permissionsAdd');
});


module.exports = router;
