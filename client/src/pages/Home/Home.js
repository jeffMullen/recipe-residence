import React, { useState } from 'react';
import styles from './Home.module.scss';
import { useQuery } from '@apollo/client';
import { SEARCH_RECIPES } from '../../utils/queries';
import RecipeCard from '../../components/RecipeCard/RecipeCard';
//import RecipeCard from '../components/RecipeCard';

function Home() {
    // const {loading, data} = useQuery(SEARCH_RECIPES);
    // console.log("GOT DATA?",data);

    const [searchState, setSearchState] = useState('');
    const [pageState, setPageState] = useState(1);
    const [limitState, setLimitState] = useState(10);
    const [recipes, setRecipes] = useState([]);
    const { loading, data } = useQuery(SEARCH_RECIPES, {
        variables: { search: searchState, page: pageState, limit: limitState }
    });

    const handleInputChange = (event) => {
        // let name = event.target.name;
        let value = event.target.value;
        // console.log(name, value)
        setSearchState(value);
    }

    return (
        <>
            <div className={`${styles.homeBanner} container-fluid`}>
                <div className={`${styles.heroContainer} row w-100`}>
                    <div className={`${styles.heroImage} col`}>
                        <form className={`d-flex col-12 col-lg-6 ${styles.searchForm}`}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                id="dietary-restriction-search"
                                onChange={(event) => handleInputChange(event)}
                            ></input>
                            <button
                                id="search"
                                className="btn btn-outline-dark"
                                type="submit"
                                onClick={(event) => {
                                    event.preventDefault();
                                    var recipesArray = data.getRecipeTitle.recipes;
                                    setRecipes(recipesArray);
                                }
                                }
                            >Search</button>
                        </form>
                    </div>
                    <div>
                        {recipes.map(recipe => <RecipeCard key={recipe._id} recipe={recipe} />)}
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home;
                        // <RecipeCard>
                        // </RecipeCard>