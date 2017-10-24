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
    _id:              { type: UUID, required: true, unique: true, default: uuidv4 },
    autoName:         { type: String, required: true },
    permissID:        { type: UUID, required: true, default: uuidv4 },
    gatewayID:        { type: String, required: true },
    timeZone:         { type: String, required: true, default: "* * * * *" },
    trigger:          { type: String, required: true },
    triggerFunction:  [{
        fullID:       { type: Number, required: true },
        value:        { type: String, required: true, default: "" }
    }],
    action:           [{
        deviceList:   [{
            deviceID: { type: String, required: true },
            level:    { type: Number, required: true, default: 0 }
        }],
        functionList: [{
            fullID:   { type: Number, required: true },
            value:    { type: String, required: true, default: "" }
        }],
        runAfter: {
            active:   { type: Number, required: true },
            delay:    { type: Number, required: true }
        }
    }],
    sceneID:          { type: Number, required: true, default: 0 },
    active:           { type: Number, required: true, default: 1 },
    push:             { type: Number, required: true, default: 0 },
    updateTime:       { type: String, required: true, default: time },
    createTime:       { type: String, required: true, default: time }
});

// 创建数据模型对象
var automations = mongoose.model('automations', schema);

// 向外暴露
module.exports = automations;
