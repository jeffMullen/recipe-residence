import React from 'react';
import styles from './RecipeCard.module.scss';

import { Link } from 'react-router-dom';
import recipeImg from '../../images/recipe-placeholder.jpg';

function RecipeCard({ recipe }) {

    const { _id, title, ingredients, description, instructions, total_time, link } = recipe;
    console.log(_id)
    return (
        <>
            <div className={`col-12 col-sm-6 col-md-4 col-lg-3`}>
                <Link
                    className={`${styles.recipeLink}`}
                    to={`/recipes/${_id}`}>
                    <div className={`${styles.recipeCard} card`}>
                        <img src={recipeImg} className="card-img-top" alt="..."></img>
                        <div className={`${styles.cardBody} card-body`}>
                            <h5 className="card-title">{title}</h5>
                            <p>{total_time}</p>
                            <p>{description}</p>
                            <ul className="card-text">{ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
                            <p className="card-text">{instructions}</p>
                            {/* <a href={link} rel="noreferrer" target="_blank">Blog Recipe</a> */}
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default RecipeCard;