var uuidv4 = require('uuid/v4');
var mongoose = require('../config/db');
var Schema = mongoose.Schema;
var UUID = mongoose.Types.UUID;
var Long = mongoose.Schema.Types.Long;
var ObjectId = Schema.Types.ObjectId;
var log = 1;

// var time = new Date().toISOString();
// var time = Math.round(Date.now / 1000)
var time = new Date().getTime();
//===================================
// 1. create a users schema
//===================================
var usersSchema = new Schema({
    _id:        	{ type: UUID,   required: true, unique: true, default: uuidv4(), ref: 'permissions' },
    loginID:    	{ type: String, required: true, unique: true},
    clientID:   	{ type: String, required: false, ref: 'clients'},
    fullName:   	{ type: String, required: true},
    password:   	{ type: String, required: true},
    email:      	{ type: String, required: true, unique: true},
    gender:         { type: String, required: false,
                      enum: ['male', 'female'],
                      default: 'male' },
    ageRange:   	{ type: String, required: false,
                      enum: ['-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79','80+'],
                      default: '30-39' },
    occupation: 	{ type: String, required: false },
    city:       	{ type: String, required: false },
    country:    	{ type: String, required: false },
    active:       	{ type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    lastLogin_ipv4: { type: String, required: false },
    lastLogin_time: { type: Date,   required: false }
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
usersSchema.index({loginID:'text', email:1},{unique:true})
//===================================
// 2. create a clients schema
//===================================
var clientsSchema = new Schema({
    _id:            { type: String, required: true, unique: true},
    companyName:    { type: String, required: true},
    uniBusNo:       { type: String, required: true, unique: true},
    address:        { type: String, required: true },
    city:           { type: String, required: true },
    district:       { type: String, required: true },
    country:        { type: String, required: true },
    postcode:       { type: String, required: true },
    contactPerson1: { type: String, required: true },
    contactPhone1:  { type: String, required: true },
    contactEmail1:  { type: String, required: true },
    contactPerson2: { type: String, required: false },
    contactPhone2:  { type: String, required: false },
    contactEmail2:  { type: String, required: false },
    active:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1}
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
//===================================
// 3. create a serialNumbers schema
//===================================
var serialNumbersSchema = new Schema({
    _id:            { type: UUID, required: true, unique: true, default: uuidv4() },
    snKey:          { type: String, required: true, unique: true},
    clientID:       { type: String, required: true, ref: 'clients'},
    gatewayList:    [String],
    active:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    registTime:     { type: Date,   required: true },
    endTime:        { type: Date,   required: true }
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
serialNumbersSchema.index({snKey:'text'}, {unique: true});
serialNumbersSchema.index({clientID: 1})
//===================================
// 4. create a identifies schema
//===================================
var identifiesSchema = new Schema({
    _id:        	{ type: UUID,   required: true, unique: true, default: uuidv4() },
    identifyName:   { type: String, required: true},
    snID:           { type: UUID,   required: true, ref: 'serialNumbers'},
    idGroupID:      { type: ObjectId,  required: false, ref: 'identifyGroups'},
    deviceList:     [String],
    enable:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1}
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
//===================================
// 5. create a identifyGroups schema
//===================================
var identifyGroupsSchema = new Schema({
    _id:            { type: ObjectId,   required: true, unique: true, default: new mongoose.mongo.ObjectId(), ref: 'identifies' },
    groupName:      { type: String, required: true},
    snID:           { type: UUID,   required: true, index: true, ref: 'serialNumbers'}
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
identifyGroupsSchema.index({snID:1})
//===================================
// 6. create a permissions schema
//===================================
var permissionsSchema = new Schema({
    _id:            { type: UUID,   required: true, unique: true, default: uuidv4(), ref: 'users' },
    parentID:       { type: UUID,   required: false, index: true },
    permissName:    { type: String, required: false },
    snID:           { type: UUID,   required: false, index: true, ref: 'serialNumbers' },
    identifyList:   { type: [UUID], required: false, ref: 'identifies' },
    enable:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1}
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
permissionsSchema.index({parentID:1, snID:1})
//===================================
// 7. create a clouds schema
//===================================
var cloudsSchema = new Schema({
    _id:            { type: Number, required: true, unique: true, default: Math.round(time/1000), ref: 'devices' },
    cloudName:      { type: String, required: true, unique: true },
    host:           { type: String, required: true },
    port:           { type: Number, required: true },
    username:       { type: String, required: false },
    password:       { type: String, required: false },
    active:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1}
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
//===================================
// 8. create a deviceInfo schema
//===================================
var deviceInfoSchema = new Schema({
    _id:            { type: String, required: true, ref: 'devices' },
    fullModelID:    { type: String, required: true, ref: 'devices' },
    sfunctionList:  [{
        _id:        false,
        fullID:     { type: Number, required: false },
        value:      { type: String, required: false, default: "" }
    }],
    dfunctionList: [Number],
    isAuto:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    isGroup:        { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1}
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
},{_id:false});
deviceInfoSchema.index({fullModelID:1})
//===================================
// 9. create a devices schema
//===================================
var devicesSchema = new Schema({
    _id:            { type: String, required: true, unique: true },
    deviceName:     { type: String, required: false },
    gatewayID:      { type: String, required: false, index: true },
    cloudID:        { type: Number, required: false, index: true, ref: 'clouds' },
    firmwareID:     { type: String, required: false, index: true, ref: 'deviceInfo' },
    fullModelID:    { type: String, required: false, index: true, ref: 'deviceInfo' },
    functionList:   [{
        _id:        false,
        fullID:     { type: Number, required: false },
        value:      { type: String, required: false, default: "" }
    }],
    deGroupID:      { type: ObjectId, required: false, index: true, ref: 'deviceGroups' },
    owner:          { type: UUID,   required: false, ref: 'permissions' }
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
},{_id:false});
devicesSchema.index({gatewayID:'text', cloudID:1, firmwareID:1, fullModelID:1, deGroupID:1})
//===================================
// 10. create a deviceGroups schema
//===================================
var deviceGroupsSchema = new Schema({
    _id:            { type: ObjectId, required: true, unique: true, default: new mongoose.mongo.ObjectId(), ref: 'device'},
    groupName:      { type: String, required: true },
    snID:           { type: UUID,   required: true, index: true, ref: 'serialNumbers'}
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
deviceGroupsSchema.index({snID:1})
//===================================
// 11. create a automations schema
//===================================
var automationsSchema = new Schema({
    _id:              { type: UUID,   required: true, unique: true, default: uuidv4() },
    autoName:         { type: String, required: false },
    identifyID:       { type: UUID,   required: false, ref: 'identifies' },
    gatewayID:        { type: String, required: false, ref: 'devices' },
    timeZone:         { type: String, required: false, default: "* * * * *" },
    trigger:          { type: String, required: true, ref: 'devices' },
    triggerFunction:  {
        fullID:       { type: Number, required: false },
        value:        { type: String, required: false, default: "" }
    },
    action:           [{
        deviceList:   [{
            deviceID: { type: String, required: false },
            level:    { type: Number, required: false,
                        min:0,
                        max: 1,
                        default: 0},
        }],
        functionList: [{
            fullID:   { type: Number, required: false },
            value:    { type: String, required: false, default: "" }
        }],
        runAfter: {
            enable:   { type: Number, required: false,
                              min:0,
                              max: 1,
                              default: 0},
            delay:    { type: Number, required: false, default: 0 }
        }
    }],
    sceneID:          { type: Number, required: false, ref: 'scenes',
                        min:0,
                        max: 3,
                        default: 0},
    enable:           { type: Number, required: false,
                        min:0,
                        max: 1,
                        default: 1},
    push:             { type: Number, required: false,
                        min:0,
                        max: 1,
                        default: 0}
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
automationsSchema.index({idGroupID:1, gatewayID:1})
//===================================
// 12. create a groups schema
//===================================
var groupsSchema = new Schema({
    _id:              { type: UUID,   required: true, unique: true, default: uuidv4() },
    groupName:        { type: String, required: false },
    identifyID:       { type: UUID,   required: false, ref: 'identifies' },
    action:           [{
        deviceID:   String,
        functionList: [{
            fullID:   { type: Number, required: false },
            value:    { type: String, required: false }
        }]
    }]
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
groupsSchema.index({idGroupID:1})
//===================================
// 13. create a scenes schema
//===================================
var scenesSchema = new Schema({
    _id:            { type: Number, required: true, unique: true },
    sceneName:      { type: String, required: true }
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
//===================================
// 14. topic a scenes schema
//===================================
var topicsSchema = new Schema({
    topic:          { type: String, required: true },
    cloudID:        { type: Number, required: true, ref: 'clouds' }
}, {timestamps:     { createdAt: 'createTime', updatedAt: 'updateTime' }
});
// the schema is useless so far
// we need to create a model using it
var users = mongoose.model('users', usersSchema, 'users');
var clients = mongoose.model('clients', clientsSchema, 'clients');
var serialNumbers = mongoose.model('serialNumbers', serialNumbersSchema, 'serialNumbers');
var identifies = mongoose.model('identifies', identifiesSchema, 'identifies');
var identifyGroups = mongoose.model('identifyGroups', identifyGroupsSchema, 'identifyGroups');
var permissions = mongoose.model('permissions', permissionsSchema, 'permissions');
var clouds = mongoose.model('clouds', cloudsSchema, 'clouds');
var deviceInfo = mongoose.model('deviceInfo', deviceInfoSchema, 'deviceInfo');
var devices = mongoose.model('devices', devicesSchema, 'devices');
var deviceGroups = mongoose.model('deviceGroups', deviceGroupsSchema, 'deviceGroups');
var automations = mongoose.model('automations', automationsSchema, 'automations');
var groups = mongoose.model('groups', groupsSchema, 'groups');
var scenes = mongoose.model('scenes', scenesSchema, 'scenes');
var topics = mongoose.model('topics', topicsSchema, 'topics');
// make this available to our users in our Node applications
exports.users = users;
exports.clients = clients;
exports.serialNumbers = serialNumbers;
exports.identifies = identifies;
exports.identifyGroups = identifyGroups;
exports.permissions = permissions;
exports.clouds = clouds;
exports.deviceInfo = deviceInfo;
exports.devices = devices;
exports.deviceGroups = deviceGroups;
exports.automations = automations;
exports.groups = groups;
exports.scenes = scenes;
exports.topics;
