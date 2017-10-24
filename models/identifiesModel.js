// 定义操作集合user的模型 user ===> users

// 加载数据库配置文件
var uuidv4 = require('uuid/v4');
var mongoose = require('../config/db');
var Schema = mongoose.Schema;
var UUID = mongoose.Types.UUID;

// 定义骨架
var time = new Date().getTime();
//=============================
// create a identifies schema
//=============================
var schema = new Schema({
    _id:        		{ type: UUID, required: true, unique: true, default: uuidv4 },
    identifyName:   { type: String, required: true},
    snID:           { type: String, required: true},
    idGroupID:      { type: String, required: true},
    deviceList:     [String],
    active:         { type: Number, required: true, default: 1},
    updateTime:     { type: String, required: true, default: time },
    createTime:     { type: String, required: true, default: time }
});

// 创建数据模型对象
var identifies = mongoose.model('identifies', schema);

// 向外暴露
module.exports = identifies;
