// 连接数据库的配置文件

// 加载mongoose模块
var mongoose = require('mongoose');
require('mongoose-uuid2')(mongoose);
require('mongoose-long')(mongoose);
// 定义数据库连接地址
var dbUrl = 'mongodb://192.168.0.179/FEC001';

// 连接数据库
mongoose.connect(dbUrl, {
	useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Fail: mongoDB unconnected!\n'));
db.once('open', function() {
	console.log("Succeed: mongoDB connected!\n");
})

// 向外暴露mongoose
module.exports = mongoose;
