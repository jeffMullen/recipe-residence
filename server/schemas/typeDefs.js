const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
    }
    type Recipe {
        title: String
        ingredients: [String]
        description: String
        instructions: String
        total_time: String
        dietry_restrictions: [DietaryRestrictions]
        link: String
    }

    type DietaryRestrictions {
        type: String
        _id: ID!
    }

    type Query {
        user: User
        recipe(_id: ID!): Recipe
        recipes: [Recipe]
        dietary_restrictions:[DietaryRestrictions]
    }
    
    type Auth {
        token: ID!
        user: User
    }  

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addRecipe(_id: ID!, author: String!, title: String!, ingredients: [String!], description: String!, instructions: String!, total_time: String!, dietary_restrictions: [String!], link: String!): Recipe
        updateRecipe(_id: ID!, author: String!, title: String!, ingredients: [String!], description: String!, instructions: String!, total_time: String!, dietary_restrictions: [String!], link: String!): Recipe
        login(email: String!, password: String!): Auth
    }
`;
module.exports = typeDefs;
