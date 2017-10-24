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
    _id:            { type: UUID, required: true, unique: true, default: uuidv4 },
    parentID:       { type: UUID, required: true, default: uuidv4, ref: 'permissions' },
    snID:           { type: UUID, required: true, default: uuidv4 },
    identifyList:   [String],
    enable:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    updateTime:     { type: String, required: false, default: time },
    createTime:     { type: String, required: false, default: time }
});

// 创建数据模型对象
var permissions = mongoose.model('permissions', schema);

// 向外暴露
module.exports = permissions;
