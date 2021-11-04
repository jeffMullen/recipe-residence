import React from 'react';

import Checkbox from './Checkbox';

function CreateRecipe() {

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
    ]

    return (
        <>
            <form className="createRecipe">
                <div>
                    <label htmlFor="title" className="form-label">Title</label>
                    <input id="title" name="title" aria-describedby=""></input>
                </div>
                <div>
                    <label htmlFor="totalTime" className="form-label">Total Time</label>
                    <input id="totalTime" name="totalTime" aria-describedby=""></input>
                </div>
                {/* Dietary restrictions checkboxes */}
                <div>
                    <label htmlFor="dietaryRestrictions">Dietary Restrictions</label>
                    {dietaryRestrictions.map(restriction => <Checkbox restriction={restriction} />)}
                </div>
                <div>
                    <label htmlFor="ingredients" className="form-label">Ingredients</label>
                    <input id="ingredients" name="ingredients" aria-describedby=""></input>
                </div>
                <div>
                    <label htmlFor="description" className="form-label">Description</label>
                    <input id="description" name="description" aria-describedby=""></input>
                </div>
                <div>
                    <label htmlFor="instructions" className="form-label">Instructions</label>
                    <textarea id="instructions" name="instructions"></textarea>
                </div>
                <div>
                    <label htmlFor="" className="form-label"></label>
                    <input id="" name="" aria-describedby=""></input>
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                }}
                    type="submit"
                >Create</button>
            </form>

        </>
    )
}

export default CreateRecipe;