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
var uuidv4 = require('uuid/v4');
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
router.post('/usersEditSubmit/:_id',function(req,res){
    if(Object.keys(req.body).length === 0) {
        res.redirect('/users')
    } else {
        var con = {
            _id : req.params._id
        }
        newData = req.body

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
    }
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
            res.render('clientsEdit',{client:data});
        }
    })
})
router.post('/clientsEditSubmit/:_id',function(req,res){
    if(Object.keys(req.body).length === 0) {
        res.redirect('/clients')
    } else {
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
    }
})
router.get('/clientsDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    // 删除
    clientsModel.remove(con, function(err, data){
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
router.post('/serialNumbersEditSubmit/:_id',function(req,res){
    if(Object.keys(req.body).length === 0) {
        res.redirect('/serialNumbers')
    } else {
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
    }
})
router.get('/serialNumbersOff/:_id',function(req,res){
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
router.get('/serialNumbersDelete/:_id',function(req,res){
    var con = {
        _id : req.params._id
    }

    serialNumbersModel.remove(con, function(err, data){
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
//===================================
// 4. identifies CRUD
//===================================
router.get('/identifiesAdd/:_id', function(req, res, next) {
    res.render('identifiesAdd', {snID: req.params._id});
});
router.post('/identifiesAddSubmit', function(req, res, next) {
    var _id = uuidv4(time),
        newData = req.body

    newData._id = _id
    console.log(_id);
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
router.post('/identifiesEditSubmit/:_id',function(req,res){
    if(Object.keys(req.body).length === 0) {
        res.redirect('/identifies')
    } else {
        var con = {
                _id : req.params._id
            },
            newData = req.body;

        for(i in newData.deviceList) {
            if(newData.deviceList[i]=='') {
                newData.deviceList.splice(i,newData.deviceList.length-i)
                console.log(newData.deviceList)
                break
            }
        };
        console.log(newData.deviceList)
        newData.updateTime = time;
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
    }
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
router.post('/identifyGroupsAddSubmit', function(req, res, next) {
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
    identifyGroupsModel.findOne(con, function(err, data){
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
router.post('/identifyGroupsEditSubmit/:_id',function(req,res){
    if(Object.keys(req.body).length === 0) {
        res.redirect('/identifyGroups')
    } else {
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
    }
})
router.get('/identifyGroupsDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    // 删除
    identifyGroupsModel.remove(con, function(err, data){
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
            console.log(data);
            // 跳转首页
            res.render('permissionsEdit',{permission:data});
        }
    })
})
router.post('/permissionsEditSubmit/:_id',function(req,res){
    if(Object.keys(req.body).length === 0) {
        res.redirect('/permissions')
    } else {
        var con = {
                _id : req.params._id
            },
            newData = req.body;

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
    }
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
router.post('/cloudsEditSubmit/:_id',function(req,res){
    if(Object.keys(req.body).length === 0) {
        res.redirect('/clouds');
    } else {
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
    }

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
router.post('/deviceInfoAddSubmit', function(req, res, next) {
    var data = JSON.parse(req.body.data);
    console.log(data);

    //插入数据
    deviceInfoModel.create(data, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            console.log(result);
            res.redirect('/deviceInfo');
        }
    });
});
router.get('/deviceInfoEdit/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    deviceInfoModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('deviceInfoEdit',{deviceInfo:data});
        }
    })
})
router.post('/deviceInfoEditSubmit/:_id',function(req,res){
    // 条件
    if(Object.keys(req.body.data).length === 0) {
        res.redirect('/deviceInfo')
    } else {
        var con = {
                _id : req.params._id
            },
            newData = JSON.parse(req.body.data);

        newData.updateTime = time;
        deviceInfoModel.update(con, newData, function(err, data){
            if(err){
                console.error(err);
                // 说明有问题,跳转会添加用户的页面
                res.redirect('back');
            }else{
                // 跳转首页
                res.redirect('/deviceInfo');
            }
        })
    }
})
router.get('/deviceInfoDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    // 删除
    deviceInfoModel.remove(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/deviceInfo');
        }
    })
})
//===================================
// 9. devices CRUD
//===================================
router.get('/devicesAdd', function(req, res, next) {
    res.render('devicesAdd', {data:''});
});
router.get('/devicesMatch/:_id&:fullModelID', function(req, res, next) {
    var data = {
            _id: req.params._id,
            fullModelID: req.params.fullModelID
        }
    res.render('devicesAdd', {data:data});
});
router.post('/devicesAddSubmit', function(req, res, next) {
    var data = JSON.parse(req.body.data)
    console.log(data);

    // 插入数据
    devicesModel.create(data, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            console.log(result);
            res.redirect('/devices');
        }
    });
});
router.get('/devicesEdit/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    devicesModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('devicesEdit',{device:data});
        }
    })
})
router.post('/devicesEditSubmit/:_id',function(req,res){
    // 条件
    if(Object.keys(req.body.data).length === 0) {
        res.redirect('/devices')
    } else {
        var con = {
                _id : req.params._id
            },
            newData = JSON.parse(req.body.data);

        newData.updateTime = time;
        devicesModel.update(con, newData, function(err, data){
            if(err){
                console.error(err);
                // 说明有问题,跳转会添加用户的页面
                res.redirect('back');
            }else{
                // 跳转首页
                res.redirect('/devices');
            }
        })
    }
})
router.get('/devicesDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    // 删除
    devicesModel.remove(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/devices');
        }
    })
})
//===================================
// 10. deviceGroups CRUD
//===================================
router.get('/deviceGroupsAdd', function(req, res, next) {
    res.render('deviceGroupsAdd');
});
router.post('/deviceGroupsAddSubmit', function(req, res, next) {
    console.log(req.body);

    // 插入数据
    deviceGroupsModel.create(req.body, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            console.log(result);
            res.redirect('/deviceGroups');
        }
    });
});
router.get('/deviceGroupsEdit/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    deviceGroupsModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('deviceGroupsEdit',{deviceGroup:data});
        }
    })
})
router.post('/deviceGroupsEditSubmit/:_id',function(req,res){
    // 条件
    if(Object.keys(req.body).length === 0) {
        res.redirect('/deviceGroups')
    } else {
        var con = {
                _id : req.params._id
            },
            newData = req.body;

        newData.updateTime = time;
        deviceGroupsModel.update(con, newData, function(err, data){
            if(err){
                console.error(err);
                // 说明有问题,跳转会添加用户的页面
                res.redirect('back');
            }else{
                // 跳转首页
                res.redirect('devices');
            }
        })
    }
})
router.get('/deviceGroupsDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    // 删除
    deviceGroupsModel.remove(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/deviceGroups');
        }
    })
})
//===================================
// 11. automations CRUD
//===================================
router.get('/automationsAdd', function(req, res, next) {
    res.render('automationsAdd');
});
router.post('/automationsAddSubmit', function(req, res, next) {
    var newData = JSON.parse(req.body.data)
    console.log(JSON.stringify(newData));

    // 插入数据
    automationsModel.create(newData, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            console.log(result);
            res.redirect('/automations');
        }
    });
});
router.get('/automationsEdit/:_id',function(req,res){
    var con = {
        _id : req.params._id
    }
    automationsModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('automationsEdit',{automation:data});
        }
    })
})
router.post('/automationsEditSubmit/:_id',function(req,res){
    if(Object.keys(req.body).length === 0) {
        res.redirect('scenes')
    } else {
        var con = {
            _id : req.params._id
            },
            newData = JSON.parse(req.body.data);

        newData.updateTime = time
        automationsModel.update(con, newData, function(err, data){
            if(err){
                console.error(err);
                // 说明有问题,跳转会添加用户的页面
                res.redirect('back');
            }else{
                // 跳转首页
                res.redirect('/automations');
            }
        })
    }
})
router.get('/automationsDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    // 删除
    automationsModel.remove(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/automations');
        }
    })
})
//===================================
// 12. groups CRUD
//===================================
router.get('/groupsAdd', function(req, res, next) {
    res.render('groupsAdd');
});
router.get('/groupsMatch/:_id', function(req, res, next) {
    res.render('groupsAdd', {_id:req.params._id});
});
router.post('/groupsAddSubmit', function(req, res, next) {
    console.log(req.body.data);
    var data = JSON.parse(req.body.data)
    console.log(typeof data);
    // 插入数据
    groupsModel.create(data, function(err,result){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.redirect('/groups');
        }
    });
});
router.get('/groupsEdit/:_id',function(req,res){
    var con = {
        _id : req.params._id
    }
    groupsModel.findOne(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            // 跳转首页
            res.render('groupsEdit',{group:data});
        }
    })
})
router.post('/groupsEditSubmit/:_id',function(req,res){
    if(Object.keys(req.body).length === 0) {
        res.redirect('/groups')
    } else {
        var con = {
            _id : req.params._id
            },
            newData = JSON.parse(req.body.data);

        newData.updateTime = time
        groupsModel.update(con, newData, function(err, data){
            if(err){
                console.error(err);
                // 说明有问题,跳转会添加用户的页面
                res.redirect('back');
            }else{
                // 跳转首页
                res.redirect('/groups');
            }
        })
    }
})
router.get('/groupsDelete/:_id',function(req,res){
    // 条件
    var con = {
        _id : req.params._id
    }

    // 删除
    groupsModel.remove(con, function(err, data){
        if(err){
            console.error(err);
            // 说明有问题,跳转会添加用户的页面
            res.redirect('back');
        }else{
            res.redirect('/groups');
        }
    })
})
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
            res.render('scenesEdit',{scene:data});
        }
    })
})
router.post('/scenesEditSubmit/:_id',function(req,res){
    if(Object.keys(req.body).length === 0) {
        res.redirect('scenes')
    } else {
        var con = {
            _id : req.params._id
            },
            newData = req.body;

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
    }
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
