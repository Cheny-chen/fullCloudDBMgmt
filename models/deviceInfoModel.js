// 定义操作集合user的模型 user ===> users

// 加载数据库配置文件
var uuidv4 = require('uuid/v4');
var mongoose = require('../config/db');
var Schema = mongoose.Schema;
var UUID = mongoose.Types.UUID;

// 定义骨架
var time = new Date().getTime();
//=============================
// create a users schema
//=============================
var schema = new Schema({
    _id:            { type: String, required: true, unique: true },
    fullModelID:    { type: String, required: true, unique: true },
    sfunctionList:  [{
        fullID: Number,
        value: String
    }],
    dfunctionList:  [String],
    mark:         { type: Number, required: true, default: 0},
    updateTime:     { type: String, required: true, default: time },
    createTime:     { type: String, required: true, default: time }
});

// 创建数据模型对象
var deviceInfo = mongoose.model('deviceInfo', schema);

// 向外暴露
module.exports = deviceInfo;
