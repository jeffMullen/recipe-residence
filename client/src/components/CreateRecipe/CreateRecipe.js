import React, { useState } from 'react';

import RenderedRecipe from './RenderedRecipe/RenderedRecipe';
import RecipeForm from './RecipeForm/RecipeForm';

function CreateRecipe() {

    const [formData, setFormData] = useState({
        _id: '',
        author: '',
        title: '',
        ingredients: [],
        description: '',
        instructions: [],
        total_time: '',
        dietary_restrictions: [],
        link: ''
    });

    console.log(formData);

    return (
        <>
            {/* <RenderedRecipe /> */}
            <RecipeForm formData={formData} setFormData={setFormData} />

        </>
    )
}

export default CreateRecipe;