// Any actions that fetch data to display on the page

import { gql } from '@apollo/client';

// add recipes object
export const GET_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    email
    
  }
}
`;

// add recipes object
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
  
    }
  }
`;

// add recipes object
export const GET_RECIPES = gql`
  query recipes {
    
  }
`;

// add recipe object
export const GET_SINGLE_RECIPE = gql`
  query recipe($recipeId: ID!) {
    recipe(recipeId: $recipeId) {
    
  }
`;
