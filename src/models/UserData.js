const mongoose = require('mongoose');

var UserDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userData:{
        sex: {
            type: String,
            enum: ['female','male'],
            default: 'male'
        },
        weight: {
            type: Number,
            default: 0,
            min:0
        },
        physicalactivity: {
            type: Boolean,
            default: false
        },
        requiredwater:{
            type: Number,
            default: 0,
            min:0
        }
    },
});

mongoose.model('UserData',UserDataSchema);