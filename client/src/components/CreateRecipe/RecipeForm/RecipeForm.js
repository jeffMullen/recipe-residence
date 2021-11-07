import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../../utils/auth';
import Checkbox from './Checkbox';
import { ADD_RECIPE } from '../../../utils/mutations';
import styles from './RecipeForm.module.scss';

function RecipeForm({ formData, setFormData }) {

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
            })
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <form className={`${styles.createRecipe} createRecipe`}>
                <div>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        onChange={(e) => handleInputChange(e)}
                        id="title" name="title" aria-describedby=""></input>
                </div>
                <div>
                    <label htmlFor="totalTime" className="form-label">Total Time</label>
                    <input
                        onChange={(e) => handleInputChange(e)}
                        id="totalTime" name="totalTime" aria-describedby=""></input>
                </div>
                {/* Dietary restrictions checkboxes */}
                <div>
                    <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
                    <div id="dietaryRestrictions">

                        {dietaryRestrictions.map((restriction, index) =>
                            <Checkbox
                                addRestriction={addRestriction}
                                key={index}
                                restriction={restriction} />)}
                    </div>
                </div>
                <div>
                    <label htmlFor="ingredients" className="form-label">Ingredients</label>
                    <input id="ingredients" name="ingredients" aria-describedby=""></input>
                    <button
                        onClick={(e) => {
                            addItem(e, e.target.previousSibling);
                            e.target.previousSibling.value = '';
                        }}
                    >Add</button>
                </div>
                <div>
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        onChange={(e) => handleInputChange(e)}
                        id="description" name="description" aria-describedby=""></input>
                </div>
                <div>
                    <label htmlFor="instructions" className="form-label">Instructions</label>
                    <input
                        id="instructions" name="instructions" aria-describedby=""></input>
                    <button
                        onClick={(e) => {
                            addItem(e, e.target.previousSibling);
                            e.target.previousSibling.value = '';
                        }}
                    >Add</button>
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                    createRecipe();
                }}
                    type="submit"
                >Create</button>
            </form>
        </>
    )
}

export default RecipeForm;