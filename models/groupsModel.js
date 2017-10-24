// 定义操作集合user的模型 user ===> users

// 加载数据库配置文件
var uuidv4 = require('uuid/v4');
var mongoose = require('../config/db');
var Schema = mongoose.Schema;
var UUID = mongoose.Types.UUID;

// 定义骨架
var time = new Date().getTime();
//=============================
// create a groups schema
//=============================
var schema = new Schema({
    _id:              { type: UUID, required: true, unique: true, default: uuidv4 },
    groupName:        { type: String, required: true },
    permissID:        { type: UUID, required: true, default: uuidv4 },
    gatewayID:        { type: String, required: true },
    action:           [{
        deviceList:   [String],
        functionList: [{
            fullID:   { type: Number, required: true },
            value:    { type: String, required: true, default: "" }
        }]
    }],
    mark:             { type: Number, required: true, default: 0 },
    updateTime:       { type: String, required: true, default: time },
    createTime:       { type: String, required: true, default: time }
});

// 创建数据模型对象
var groups = mongoose.model('groups', schema);

// 向外暴露
module.exports = groups;
