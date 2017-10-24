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
    _id:        		{ type: UUID, required: true, unique: true, default: uuidv4 },
    loginID:    		{ type: String, required: true, unique: true},
    clientID:   		{ type: String, required: true},
    fullname:   		{ type: String, required: true},
    password:   		{ type: String, required: true},
    email:      		{ type: String, required: true, unique: true},
    ageRange:   		Number,
    occupation: 		String,
    city:       		String,
    country:    		String,
    active:       	    { type: Number, required: true, default: 1},
    lastLogin_time:     String,
    updateTime:         { type: String, required: true, default: time },
    createTime:         { type: String, required: true, default: time }
});

// 创建数据模型对象
var users = mongoose.model('users', schema);

// 向外暴露
module.exports = users;
