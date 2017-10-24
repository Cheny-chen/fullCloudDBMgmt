// 定义操作集合user的模型 user ===> users

// 加载数据库配置文件
var uuidv4 = require('uuid/v4');
var mongoose = require('../config/db');
var Schema = mongoose.Schema;
var UUID = mongoose.Types.UUID;

// 定义骨架
var time = new Date().getTime();
//=============================
// create a devices schema
//=============================
var schema = new Schema({
    _id:            { type: String, required: true, unique: true },
    deviceName:     { type: String, required: false },
    gatewayID:      { type: String, required: false },
    cloudID:        { type: UUID,   required: false, default: uuidv4 },
    firmwareID:     { type: String, required: true },
    fullModelID:    { type: String, required: true },
    functionList:   [{
        fullID:     { type: Number, required: false },
        value:      { type: String, required: false, default: "" },
        updateTime: { type: String, required: false, default: time }
    }],
    owner:          { type: String, required: false },
    updateTime:     { type: String, required: false, default: time },
    createTime:     { type: String, required: false, default: time }
});

// 创建数据模型对象
var devices = mongoose.model('devices', schema);

// 向外暴露
module.exports = devices;
