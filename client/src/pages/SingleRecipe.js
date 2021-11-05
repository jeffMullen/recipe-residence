import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="my-3">
            <h3 className="card-header">
                <p>{recipe.title}</p>
                <Link to={`/profiles/${recipe.author}`}>
                <p>{recipe.author}</p>
                </Link>
            </h3>
            <p>{recipe.description}</p>
            <p>{recipe.dietary_restrictions}</p>
            <p>{recipe.total_time}</p>
            <blockquote>
                <p>{recipe.ingredients}</p>
            </blockquote>
            <p>{recipe.instructions}</p>
            <p>{recipe.link}</p>
        </div>
        </>
    );
};

export default SingleRecipe