const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        saved_recipes: [Recipe]
    }

    type Recipe {
        _id: ID
        title: String
        ingredients: [String]
        description: String
        instructions: [String]
        total_time: String
        dietary_restrictions: [String]
        link: String
        author: String
    }
    
    type Query {
        recipes: [Recipe]
        getRecipeTitle(search: String, page: Int, limit: Int): RecipeResult
        getSingleRecipe(recipeId: ID!): Recipe
        me: User
    }
    
    type RecipeResult {
        recipes: [Recipe]
        currentPage: Int
        totalPages: Int
    }
    
    type Auth {
        token: ID!
        user: User
    }  

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addRecipe(author: String!, title: String!, ingredients: [String!], description: String!, instructions: [String!], total_time: String!, dietary_restrictions: [String], link: String): Recipe
        updateRecipe(_id: ID!, title: String!, ingredients: [String!], description: String!, instructions: [String!], total_time: String!, dietary_restrictions: [String], link: String): Recipe
        saveRecipe(_id: ID!, author: String!, title: String!, ingredients: [String!], description: String!, instructions: String!, total_time: String!, dietary_restrictions: [String], link: String): User
        removeRecipe(_id: ID!): User
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;
