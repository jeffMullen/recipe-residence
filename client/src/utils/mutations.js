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
  mutation addRecipe($recipeInfo: String!) {
    addRecipe(recipeInfo: $recipeInfo) {
      recipeInfo {
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