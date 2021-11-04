import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_SINGLE_RECIPE } from '../utils/queries';

const SingleRecipe = () => {
    const { recipeId } = useParams();

    const { loading, data } = useQuery(GET_SINGLE_RECIPE, {
        variables: { recipeId: recipeId },
    });

    const recipe = data?.recipe || {};

    if (loading) {
        return <div>Loading...</div>;
    } 
    return (
        <>
        <p>{recipe.title}</p>
        <p>{recipe.author}</p>
        <p>{recipe.description}</p>
        <p>{recipe.dietary_restrictions}</p>
        <p>{recipe.total_time}</p>
        <p>{recipe.ingredients}</p>
        <p>{recipe.link}</p>
        </>
    );
};

export default SingleRecipe