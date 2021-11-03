const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const dietarySchema = new Schema({
    type: {
        type: String,
        required: true,
        trim: true
    }
});

const DietaryRestrictions = mongoose.model('DietaryRestrictions', dietarySchema);

module.exports = DietaryRestrictions;
