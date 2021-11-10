import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../../utils/auth';
import Checkbox from './Checkbox';
import { ADD_RECIPE } from '../../../utils/mutations';
import styles from './RecipeForm.module.scss';
import RenderedRecipe from '../RenderedRecipe/RenderedRecipe';


function RecipeForm({ formData, setFormData, refetch }) {

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    const [addRecipe, { error, data }] = useMutation(ADD_RECIPE, token);

    const dietaryRestrictions = [
        'Vegan',
        'Vegetarian',
        'Dairy-Free',
        'Egg-Free',
        'Kosher',
        'Halal',
        'Keto',
        'Paleo',
        'Diabetic',
        'Lactose-Intoloerant',
        'Low-Carb',
        'Low-Fat',
        'Fat-Free',
        'Gluten-Free',
        'Peanut-Free',
        'Nut-Free',
        'Shellfish-Free',
        'Soy-Free'
    ];

    const [title, setTitle] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [restriction, setRestriction] = useState([]);

    // Track input changes in state
    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'title') {
            setTitle(value)
        }
        if (name === 'totalTime') {
            setTotalTime(value)
        }
        if (name === 'description') {
            setDescription(value)
        }
    }

    // Add ingredients & instructions to their respective arrays in state
    const addItem = (e, input) => {
        e.preventDefault()
        let name = input.name;
        let value = input.value;

        if (name === 'ingredients') {
            setIngredients([...ingredients, value]);
        }
        if (name === 'instructions') {
            setInstructions([...instructions, value])
        }
    }

    // Add dietary restriction to state array
    const addRestriction = (e) => {
        console.log(e.target.value)
        let value = e.target.value;

        if (e.target.checked === true) {
            setRestriction([...restriction, value])
        } else (
            setRestriction(restriction.filter(item => item !== value))
        )
    }

    // Create recipe mutation
    const createRecipe = async () => {
        console.log('IN CREATE RECIPE')
        if (!token) {
            return false;
        }

        console.log(Auth.getProfile().data._id)
        let author = Auth.getProfile().data.username;
        let _id = Auth.getProfile().data._id;

        try {
            await addRecipe({
                variables: { title, total_time: totalTime, description, ingredients, instructions, dietary_restrictions: restriction, author }
            });
            setTitle('');
            setTotalTime('');
            setDescription('');
            setRestriction([]);
            setIngredients([]);
            setInstructions([]);

            await refetch();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div className="mt-5 col-12 col-lg-6">
                <h2 className={`text-center`}>Create A Recipe</h2>
                <form className={`${styles.createRecipe} p-4 p-md-5`}>
                    <div className={`${styles.inputDiv} d-flex flex-column col-12`}>
                        <label htmlFor="title" className={`${styles.inputLabel} form-label`}>Title</label>
                        <input
                            className={`${styles.inputField}`}
                            onChange={(e) => handleInputChange(e)}
                            id="title" name="title" aria-describedby=""></input>
                    </div>
                    <div className={`${styles.inputDiv} my-4 my-md-5 d-flex flex-column col-12`}>
                        <label htmlFor="totalTime" className={`${styles.inputLabel} form-label`}>Total Time</label>
                        <input
                            className={`${styles.inputField}`}
                            onChange={(e) => handleInputChange(e)}
                            id="totalTime" name="totalTime" aria-describedby=""></input>
                    </div>
                    <div className={`${styles.inputDiv} my-4 my-md-5 d-flex flex-column col-12`}>
                        <label htmlFor="description" className={`${styles.inputLabel} form-label`}>Description</label>
                        <input
                            className={`${styles.inputField}`}
                            onChange={(e) => handleInputChange(e)}
                            id="description" name="description" aria-describedby=""></input>
                    </div>
                    {/* Dietary restrictions checkboxes */}
                    <div className={`${styles.inputDiv} my-4 my-md-5 d-flex flex-column col-12`}>
                        <label
                            className={`${styles.inputLabel} pb-4`}
                            htmlFor="dietaryRestrictions">Dietary Restrictions</label>
                        <div id="dietaryRestrictions"
                            className={`${styles.dietaryRestrictions} col-12 d-flex justify-content-around flex-wrap`}>

                            {dietaryRestrictions.map((restriction, index) =>
                                <Checkbox
                                    addRestriction={addRestriction}
                                    key={index}
                                    restriction={restriction} />)}
                        </div>
                    </div>
                    <div className={`${styles.inputDiv} my-4 my-md-5 d-flex flex-column col-12`}>
                        <label htmlFor="ingredients" className={`${styles.inputLabel} form-label`}>Ingredients</label>
                        <div>
                            <input
                                className={`${styles.inputField}`}
                                id="ingredients"
                                name="ingredients"
                                aria-describedby=""></input>
                            <button
                                className={`${styles.button}`}
                                onClick={(e) => {
                                    addItem(e, e.target.previousSibling);
                                    e.target.previousSibling.value = '';
                                }}
                            >Add Ingredient</button>
                        </div>
                    </div>

                    <div className={`${styles.inputDiv} my-4 my-md-5 d-flex flex-column col-12`}>
                        <label htmlFor="instructions" className={`${styles.inputLabel} form-label`}>Instructions</label>
                        <div>
                            <input
                                className={`${styles.inputField}`}
                                id="instructions"
                                name="instructions"
                                aria-describedby=""></input>
                            <button
                                className={`${styles.button}`}
                                onClick={(e) => {
                                    addItem(e, e.target.previousSibling);
                                    e.target.previousSibling.value = '';
                                }}
                            >Add Instructions</button>
                        </div>
                    </div>
                    <button
                        className={`${styles.submit} mt-3`}
                        onClick={(e) => {
                            e.preventDefault();
                            createRecipe();
                        }}
                        type="submit"
                    >Create</button>
                </form>
            </div>
            <div className="col-12 col-md-6">
                <RenderedRecipe
                    ingredients={ingredients}
                    instructions={instructions} />
            </div>
        </>
    )
}

export default RecipeForm;