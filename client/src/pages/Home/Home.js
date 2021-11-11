import React, { useState, useEffect } from 'react';
import styles from './Home.module.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { SEARCH_RECIPES, GET_ME } from '../../utils/queries';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
//import RecipeCard from '../components/RecipeCard';

function Home() {
    // const {loading, data} = useQuery(SEARCH_RECIPES);
    // console.log("GOT DATA?",data);
    const recipesContainer = document.querySelector('#recipesContainer');


    const { loading: getMeLoading, error: getMeError, data: getMeData, refetch } = useQuery(GET_ME);
    const [searchState, setSearchState] = useState('');
    const [pageState, setPageState] = useState(1);
    const [limitState, setLimitState] = useState(10);
    const [recipes, setRecipes] = useState([]);
    const [anchorTarget, setAnchorTarget] = useState(recipesContainer);

    useEffect(() => {
        setAnchorTarget(recipesContainer)
    }, [recipesContainer])

    const scrollToRecipes = () => {
        setTimeout(async () => {
            await setAnchorTarget(recipesContainer);
            await anchorTarget.scrollIntoView({ behavior: 'smooth' });

        }, 250);
    }

    const { loading, data } = useQuery(SEARCH_RECIPES, {
        variables: { search: searchState, page: pageState, limit: limitState }
    });

    console.log(getMeData);

    const handleInputChange = (event) => {
        // let name = event.target.name;
        let value = event.target.value;
        // console.log(name, value)
        setSearchState(value);
    }



    const myRecipes = getMeData?.me?.saved_recipes || [];

    function compareRecipeIds(currentId) {
        if (getMeData?.me == null) return false;
        for (let i = 0; i < myRecipes.length; i++) {
            if (myRecipes[i]._id === currentId) {
                return false
            }
        }
        return true
    }

    return (
        <>
            <div className={`${styles.homeBanner} container-fluid`}>
                <div className={`${styles.heroContainer} row w-100`}>
                    <div className={`${styles.heroImage} col d-flex justify-content-center align-items-center`}>
                        <form className={`d-flex flex-column align-items-center col-10 col-sm-6 col-lg-4 ${styles.searchForm}`}>
                            <input
                                className={`${styles.searchField} form-control me-2`}
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                id="dietary-restriction-search"
                                onChange={(event) => handleInputChange(event)}
                            ></input>

                            <button
                                id="search"
                                className={`${styles.searchButton} btn btn-outline-dark`}
                                type="submit"
                                onClick={async (event) => {
                                    event.preventDefault();
                                    var recipesArray = data.getRecipeTitle.recipes;
                                    await setRecipes(recipesArray);
                                    await scrollToRecipes();
                                }
                                }
                            >Search</button>

                        </form>
                    </div>
                    <div
                        id="recipesContainer"
                        className={`${styles.recipes} row mt-5 d-flex justify-content-around`}>
                        {recipes.map(recipe => <RecipeCard
                            key={recipe._id}
                            recipe={recipe}
                            showDelete={false}
                            showSave={() => compareRecipeIds(recipe._id)}
                            viewOnly={true}
                        />)}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;