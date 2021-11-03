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
    }

    type Query {
        user: User
        recipe(_id: ID!): Recipe
        recipes: [Recipe]
        dietary_restrictions:[DietaryRestrictions]
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        
        login(email: String!, password: String!): Auth
    }
`;
//still need to add mutation for addRecipe once more is built
module.exports = typeDefs;
