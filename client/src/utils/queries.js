// Any actions that fetch data to display on the page

import { gql } from '@apollo/client';

export const GET_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    email
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

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
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

export const SEARCH_RECIPES = gql`
  query getRecipeTitle($search: String, $page: Int, $limit: Int) { 
    getRecipeTitle(search: $search, page: $page, limit: $limit) {
      currentPage
      totalPages
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
  }`;

export const GET_SINGLE_RECIPE = gql`
  query getSingleRecipe($recipeId: ID!) {
    getSingleRecipe(recipeId: $recipeId) {
      _id
      title
      author
      ingredients
      description
      instructions
      total_time
      dietary_restrictions
  }
}`;
