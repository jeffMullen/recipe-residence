import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import CreateRecipe from '../components/CreateRecipe/CreateRecipe';
import {gql, useMutation, useQuery} from '@apollo/client';
import {GET_ME} from '../utils/queries.js';

function Profile() {

    let [recipes, setRecipes] = useState([]);

    const { loading, error, data} = useQuery(GET_ME);
  

    const userData = data?.me || [];  
  
    console.log(userData.saved_recipes);

    recipes = userData.saved_recipes;

    return (
        <>
            <div className="profile-page container mt-5">
                <div className="row">
                    {recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
                </div>
                <CreateRecipe />
            </div>
        </>
    )

}

export default Profile;