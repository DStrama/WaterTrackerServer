const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
    data: {
        type: String
    },
    requiredwater:{
        type: Number
    },
    drunkwater:{
        type: Number
    }
});

//ref use by mongoose is mowi nam ze userId wskazuje na user którego utworzyliśmy w User.js mongoose.model('User',userSchema)

const TrackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    userData:{
        sex: {
            type: String,
            default: ''
        },
        weight: {
            type: Number
        },
        physicalactivity: {
            type: Number
        }
    },
    days: [daySchema]
});

mongoose.model('WaterTrack',TrackSchema);