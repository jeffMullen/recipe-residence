// Any actions that fetch data to display on the page

import { gql } from '@apollo/client';

export const GET_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    email
    recipes {
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

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      savedRecipes {
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

export const GET_RECIPES = gql`
  query recipes {
    recipes {
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

export const GET_SINGLE_RECIPE = gql`
  query recipe($_id: ID!) {
    recipe(recipeId: $_id) {
    _id
    title
    author
    ingredients
    description
    instructions
    total_time
    dietary_restrictions
  }
`;
