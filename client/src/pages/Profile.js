import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard/RecipeCard";
import CreateRecipe from '../components/CreateRecipe/CreateRecipe';
import { gql, useMutation, useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries.js';
import styles from './Profile.module.scss';

function Profile() {

    let [recipes, setRecipes] = useState([]);

    const { loading, error, data, refetch } = useQuery(GET_ME, {fetchPolicy: "network-only"});
    const userData = data?.me || [];
    console.log(userData.saved_recipes);
    recipes = userData.saved_recipes || [];

    return (
        <>
            <div className={`${styles.profilePage} profile-page container d-flex flex-column align-items-center`}>
                <div className={`${styles.banner}`}></div>
                <div className={`${styles.fade}`}></div>
                <div className={`${styles.row} ${styles.recipes} row d-flex justify-content-center`}>
                    {recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} showDelete={true} />)}
                </div>
                <div className={`${styles.row} row d-flex justify-content-center`}>
                    <CreateRecipe refetch={refetch} />
                </div>
            </div>
        </>
    )

}

export default Profile;