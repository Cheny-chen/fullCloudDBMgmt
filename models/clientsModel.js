// 定义操作集合user的模型 user ===> users

// 加载数据库配置文件
var uuidv4 = require('uuid/v4');
var mongoose = require('../config/db');
var Schema = mongoose.Schema;
var UUID = mongoose.Types.UUID;

// 定义骨架
var time = new Date().getTime();
//=============================
// create a clients schema
//=============================
var schema = new Schema({
    _id:            { type: String, required: true, unique: true},
    companyName:    { type: String, required: true},
    uniBusNo:       { type: String, required: true, unique: true},
    address:        String,
    contactPerson1: String,
    contactPhone1:  String,
    contactEmail1:  String,
    contactPerson2: String,
    contactPhone2:  String,
    contactEmail2:  String,
    active:         { type: Number, required: true, default: 1},
    updateTime:     { type: String, required: true, default: time },
    createTime:     { type: String, required: true, default: time }
});

// 创建数据模型对象
var clientsModel = mongoose.model('clients', schema);

// 向外暴露
module.exports = clientsModel;
