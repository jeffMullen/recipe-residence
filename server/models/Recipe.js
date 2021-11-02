const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedRecipes` array in User.js
const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String],
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    total_time: {
        type: String
    },
    dietry_restrictions: {
        type: [String]
    },
    link: {
        type: String,
    },
});

module.exports = recipeSchema;