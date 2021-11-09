import React, { useState } from 'react';
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

    const recipe = data?.getSingleRecipe || {};
    console.log(recipe);

    const { author, description, dietary_restrictions, total_time, title, instructions, ingredients } = recipe;

    const [recipeTitle, setRecipeTitle] = useState(title);
    const [totalTime, setTotalTime] = useState(total_time);
    const [recipeDescription, setRecipeDescription] = useState(description);
    const [recipeInstructions, setRecipeInstructions] = useState(instructions);
    const [recipeIngredients, setRecipeIngredients] = useState(ingredients);
    const [restrictions, setRestrictions] = useState(dietary_restrictions);

    const handleDelete = (e, item) => {
        e.preventDefault();
        let name = item.getAttribute('name');
        let value = item.textContent;

        if (name === 'dietaryRestrictions') {
            let index = restrictions.indexOf(value);

            if (index > -1) {
                let newRestrictions = restrictions.filter(restriction => {
                    return restriction !== value;
                });
                setRestrictions(newRestrictions);
            }
        }
        if (name === 'ingredients') {
            let index = recipeIngredients.indexOf(value);

            if (index > -1) {
                let newIngredients = recipeIngredients.filter(ingredient => {
                    return ingredient !== value;
                });
                setRecipeIngredients(newIngredients);
            }
        }
        if (name === 'instructions') {
            let index = recipeInstructions.indexOf(value);

            if (index > -1) {
                let newInstructions = recipeInstructions.filter(instruction => {
                    return instruction !== value;
                });
                setRecipeInstructions(newInstructions);
            }
        }
    }

    const handleInputChange = (e, input) => {
        e.preventDefault();
        let name = input.name;
        let value = input.value;
        console.log(name, value)

        if (name === 'title') {
            setRecipeTitle(value);
        }
        if (name === 'totalTime') {
            setTotalTime(value);
        }
        if (name === 'description') {
            setRecipeDescription(value);
        }
    }

    const { loading: getMeLoading, data: getMeData } = useQuery(GET_ME);
    console.log(getMeData);

    if (getMeLoading) {
        return <div>Loading...</div>
    }

    let savedRecipes = getMeData?.me?.saved_recipes;
    console.log(savedRecipes);

    let admin = false;

    // If logged in and current recipe ID matches a recipe ID in user saved_recipes: set admin priviledges to true
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


    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {Auth.loggedIn() && admin ?
                // If logged in and recipe is authored by user, render a recipe that can be updated
                <div className={`${styles.recipe} my-3 mx-3 p-5`}>
                    <div>
                        <h2>
                            {recipeTitle}
                        </h2>
                        <div>
                            <input id="title" name="title" aria-describedby=""></input>
                            <button onClick={(e) => {
                                handleInputChange(e, e.target.previousSibling)
                                e.target.previousSibling.value = '';
                            }}>
                                Change
                            </button>
                        </div>
                    </div>
                    <div>
                        <p>{totalTime}</p>
                        <div>
                            <input id="totalTime" name="totalTime" aria-describedby=""></input>
                            <button onClick={(e) => {
                                handleInputChange(e, e.target.previousSibling)
                                e.target.previousSibling.value = '';
                            }}>
                                Change
                            </button>
                        </div>
                    </div>
                    <Link to={`/profiles/${author}`}>
                        {author}
                    </Link>
                    <div>
                        <p>{recipeDescription}</p>
                        <div>
                            <input id="description" name="description" aria-describedby=""></input>
                            <button onClick={(e) => {
                                handleInputChange(e, e.target.previousSibling)
                                e.target.previousSibling.value = '';
                            }}>
                                Change
                            </button>
                        </div>
                    </div>
                    {restrictions ?
                        <div>
                            <h3>Dietary Restrictions</h3>
                            <ul className={styles.dietaryRestrictions}>
                                {restrictions.map((restriction, index) =>
                                    <div key={index}
                                        className={`${styles.listItemContainer}`}>
                                        <li className={styles.listItem} name="dietaryRestrictions" value={restriction}>{restriction}</li>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={(e) => {

                                                handleDelete(e, e.target.previousSibling)
                                            }}>
                                            X
                                        </button>
                                    </div>
                                )}
                            </ul>
                        </div>

                        :

                        <div></div>
                    }
                    {recipeIngredients ?
                        <div>
                            <h3>Ingredients</h3>
                            <ul>
                                {recipeIngredients.map((ingredient, index) =>
                                    <div key={index}
                                        className={styles.listItemContainer}>
                                        <li className={styles.listItem} name="ingredients" value={ingredient}>{ingredient}</li>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={(e) => {

                                                handleDelete(e, e.target.previousSibling)
                                            }}>
                                            X
                                        </button>
                                    </div>
                                )}
                            </ul>
                        </div>

                        :

                        <div></div>

                    }
                    {recipeInstructions ?
                        <div>
                            <h3>Instructions</h3>
                            <ol>
                                {recipeInstructions.map((instruction, index) =>
                                    <div key={index}
                                        className={styles.listItemContainer}>
                                        <li className={styles.listItem} name="instructions" value={instruction}>{instruction}</li>
                                        <button
                                            className={styles.deleteButton}
                                            onClick={(e) => {

                                                handleDelete(e, e.target.previousSibling)
                                            }}>
                                            X
                                        </button>
                                    </div>
                                )}
                            </ol>
                        </div>

                        :

                        <div></div>

                    }
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