const mongoose = require('mongoose');

const dash_Schema = mongoose.Schema

const DashSchema = new dash_Schema({
    user:{
        id: {
            type:String,
            required : true,
        },
        slots:{
            slot1: {type: Boolean ,require : true},
            slot2: {type: Boolean,require : true},
            slot3: {type: Boolean,require : true},
            slot4: {type: Boolean,require : true},
            slot5:{type: Boolean,require : true},
            slot6:{type: Boolean,require : true},
            slot7: {type: Boolean,require : true},
            slot8: {type: Boolean,require : true},
            slot9:{type: Boolean,require : true},
            slot10:{type: Boolean,require : true},
            slot11: {type: Boolean,require : true},
            slot12:{type: Boolean,require : true},
        }
    }
}, {timestamps : true})

module.exports = mongoose.model('books' , DashSchema);