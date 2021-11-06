import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../../utils/auth';

import Checkbox from './Checkbox';
import { ADD_RECIPE } from '../../../utils/mutations';

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

    const editState = () => {
        setFormData({
            title,
            total_time: totalTime,
            description,
            instructions,
            ingredients
        })
        console.log(formData);
    }

    const [title, setTitle] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        // console.log(name, value)

        if (name === 'title') {
            setTitle(value)
        }
        if (name === 'totalTime') {
            setTotalTime(value)
        }
        if (name === 'description') {
            setDescription(value)
        }
        if (name === 'instructions') {
            setInstructions(value);
        }

        editState();
    }



    const addIngredient = (e, input) => {
        e.preventDefault()
        let value = input.value;

        setIngredients([...ingredients, value]);
        console.log('ingredients', ingredients)
        editState();
    }

    // 
    const createRecipe = async () => {
        console.log('CREATE RECIPE');
        try {
            const { data } = await addRecipe({
                variables: { ...formData }
            })

        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <form className="createRecipe">
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
                    {dietaryRestrictions.map(restriction => <Checkbox restriction={restriction} />)}
                </div>
                <div>
                    <label htmlFor="ingredients" className="form-label">Ingredients</label>
                    <input id="ingredients" name="ingredients" aria-describedby=""></input>
                    <button
                        onClick={(e) => {
                            addIngredient(e, e.target.previousSibling)
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
                    <textarea
                        onChange={(e) => handleInputChange(e)}
                        id="instructions" name="instructions"></textarea>
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