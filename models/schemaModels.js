var uuidv4 = require('uuid/v4');
var mongoose = require('../config/db');
var Schema = mongoose.Schema;
var UUID = mongoose.Types.UUID;
var Long = mongoose.Schema.Types.Long;
var log = 1;

//var time = new Date().toISOString();
// var time = Math.round(new Date().getTime() / 1000)
var time = new Date().getTime()
//===================================
// 1. create a users schema
//===================================
var usersSchema = new Schema({
    _id:        	{ type: UUID,   required: true, unique: true, default: uuidv4(time) },
    loginID:    	{ type: String, required: true, unique: true},
    clientID:   	{ type: String, required: true},
    fullName:   	{ type: String, required: true},
    password:   	{ type: String, required: true},
    email:      	{ type: String, required: true, unique: true},
    gender:         { type: String, required: false,
                      enum: ['male', 'female'],
                      default: 'male' },
    ageRange:   	{ type: String, required: false,
                      enum: ['-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79','80+'],
                      default: '30-39' },
    occupation: 	{ type: String, required: false, default: "" },
    city:       	{ type: String, required: false, default: "" },
    country:    	{ type: String, required: false, default: "" },
    active:       	{ type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    lastLogin_ipv4: { type: String, required: false, default: "" },
    lastLogin_time: { type: Long,   required: false, default: "" },
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
//===================================
// 2. create a clients schema
//===================================
var clientsSchema = new Schema({
    _id:            { type: String, required: true, unique: true},
    companyName:    { type: String, required: true},
    uniBusNo:       { type: String, required: true, unique: true},
    address:        { type: String, required: true, default: "" },
    city:           { type: String, required: true, default: "" },
    district:       { type: String, required: true, default: "" },
    country:        { type: String, required: true, default: "" },
    postcode:       { type: String, required: true, default: "" },
    contactPerson1: { type: String, required: true, default: "" },
    contactPhone1:  { type: String, required: true, default: "" },
    contactEmail1:  { type: String, required: true, default: "" },
    contactPerson2: { type: String, required: false, default: "" },
    contactPhone2:  { type: String, required: false, default: "" },
    contactEmail2:  { type: String, required: false, default: "" },
    active:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
//===================================
// 3. create a serialNumbers schema
//===================================
var serialNumbersSchema = new Schema({
    _id:            { type: UUID, required: true, unique: true, default: uuidv4(time) },
    snKey:          { type: String, required: true, unique: true},
    clientID:       { type: String, required: true},
    gatewayList:    [String],
    active:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    registTime:     { type: Long,   required: true, default: "" },
    endTime:        { type: Long,   required: true, default: "" },
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
//===================================
// 4. create a identifies schema
//===================================
var identifiesSchema = new Schema({
    _id:        	{ type: UUID,   required: true, unique: true, default: uuidv4(time) },
    identifyName:   { type: String, required: true},
    snID:           { type: String, required: true},
    idGroupID:      { type: String, required: false},
    deviceList:     [String],
    enable:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
//===================================
// 5. create a identifyGroups schema
//===================================
var identifyGroupsSchema = new Schema({
    _id:            { type: UUID,   required: true, unique: true, default: uuidv4(time) },
    groupName:      { type: String, required: true},
    itemList:       [String],
    enable:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
//===================================
// 6. create a permissions schema
//===================================
var permissionsSchema = new Schema({
    _id:            { type: UUID,   required: true, unique: true, default: uuidv4(time) },
    parentID:       { type: UUID,   required: false },
    permissName:    { type: String,   required: false },
    snID:           { type: UUID,   required: false },
    identifyList:   [String],
    enable:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
//===================================
// 7. create a clouds schema
//===================================
var cloudsSchema = new Schema({
    _id:            { type: UUID, required: true, unique: true, default: uuidv4(time) },
    cloudName:      { type: String, required: true, unique: true },
    mqttHost:       { type: String, required: true },
    mqttPort:       { type: Number, required: true },
    active:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
//===================================
// 8. create a deviceInfo schema
//===================================
var deviceInfoSchema = new Schema({
    _id:            { type: String, required: true },
    fullModelID:    { type: String, required: true, ref: 'devices' },
    static_function: [{
        fullID:     { type: Number, required: false },
        value:      { type: String, required: false, default: "" }
    }],
    dyname_function: [Number],
    isAuto:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    isGroup:        { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
//===================================
// 9. create a devices schema
//===================================
var devicesSchema = new Schema({
    _id:            { type: String, required: true, unique: true },
    deviceName:     { type: String, required: false },
    gatewayID:      { type: String, required: false },
    cloudID:        { type: UUID,   required: false },
    firmwareID:     { type: String, required: true },
    fullModelID:    { type: String, required: true },
    functionList:   [{
        fullID:     { type: Number, required: false },
        value:      { type: String, required: false, default: "" },
        updateTime: { type: Long,   required: false, default: time }
    }],
    owner:          { type: String, required: false },
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
//===================================
// 10. create a deviceGroups schema
//===================================
var deviceGroupsSchema = new Schema({
    _id:            { type: String, required: true, unique: true},
    groupName:      { type: String, required: true },
    itemList:       [String],
    enable:         { type: Number, required: false,
                      min:0,
                      max: 1,
                      default: 1},
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
//===================================
// 11. create a automations schema
//===================================
var automationsSchema = new Schema({
    _id:              { type: UUID,   required: true, unique: true, default: uuidv4(time) },
    autoName:         { type: String, required: true },
    permissID:        { type: UUID,   required: true, default: uuidv4(time) },
    gatewayID:        { type: String, required: false },
    timeZone:         { type: String, required: false, default: "* * * * *" },
    trigger:          { type: String, required: true },
    triggerFunction:  [{
        fullID:       { type: Number, required: false },
        value:        { type: String, required: false, default: "" }
    }],
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
    sceneID:          { type: Number, required: false,
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
                        default: 0},
    updateTime:       { type: Long,   required: false, default: time },
    createTime:       { type: Long,   required: false, default: time }
});
//===================================
// 12. create a groups schema
//===================================
var groupsSchema = new Schema({
    _id:              { type: UUID,   required: true, unique: true, default: uuidv4(time) },
    groupName:        { type: String, required: true },
    permissID:        { type: UUID,   required: true, default: uuidv4(time) },
    gatewayID:        { type: String, required: true },
    action:           [{
        deviceList:   [String],
        functionList: [{
            fullID:   { type: Number, required: false },
            value:    { type: String, required: false, default: "" }
        }]
    }],
    mark:             { type: Number, required: false, default: 0 },
    updateTime:       { type: Long,   required: false, default: time },
    createTime:       { type: Long,   required: false, default: time }
});
//===================================
// 13. create a scenes schema
//===================================
var scenesSchema = new Schema({
    _id:            { type: Number, required: true, unique: true },
    sceneName:      { type: String, required: true },
    updateTime:     { type: Long,   required: false, default: time },
    createTime:     { type: Long,   required: false, default: time }
});
// the schema is useless so far
// we need to create a model using it
var users = mongoose.model('users', usersSchema);
var clients = mongoose.model('clients', clientsSchema);
var serialNumbers = mongoose.model('serialNumbers', serialNumbersSchema);
var identifies = mongoose.model('identifies', identifiesSchema);
var identifyGroups = mongoose.model('identifyGroups', identifyGroupsSchema);
var permissions = mongoose.model('permissions', permissionsSchema);
var clouds = mongoose.model('clouds', cloudsSchema);
var deviceInfo = mongoose.model('deviceInfo', deviceInfoSchema);
var devices = mongoose.model('devices', devicesSchema);
var deviceGroups = mongoose.model('deviceGroups', deviceGroupsSchema);
var automations = mongoose.model('automations', automationsSchema);
var groups = mongoose.model('groups', groupsSchema);
var scenes = mongoose.model('scenes', scenesSchema);

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
