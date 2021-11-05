import React, { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import CreateRecipe from '../components/CreateRecipe/CreateRecipe';

function Profile() {

    let [recipes, setRecipes] = useState([]);

    recipes = [
        {
            title: 'Lasagna',
            ingredients: ['Noodles', 'Mozz', 'Sauce', 'Eggplant'],
            description: 'Super good Italian flat noodle pie',
            instructions: 'Boil noodles, put in casserole dish, add sauce and such',
            total_time: '1hr 30mins',
            link: 'lasagna.com'
        },
        {
            title: 'Lasagna',
            ingredients: ['Noodles', 'Mozz', 'Sauce', 'Eggplant'],
            description: 'Super good Italian flat noodle pie',
            instructions: 'Boil noodles, put in casserole dish, add sauce and such',
            total_time: '1hr 30mins',
            link: 'lasagna.com'
        }
    ]

    return (
        <>
            <div className="profile-page container mt-5">
                <div className="row">
                    {recipes.map(recipe => <RecipeCard recipe={recipe} />)}
                </div>
                <CreateRecipe />
            </div>
        </>
    )

}

export default Profile;