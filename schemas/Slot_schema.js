const mongoose = require('mongoose');

const Slot_Schema = mongoose.Schema

const SlotSchema = new Slot_Schema({
    name: {type : String, require : true},
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
})

module.exports = mongoose.model('slots' , SlotSchema);