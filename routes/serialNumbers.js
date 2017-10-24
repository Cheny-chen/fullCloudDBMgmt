var express = require('express');
var router = express.Router();
// 加载数据模型对象
var serialNumbersModel = require('../models/schemaModels').serialNumbers;
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的 serialNumbers 信息
    serialNumbersModel.find({},{},{
        // 定义选项
        sort : {_id:1}
    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('serialNumbers',{serialNumbersData:data});
        // }).sort({_id:-1});
    })
});
router.get('/serialNumbersAdd', function(req, res, next) {
    res.redirect('serialNumbersAdd');
});


module.exports = router;
