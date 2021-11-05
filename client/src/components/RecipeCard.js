import React from 'react';
import styles from './RecipeCard.module.scss';

import { Link } from 'react-router-dom';
import recipeImg from '../images/recipe-placeholder.jpg';

function RecipeCard({ recipe }) {

    const { title, ingredients, description, instructions, total_time, link } = recipe;


    return (
        <>
            <Link
                className={`${styles.recipeLink} col col-sm-6 col-md-4 col-lg-3`}
                to={`/recipes/${link}`}>
                <div className="card">
                    <img src={recipeImg} className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p>{total_time}</p>
                        <p>{description}</p>
                        <ul className="card-text">{ingredients.map(ingredient => <li>{ingredient}</li>)}</ul>
                        <p className="card-text">{instructions}</p>
                        <a href={link} rel="noreferrer" target="_blank">Blog Recipe</a>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default RecipeCard;