import React, { useState } from 'react';

// import RenderedRecipe from './RenderedRecipe/RenderedRecipe';
import RecipeForm from './RecipeForm/RecipeForm';

function CreateRecipe({ refetch }) {

    const [formData, setFormData] = useState({});

    return (
        <>
            <RecipeForm
                formData={formData}
                setFormData={setFormData}
                refetch={refetch}
            />
        </>
    )
}

export default CreateRecipe;