// Any actions that change stored data, such as user profiles or recipes
// UPDATE AND DELETE NECESSARY

import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RECIPE = gql`
mutation addRecipe($title: String!, $ingredients: [String!], $description: String!, $instructions: [String!], $total_time: String!, $dietary_restrictions: [String], $author: String!) {
  addRecipe(title: $title, ingredients: $ingredients, description: $description, instructions: $instructions, total_time: $total_time, dietary_restrictions: $dietary_restrictions, author: $author) {
      _id
      title
      author
      ingredients
      description
      instructions
      total_time
      dietary_restrictions
  }
}
`;

export const UPDATE_RECIPE = gql`
  mutation updateRecipe($_id: ID!, $title: String, $ingredients: [String], $description: String, $instructions: [String], $total_time: String, $dietry_restrictions: [DietaryRestrictions]) {
    updateRecipe(recipeId: $_id, title: $title, ingredients: $ingredients, description: $description, instructions: $instructions, total_time: $total_time, dietary_restrictions: $dietary_restrictions) {
      recipe {
        _id
        title
        author
        ingredients
        description
        instructions
        total_time
        dietary_restrictions
      }
    }
  }
`;

export const SAVE_RECIPE = gql`
mutation saveRecipe($_id: String!, $title: String!, $ingredients: [String!], $description: String!, $instructions: [String!], $total_time: String!, $dietary_restrictions: [String], $author:String!) {
  saveRecipe(_id: $_id, title: $title, ingredients: $ingredients, description: $description, instructions: $instructions, total_time: $total_time, dietary_restrictions: $dietary_restrictions, author:$author){
      _id
      username
      saved_recipes {
        _id
        title
        author
        ingredients
        description
        instructions
        total_time
      }
  }
}
`;

export const REMOVE_RECIPE = gql`
  mutation removeRecipe($_id: String!) {
      removeRecipe(_id: $_id) {
          _id
          username
          saved_recipes {
            _id
            title
            author
            ingredients
            description
            instructions
            total_time
            dietary_restrictions
        }
      }
  }
`;

