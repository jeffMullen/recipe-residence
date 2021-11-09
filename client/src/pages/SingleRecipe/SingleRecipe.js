import React from 'react';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../../utils/auth';
import styles from './SingleRecipe.module.scss';

import { GET_SINGLE_RECIPE, GET_ME } from '../../utils/queries';

const SingleRecipe = () => {
    const { recipeId } = useParams();

    const { loading, data } = useQuery(GET_SINGLE_RECIPE, {
        variables: { recipeId },
    });
    const { loading: getMeLoading, data: getMeData } = useQuery(GET_ME);
    console.log(getMeData);

    if (getMeLoading) {
        return <div>Loading...</div>
    }

    let savedRecipes = getMeData?.me?.saved_recipes;
    console.log(savedRecipes);
    // If logged in && profile._id === recipe.userId {
    // const admin = true;

    let admin = false;

    if (Auth.loggedIn()) {
        const profile = Auth.getProfile().data._id;
        console.log('profile', profile)
        if (savedRecipes !== undefined) {
            savedRecipes.forEach(recipe => {
                if (recipeId === recipe._id) {
                    console.log('MATCH');
                    admin = true;
                }
            })
        }
    }

    Auth.loggedIn() && admin ? console.log('ADMIN') : console.log('NO ACCESS');

    const recipe = data?.getSingleRecipe || {};
    console.log(recipe);

    const { author, description, dietary_restrictions, total_time, title, instructions, ingredients } = recipe;

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {Auth.loggedIn() && admin ?
                // If logged in and recipe is authored by user, render a recipe that can be updated
                <div className={`${styles.recipe} my-3 mx-3`}>
                    <h2>
                        {title}
                    </h2>
                    <div>
                        <p>{total_time}</p>
                    </div>
                    <Link to={`/profiles/${author}`}>
                        {author}
                    </Link>
                    <div>
                        <p>{description}</p>
                    </div>
                    <div>
                        <h3>Dietary Restrictions</h3>
                        <ul>
                            {dietary_restrictions.map((restriction, index) =>
                                <div key={index}>
                                    <li>{restriction}</li>
                                    <button onClick={() => console.log("CLICK")}>
                                        X
                                    </button>
                                </div>
                            )}
                        </ul>
                    </div>
                    <div>
                        <ul>
                            {ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
                        </ul>
                    </div>
                    <div>
                        <ol>
                            {instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
                        </ol>
                    </div>
                </div>

                :

                // If recipe is not authored by user, show standard recipe
                <div className={`${styles.recipe} my-3 mx-3`}>
                    <h3>
                        {title}
                    </h3>
                    <div>
                        <p>{total_time}</p>
                    </div>
                    <Link to={`/profiles/${author}`}>
                        {author}
                    </Link>
                    <div>
                        <p>{description}</p>
                    </div>
                    <div>
                        <ul>
                            {dietary_restrictions.map((restriction, index) => <li key={index}>{restriction}</li>)}
                        </ul>
                    </div>
                    <div>
                        <ul>
                            {ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
                        </ul>
                    </div>
                    <div>
                        <ol>
                            {instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
                        </ol>
                    </div>
                </div>

            }
        </>
    );
};

export default SingleRecipe