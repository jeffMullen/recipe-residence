import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import Checkbox from './Checkbox';
import { ADD_RECIPE } from '../../../utils/mutations';

function RecipeForm({ formData, setFormData }) {

    const [addRecipe, { error, data }] = useMutation(ADD_RECIPE);

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
            totalTime,
            description
        })
        console.log(formData);
    }

    const [title, setTitle] = useState('');
    const [totalTime, setTotalTime] = useState('');
    const [description, setDescription] = useState('');

    const handleInputChange = (e) => {
        console.log(e.target.name, e.target.value)
        if (e.target.name === 'title') {
            setTitle(e.target.value)
        }
        if (e.target.name === 'totalTime') {
            setTotalTime(e.target.value)
        }
        if (e.target.name === 'description') {
            setDescription(e.target.value)
        }

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
                {/* <div>
                    <label htmlFor="ingredients" className="form-label">Ingredients</label>
                    <input id="ingredients" name="ingredients" aria-describedby=""></input>
                </div> */}
                <div>
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        onChange={(e) => handleInputChange(e)}
                        id="description" name="description" aria-describedby=""></input>
                </div>
                {/* <div>
                    <label htmlFor="instructions" className="form-label">Instructions</label>
                    <textarea id="instructions" name="instructions"></textarea>
                </div> */}
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