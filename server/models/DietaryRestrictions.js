const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const dietarySchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    // _id: {
    //     type: ID,
    //     required: true,
    //     primaryKey: true,
    //     autoIncrement: true
    // }
});

const DietaryRestrictions = mongoose.model('DietaryRestrictions', dietarySchema);

// module.exports = DietaryRestrictions;
