var express = require('express');
var router = express.Router();
var usersModel = require('../models/schemaModels').users;
var clientsModel = require('../models/schemaModels').clients;
var serialNumbersModel = require('../models/schemaModels').serialNumbers;
var identifiesModel = require('../models/schemaModels').identifies;
var identifyGroupsModel = require('../models/schemaModels').identifyGroups;
var permissionsModel = require('../models/schemaModels').permissions;
var cloudsModel = require('../models/schemaModels').clouds;
var deviceInfoModel = require('../models/schemaModels').deviceInfo;
var devicesModel = require('../models/schemaModels').devices;
var deviceGroupsModel = require('../models/schemaModels').deviceGroups;
var automationsModel = require('../models/schemaModels').automations;
var groupsModel = require('../models/schemaModels').groups;
var scenesModel = require('../models/schemaModels').scenes;
/* GET UTC */
var time = new Date().getTime();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Full Cloud Database Management' });
});
//===================================
// 1. users CRUD
//===================================
router.get('/usersAdd', function(req, res, next) {
    res.render('usersAdd');
});
router.post('/usersAddSubmit', function(req, res, next) {
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
router.get('/usersEdit/:_id',function(req,res){
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
router.post('/usersEditSbumit/:_id',function(req,res){
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
router.get('/usersDelete/:_id',function(req,res){
    var con = {
        _id : req.params._id
    }
    // 删除
    usersModel.remove(con, function(err, data){
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
router.get('/usersOff/:_id',function(req,res){
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
//===================================
// 2. clients CRUD
//===================================
router.get('/clientsAdd', function(req, res, next) {
    res.render('clientsAdd');
});
router.post('/clientsAddSubmit', function(req, res, next) {
    console.log(req.body);

    // 插入数据
    clientsModel.create(req.body, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            console.log(result);
            res.redirect('/clients');
        }
    });
});
router.post('/serialNumbersAddSubmit', function(req, res, next) {
    console.log(typeof req.body);
    console.log(req.body);

    // 插入数据
    clientsModel.create(req.body, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            console.log(result);
            res.redirect('/clients');
        }
    });
});
router.get('/clientsEdit/:_id',function(req,res){
    var con = {
        _id : req.params._id
    }
    clientsModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('clientsEdit',{serialNumber:data});
        }
    })
})
router.post('/clientsEditSubmit',function(req,res){
    var con = {
        _id : req.params._id
    },
    newData = req.body;

    newData.updateTime = time;
    clientsModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.redirect('/clients');
        }
    })
})
router.get('/clientsDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    },
    newData = {
        active : 0,
        updateTime: updateTime
    };

    // 删除
    serialNumbersModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/clients');
        }
    })
})
//===================================
// 3. serialNumbers CRUD
//===================================
router.get('/serialNumbersAdd', function(req, res, next) {
    res.render('serialNumbersAdd');
});
router.post('/serialNumbersAddSubmit', function(req, res, next) {
    console.log(typeof req.body);
    console.log(req.body);

    // 插入数据
    serialNumbersModel.create(req.body, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            console.log(result);
            res.redirect('/serialNumbers');
        }
    });
});
router.get('/serialNumbersEdit/:_id',function(req,res){
    var con = {
        _id : req.params._id
    }
    serialNumbersModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('serialNumbersEdit',{serialNumber:data});
        }
    })
})
router.post('/serialNumbersEditSubmit',function(req,res){
    var con = {
        _id : req.params._id
    },
    newData = req.body;

    newData.updateTime = time;
    serialNumbersModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.redirect('/serialNumbers');
        }
    })
})
router.get('/serialNumbersDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    },
    newData = {
        active : 0,
        updateTime: updateTime
    };

    // 删除
    serialNumbersModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/serialNumbers');
        }
    })
})
//===================================
// 4. identifies CRUD
//===================================
router.get('/identifiesAdd', function(req, res, next) {
    res.render('identifiesAdd');
});
router.post('/identifiesAddSubmit', function(req, res, next) {
    console.log(req.body);

    // 插入数据
    identifiesModel.create(req.body, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            console.log(result);
            res.redirect('/identifies');
        }
    });
});
router.get('/identifiesEdit/:_id',function(req,res){
    var con = {
        _id : req.params._id
    }
    identifiesModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('identifiesEdit',{identify:data});
        }
    })
})
router.post('/identifiesEditSubmit',function(req,res){
    var con = {
        _id : req.params._id
    }
    identifiesModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.redirect('/identifies');
        }
    })
})
router.get('/identifiesDelete/:_id',function(req,res){
    console.log(req.params._id);
    // 条件
    var con = {
        _id : req.params._id
    }

    // 删除
    identifiesModel.remove(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
        }else{
            res.redirect('/identifies');
        }
    })
})
//===================================
// 5. identifyGroups CRUD
//===================================
router.get('/identifyGroupsAdd', function(req, res, next) {
    res.render('identifyGroupsAdd');
});
router.post('/identifyGroupsSubmit', function(req, res, next) {
    console.log(typeof req.body);
    console.log(req.body);

    // 插入数据
    identifyGroupsModel.create(req.body, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            console.log(result);
            res.redirect('/identifyGroups');
        }
    });
});
router.get('/identifyGroupsEdit/:_id',function(req,res){
    var con = {
        _id : req.params._id
    }
    serialNumbersModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('identifyGroupsEdit',{identifyGroup:data});
        }
    })
})
router.post('/identifyGroupsEditSubmit',function(req,res){
    var con = {
        _id : req.params._id
    },
    newData = req.body;

    newData.updateTime = time;
    identifyGroupsModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.redirect('/identifyGroups');
        }
    })
})
router.get('/identifyGroupsDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    },
    newData = {
        active : 0,
        updateTime: updateTime
    };

    // 删除
    identifyGroupsModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/identifyGroups');
        }
    })
})
//===================================
// 6. permissions CRUD
//===================================
router.get('/permissionsAdd/:_id', function(req, res, next) {
    res.render('permissionsAdd', {_id: req.params._id});
});
router.post('/permissionsAddSubmit', function(req, res, next) {
    console.log(req.body);

    // 插入数据
    permissionsModel.create(req.body, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            console.log(result);
            res.redirect('/permissions');
        }
    });
});
router.get('/permissionsEdit/:_id',function(req,res){
    var con = {
        _id : req.params._id
    }
    permissionsModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('permissionsEdit',{permission:data});
        }
    })
})
router.post('/permissionsEditSubmit/:_id',function(req,res){
    var con = {
        _id : req.params._id
    },
    newData = req.body;
    active : 0,

    newData.updateTime = time
    permissionsModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.redirect('/permissions');
        }
    })
})
router.get('/permissionsDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    // 删除
    permissionsModel.remove(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/permissions');
        }
    })
})
//===================================
// 7. clouds CRUD
//===================================
router.get('/cloudsAdd', function(req, res, next) {
    res.render('cloudsAdd');
});
router.post('/cloudsAddSubmit', function(req, res, next) {
    console.log(req.body);

    // 插入数据
    cloudsModel.create(req.body, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            console.log(result);
            res.redirect('/clouds');
        }
    });
});
router.get('/cloudsEdit/:_id',function(req,res){
    var con = {
        _id : req.params._id
    }
    cloudsModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('cloudsEdit',{cloud:data});
        }
    })
})
router.post('/cloudsEditSubmit',function(req,res){
    var con = {
        _id : req.params._id
    },
    newData = req.body;

    newData.updateTime = time;
    cloudsModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.redirect('/clouds');
        }
    })
})
router.get('/cloudsDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }
    cloudsModel.remove(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/clouds');
        }
    })
})
router.get('/cloudsOff/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    },
    newData = {
        active : 0,
        updateTime: time
    };

    // 删除
    cloudsModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/clouds');
        }
    })
})
//===================================
// 8. deviceInfo CRUD
//===================================
router.get('/deviceInfoAdd', function(req, res, next) {
    res.render('deviceInfoAdd');
});
//===================================
// 9. devices CRUD
//===================================
router.get('/devicesAdd', function(req, res, next) {
    res.render('devicesAdd');
});
//===================================
// 10. deviceGroups CRUD
//===================================
router.get('/deviceGroupsAdd', function(req, res, next) {
    res.render('deviceGroupsAdd');
});
//===================================
// 11. automations CRUD
//===================================
router.get('/automationsAdd', function(req, res, next) {
    res.render('automationsAdd');
});
//===================================
// 12. groups CRUD
//===================================
router.get('/groupsAdd', function(req, res, next) {
    res.render('groupsAdd');
});
router.get('/groupsAdd/:_id', function(req, res, next) {
    res.render('groupsAdd', {_id:req.params._id});
});
router.post('/groupsAddSubmit', function(req, res, next) {
    console.log(req.body.data);
    var data = JSON.parse(req.body.data)
    // console.log(data.action);
    插入数据
    groupsModel.create(data, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            console.log(result);
            res.redirect('/groups');
        }
    });
});
//===================================
// 13. scenes CRUD
//===================================
router.get('/scenesAdd', function(req, res, next) {
    res.render('scenesAdd');
});
router.post('/scenesAddSubmit', function(req, res, next) {
    console.log(req.body);

    // 插入数据
    scenesModel.create(req.body, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            console.log(result);
            res.redirect('/scenes');
        }
    });
});
router.get('/scenesEdit/:_id',function(req,res){
    var con = {
        _id : parseInt(req.params._id)
    }
    scenesModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('scenes',{scene:data});
        }
    })
})
router.post('/scenesEditSubmit/:_id',function(req,res){
    var con = {
        _id : req.params._id
    },
    newData = req.body;
    active : 0,

    newData.updateTime = time
    scenesModel.update(con, newData, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.redirect('/scenes');
        }
    })
})
router.get('/scenesDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    // 删除
    scenesModel.remove(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/scenes');
        }
    })
})
module.exports = router;