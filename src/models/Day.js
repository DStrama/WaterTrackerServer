const mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    day:{
        data: {
            type: String,
            default: (new Date()).toLocaleDateString()
        },
        drunkwater:{
            type: Number,
            default: 0,
            min:0
        },
        liquid:{
            type: String,
            enum:['water','tea','coffe','carbonated','alcohol'],
            default: 'water'
        }
    }
});

mongoose.model('Day',DaySchema);