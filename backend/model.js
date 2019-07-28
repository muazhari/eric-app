const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/react', {
    useNewUrlParser: true,
    keepAlive: true,
    keepAliveInitialDelay: 300000
}).then(r => {
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
});

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email_st: {type: Number, default: 0},
    nickname: {type: String},
    token: {type: String, unique: true},
},{timestamps: true});

const loggedDevice = new mongoose.Schema({
    userID: {type: String},
    deviceID: {type: String}
});

const chatRoom = new mongoose.Schema({
    fromID: {type: String, required: true},
    msg: {type: String, required: true},
    toID: {type: String, required: true},
},{timestamps: true});

const groupChatRoom = new mongoose.Schema({
    fromID: {type: String, required: true},
    msg: {type: String, required: true},
    dateSend: {type: Date, default: Date.now}
},{timestamps: true});

const memberGroupChatRoom = new mongoose.Schema({
    groupID: {type: String},
    userID: {type: Number}
},{timestamps: true});


exports.user = mongoose.model('user', userSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////
