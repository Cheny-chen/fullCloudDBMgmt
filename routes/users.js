var express = require('express');
var router = express.Router();
// 加载数据模型对象
var usersModel = require('../models/schemaModels').users;

/*
路由只负责分发指定业务给指定的控制器，控制器专门处理业务
*/
//===================================
// 1. users CRUD
//===================================
/* GET home page. */
router.get('/', function(req, res, next) {
    // 查询所有的会员信息
    usersModel.find({},{},{
        // 定义选项
        sort : {_id:-1}

    },function(err,data){
        // 分配数据
        console.log(data)
        res.render('users',{usersData:data});
        // }).sort({_id:-1});
    })
});

router.get('usersAdd', function(req, res, next) {
    res.render('usersAdd');
});
router.post('usersAddSubmit', function(req, res, next) {
  	console.log(req.body);

  	// 插入数据
  	usersModel.create(req.body, function(err,result){
  		if(err){
            console.error(err);
  			// 说明有问题,跳转会添加用户的页面
  			res.redirect('back');
  		}else{
            // 条件
        	var con = {
        		    _id : result._id
        	   }
            permissionsModel.create(con, function(err,result){
                if(err){
                    console.error(err);
                    // 说明有问题,跳转会添加用户的页面
                    res.redirect('back');
                }else{
                    // 跳转首页
                    console.log(result);
                    res.redirect('/users');
                }
            });
  		}
  	});
});
router.get('usersEdit/:_id',function(req,res){
    var con = {
		    _id : req.params._id
	   }
    usersModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('usersEdit',{user:data});
        }
    })
})
router.post('usersEditSbumit/:_id',function(req,res){
    var con = {
		    _id : req.params._id
	   }
       newData = req.body
       console.log(JSON.stringify(newData))
    newData.updateTime = time
    usersModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.redirect('/users');
        }
    })
})
router.get('usersDelete/:_id',function(req,res){
	// 条件
	var con = {
		    _id : req.params._id
	   },
       newData = {
           active : 0,
           updateTime: time
       };

	// 删除
	usersModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            permissionsModel.remove(con, function(err,result){
                if(err){
                    console.error(err);
                    // 说明有问题,跳转会添加用户的页面
                    res.redirect('back');
                }else{
                    // 跳转首页
                    console.log(result);
                    res.redirect('/users');
                }
            });
        }
	})
})

module.exports = router;
