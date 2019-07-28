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
});

const loggedDevice = new mongoose.Schema({
    userID : {type: String},
    deviceID : {type: String}
})

exports.user = mongoose.model('user', userSchema);

//////////////////////////////////////////////////////////////////////////////////////////////////


