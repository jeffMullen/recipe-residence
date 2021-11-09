import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import dietaryRestrictions from '../../utils/dietaryRestrictions';
import Checkbox from '../../components/CreateRecipe/RecipeForm/Checkbox';
import styles from './SingleRecipe.module.scss';

import { GET_SINGLE_RECIPE, GET_ME } from '../../utils/queries';
import { UPDATE_RECIPE } from '../../utils/mutations';

const SingleRecipe = () => {
    const { recipeId } = useParams();

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    const { loading, data, refetch } = useQuery(GET_SINGLE_RECIPE, {
        variables: { recipeId },
    });

    const [updateRecipe, { error, data: updateData }] = useMutation(UPDATE_RECIPE, token);

    const recipe = data?.getSingleRecipe || {};
    console.log(recipe);

    const { _id, author, description, dietary_restrictions, total_time, title, instructions, ingredients } = recipe;

    const [recipeTitle, setRecipeTitle] = useState(title);
    const [totalTime, setTotalTime] = useState(total_time);
    const [recipeDescription, setRecipeDescription] = useState(description);
    const [recipeInstructions, setRecipeInstructions] = useState(instructions);
    const [recipeIngredients, setRecipeIngredients] = useState(ingredients);
    const [restrictions, setRestrictions] = useState(dietary_restrictions);

    // Delete items from arrays in state
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

    // Change states of Title, Total Time, and Description
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

    // Add items to Ingredients and Instructions state arrays
    const addItem = (e, input) => {
        e.preventDefault()
        let name = input.name;
        let value = input.value;

        if (name === 'ingredients') {
            setRecipeIngredients([...recipeIngredients, value]);
        }
        if (name === 'instructions') {
            setRecipeInstructions([...recipeInstructions, value])
        }
    }

    // Add Restrictions to array in state
    const addRestriction = (e) => {
        console.log(e.target.value)
        let value = e.target.value;

        if (e.target.checked === true) {
            setRestrictions([...restrictions, value])
        } else (
            setRestrictions(restrictions.filter(item => item !== value))
        )
    }

    // Create recipe mutation
    const handleUpdateRecipe = async () => {
        console.log('IN UPDATE RECIPE')
        if (!token) {
            return false;
        }

        try {
            await updateRecipe({
                variables: { _id, author, title: recipeTitle, total_time: totalTime, description: recipeDescription, ingredients: recipeIngredients, instructions: recipeInstructions, dietary_restrictions: restrictions }
            })
            await refetch();
        } catch (err) {
            console.error(err);
        }
    }

    // Get user data for Admin validation
    const { loading: getMeLoading, data: getMeData } = useQuery(GET_ME);
    console.log(getMeData);

    if (getMeLoading) {
        return <div>Loading...</div>
    }

    // Set user's saved recipes to variable
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
                                            }}>X</button>
                                    </div>
                                )}
                            </ul>
                            <div id="dietaryRestrictions">

                                {dietaryRestrictions.map((restriction, index) =>
                                    <Checkbox
                                        addRestriction={addRestriction}
                                        key={index}
                                        restriction={restriction} />)}
                            </div>
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
                                            }}>X</button>
                                    </div>
                                )}
                            </ul>
                            <div>
                                <label htmlFor="ingredients" className="form-label">Ingredients</label>
                                <input
                                    id="ingredients" name="ingredients" aria-describedby=""></input>
                                <button
                                    onClick={(e) => {
                                        addItem(e, e.target.previousSibling);
                                        e.target.previousSibling.value = '';
                                    }}
                                >Add</button>
                            </div>
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
                            <div>
                                <label htmlFor="instructions" className="form-label">Instructions</label>
                                <input
                                    id="instructions" name="instructions" aria-describedby=""></input>
                                <button
                                    onClick={(e) => {
                                        addItem(e, e.target.previousSibling);
                                        e.target.previousSibling.value = '';
                                    }}>Add</button>
                            </div>
                        </div>

                        :

                        <div></div>

                    }
                    <button onClick={(e) => {
                        e.preventDefault();
                        handleUpdateRecipe();
                    }}
                        type="submit"
                    >Submit Updated Recipe</button>
                </div>

                :

                null

                // If recipe is not authored by user, show standard recipe
                // <div className={`${styles.recipe} my-3 mx-3`}>
                //     <h3>
                //         {title}
                //     </h3>
                //     <div>
                //         <p>{total_time}</p>
                //     </div>
                //     <Link to={`/profiles/${author}`}>
                //         {author}
                //     </Link>
                //     <div>
                //         <p>{description}</p>
                //     </div>
                //     <div>
                //         <ul>
                //             {dietary_restrictions.map((restriction, index) => <li key={index}>{restriction}</li>)}
                //         </ul>
                //     </div>
                //     <div>
                //         <ul>
                //             {ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
                //         </ul>
                //     </div>
                //     <div>
                //         <ol>
                //             {instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
                //         </ol>
                //     </div>
                // </div>

            }
        </>
    );
};

export default SingleRecipe