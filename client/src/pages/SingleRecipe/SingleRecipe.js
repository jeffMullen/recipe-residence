import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import dietaryRestrictions from '../../utils/dietaryRestrictions';
import Checkbox from '../../components/CreateRecipe/RecipeForm/Checkbox';
import styles from './SingleRecipe.module.scss';
import viewStyles from './ViewOnlyRecipe.module.scss';

import { GET_SINGLE_RECIPE, GET_ME } from '../../utils/queries';
import { UPDATE_RECIPE } from '../../utils/mutations';

const SingleRecipe = () => {

    const { recipeId } = useParams();
    const { search } = useLocation();
    console.log(search);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    //QUERIES AND MUTATIONS
    const { loading, data, refetch } = useQuery(GET_SINGLE_RECIPE, { variables: { recipeId }, /* fetchPolicy: "network-only" */ });
    const [updateRecipe, { error, data: updateData }] = useMutation(UPDATE_RECIPE, token);

    //DATA FROM RECIPE DATABASE
    const recipe = data?.getSingleRecipe || {};
    const { _id, author, description, dietary_restrictions, total_time, title, instructions, ingredients } = recipe;

    //STATE VARIABLES
    const [viewOnly, setViewOnly] = useState(search === "?view");
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

    // Update recipe mutation
    const handleUpdateRecipe = async () => {
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

    // Get user data for Admin validation and saved_recipes
    const { loading: getMeLoading, data: getMeData } = useQuery(GET_ME, { fetchPolicy: "network-only" });
    console.log(getMeData);

    // Set user's saved recipes to variable
    let savedRecipes = getMeData?.me?.saved_recipes;
    console.log(savedRecipes);

    let admin = false;

    let userRecipe = {};

    // If logged in and current recipe ID matches a recipe ID in user saved_recipes: set admin priviledges to true
    if (Auth.loggedIn()) {
        const profile = Auth.getProfile().data._id;
        console.log('profile', profile)
        if (savedRecipes !== undefined && !viewOnly) {
            savedRecipes.forEach(recipe => {
                if (recipeId === recipe._id) {
                    console.log('MATCH');
                    userRecipe = recipe;
                    admin = true;
                }
            })
        }
    }

    useEffect(() => {
        setRecipeTitle(userRecipe.title);
        setTotalTime(userRecipe.total_time);
        setRecipeDescription(userRecipe.description);
        setRecipeInstructions(userRecipe.instructions);
        setRecipeIngredients(userRecipe.ingredients);
        setRestrictions(userRecipe.dietary_restrictions);

    }, [userRecipe]);

    console.log(title);

    if (getMeLoading) {
        return <div>Loading...</div>
    }

    Auth.loggedIn() && admin && !viewOnly ? console.log('ADMIN') : console.log('NO ACCESS');



    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            {Auth.loggedIn() && admin && !viewOnly ?
                // If logged in and recipe is saved in user's collection render a recipe that can be updated
                <div className={`${styles.recipe} mx-3 p-4 px-md-5`}>

                    <form>
                        <div className={`${styles.inputDiv} mt-4 mt-md-5 d-flex flex-column col-12`}>
                            <p className={`${styles.totalTime}`}>
                                <span
                                    className={`${styles.headings}`}>Author</span>
                                {author}
                            </p>
                        </div>
                        <div className={`${styles.inputDiv} mb-4 mb-md-5 d-flex flex-column col-12`}>
                            {recipeTitle &&

                                <p className={`${styles.totalTime}`}>
                                    <span
                                        className={`${styles.headings}`}>Title</span>
                                    {recipeTitle}
                                </p>}

                            <div>
                                <input
                                    className={`${styles.inputField}`} id="title" name="title" aria-describedby=""></input>
                                <button
                                    className={`${styles.button}`}
                                    onClick={(e) => {
                                        handleInputChange(e, e.target.previousSibling)
                                        e.target.previousSibling.value = '';
                                    }}>
                                    Change
                                </button>
                            </div>
                        </div>

                        <div className={`${styles.inputDiv} my-4 my-md-5 d-flex flex-column col-12`}>
                            <p className={`${styles.totalTime}`}>
                                <span
                                    className={`${styles.headings}`}>Total Time</span>
                                {totalTime}</p>
                            <div>
                                <input
                                    className={`${styles.inputField}`} id="totalTime" name="totalTime" aria-describedby=""></input>
                                <button
                                    className={`${styles.button}`}
                                    onClick={(e) => {
                                        handleInputChange(e, e.target.previousSibling)
                                        e.target.previousSibling.value = '';
                                    }}>
                                    Change
                                </button>
                            </div>
                        </div>

                        <div className={`${styles.inputDiv} my-4 my-md-5 d-flex flex-column col-12`}>
                            <p className={`${styles.totalTime}`}>
                                <span
                                    className={`${styles.headings}`}>Description</span>
                                {recipeDescription}</p>
                            <div>
                                <input
                                    className={`${styles.inputField}`} id="description" name="description" aria-describedby=""></input>
                                <button
                                    className={`${styles.button}`}
                                    onClick={(e) => {
                                        handleInputChange(e, e.target.previousSibling)
                                        e.target.previousSibling.value = '';
                                    }}>
                                    Change
                                </button>
                            </div>
                        </div>
                        {restrictions ?
                            <div className={`${styles.inputDiv} my-4 my-md-5 d-flex flex-column col-12`}>
                                <h3>Dietary Restrictions</h3>
                                <ul className={styles.dietaryRestrictions}>
                                    {restrictions.map((restriction, index) =>
                                        <div key={index}
                                            className={`mb-3 col-6 col-sm-4 col-md-3 d-flex  justify-content-between flex-wrap`}>
                                            <li className={styles.listItem} name="dietaryRestrictions" value={restriction}>{restriction}</li>
                                            <button
                                                className={styles.deleteButton}
                                                onClick={(e) => {

                                                    handleDelete(e, e.target.previousSibling)
                                                }}>X</button>
                                        </div>
                                    )}
                                </ul>
                                <div id="dietaryRestrictions"
                                    className={`${styles.dietaryRestrictions} col-12 d-flex justify-content-around flex-wrap`}>

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
                            <div className={`${styles.inputDiv} my-4 my-md-5 d-flex flex-column col-12`}>
                                <h3>Ingredients</h3>
                                <ul>
                                    {recipeIngredients.map((ingredient, index) =>
                                        <div key={index}
                                            className={`col-6 col-sm-4 col-md-3 mb-3 d-flex  justify-content-between flex-wrap`}>
                                            <li className={`${styles.listItem} col-6 col-md-3`} name="ingredients" value={ingredient}>{ingredient}</li>
                                            <button
                                                className={`${styles.deleteButton} col-6 col-md-3`}
                                                onClick={(e) => {

                                                    handleDelete(e, e.target.previousSibling)
                                                }}>X</button>
                                        </div>
                                    )}
                                </ul>
                                <div>
                                    <input
                                        className={`${styles.inputField}`}
                                        id="ingredients" name="ingredients" aria-describedby=""></input>
                                    <button
                                        className={`${styles.button}`}
                                        onClick={(e) => {
                                            addItem(e, e.target.previousSibling);
                                            e.target.previousSibling.value = '';
                                        }}
                                    >Add Ingredient</button>
                                </div>
                            </div>


                            :

                            <div></div>

                        }
                        {recipeInstructions ?
                            <div className={`${styles.inputDiv} my-4 my-md-5 d-flex flex-column col-12`}>
                                <h3>Instructions</h3>
                                <ol>
                                    {recipeInstructions.map((instruction, index) =>
                                        <div key={index}
                                            className={`mb-3 col-12 d-flex justify-content-between flex-wrap`}>
                                            <li
                                                className={`col-11`}
                                                name="instructions" value={instruction}>{instruction}</li>
                                            <button
                                                className={`${styles.deleteButton}`}
                                                onClick={(e) => {

                                                    handleDelete(e, e.target.previousSibling)
                                                }}>
                                                X
                                            </button>
                                        </div>
                                    )}
                                </ol>
                                <div className={`d-flex flex-column flex-md-row align-items-md-center`}>
                                    <textarea
                                        className={`${styles.instructionsField}`}
                                        id="instructions" name="instructions" aria-describedby=""></textarea>
                                    <button
                                        className={`${styles.button} ${styles.instructionsButton}`}
                                        onClick={(e) => {
                                            addItem(e, e.target.previousSibling);
                                            e.target.previousSibling.value = '';
                                        }}>Add Instruction</button>
                                </div>
                            </div>

                            :

                            <div></div>

                        }
                        <button
                            className={`${styles.submit}`}
                            onClick={(e) => {
                                e.preventDefault();
                                handleUpdateRecipe();
                                window.location.assign("/profile");
                            }}
                            type="submit"
                        >Submit Updated Recipe</button>
                    </form>
                </div>

                :
                // If not the author, render un-editable recipe
                <div className={`${viewStyles.recipe} p-3 p-md-5 my-3 mx-3`}>
                    <h3 className={`${viewStyles.title}`}>
                        {title}
                    </h3>
                    <div className={`${viewStyles.totalTime}`}>
                        <p>{total_time}</p>
                    </div>
                    <div>
                        <p>
                            <span className={`${viewStyles.authorTag}`}>Author</span> - {author}
                        </p>
                    </div>
                    <div>
                        <p>{description}</p>
                    </div>
                    {dietary_restrictions &&
                        <div className={`${viewStyles.listDivs}`}>
                            <h4 className={`${viewStyles.sectionHeadings}`}>Dietary Restrictions</h4>
                            <ul className={`${viewStyles.restrictions} d-flex justify-content-between flex-wrap`}>
                                {dietary_restrictions.map((restriction, index) => <li className={`${viewStyles.listItems} col-12 col-md-6 `} key={index}>- {restriction}</li>)}
                            </ul>
                        </div>
                    }
                    {ingredients &&
                        <div className={`${viewStyles.listDivs}`}>
                            <h4 className={`${viewStyles.sectionHeadings}`}>Ingredients</h4>
                            <ul className={`${viewStyles.ingredients} m-lg-5 d-md-flex justify-content-between flex-wrap`}>
                                {ingredients.map((ingredient, index) => <li className={`${viewStyles.listItems} col-md-5`} key={index}>{ingredient}</li>)}
                            </ul>
                        </div>
                    }
                    {instructions &&
                        <div className={`${viewStyles.listDivs}`}>
                            <h4 className={`${viewStyles.sectionHeadings}`}>Instructions</h4>
                            <ol>
                                {instructions.map((instruction, index) => <li className={`${viewStyles.listItems}`} key={index}>{instruction}</li>)}
                            </ol>
                        </div>
                    }
                </div>

            }
        </>
    );
};

export default SingleRecipe