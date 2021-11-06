const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }
    type Recipe {
        _id: ID
        title: String
        ingredients: [String]
        description: String
        instructions: String
        total_time: String
        dietary_restrictions: [String]
        link: String
        author: String
    }

    
    type Query {
        recipes: [Recipe]
        getRecipeTitle(search: String, page: Int, limit: Int): RecipeResult
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
            addRecipe(_id: ID!, author: String!, title: String!, ingredients: [String!], description: String!, instructions: String!, total_time: String!, dietary_restrictions: [String], link: String!): Recipe
            updateRecipe(_id: ID!, author: String!, title: String!, ingredients: [String!], description: String!, instructions: String!, total_time: String!, dietary_restrictions: [String], link: String!): Recipe
            login(email: String!, password: String!): Auth
        }
        `;
        module.exports = typeDefs;