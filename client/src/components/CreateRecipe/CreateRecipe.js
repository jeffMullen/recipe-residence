import React, { useState } from 'react';

// import RenderedRecipe from './RenderedRecipe/RenderedRecipe';
import RecipeForm from './RecipeForm/RecipeForm';

function CreateRecipe({ refetch }) {

    const [formData, setFormData] = useState({});

    // console.log(formData);

    return (
        <>
            <RecipeForm
                formData={formData}
                setFormData={setFormData}
                refetch={refetch}
            />
            {/* <RenderedRecipe formData={formData} /> */}
        </>
    )
}

export default CreateRecipe;