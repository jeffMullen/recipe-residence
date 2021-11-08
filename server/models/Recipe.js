const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `saved_recipes` array in User.js
const recipeSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
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
        type: [String],
        required: true,
    },
    total_time: {
        type: String
    },
    dietary_restrictions: {
        type: [String]
    },
    link: {
        type: String,
    },
});

const Recipe = model('Recipe', recipeSchema)

module.exports = Recipe;
