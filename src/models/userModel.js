const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    username: {
        type: String,
        unique: true,
        min: 3,
        max: 20,
        required: [true, 'Username is Required']
    },
    email: {
        type: String,
        unique: true,
        max: 50,
        required: [true, 'Email is Required']
    },
    password: {
        type: String,
        min: 8,
        required: [true, 'Password is Required']
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 50
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3]
    }

}, { timestamps: true })


module.exports = mongoose.model('User', UserSchema);