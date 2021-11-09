import React from 'react';
import styles from './RecipeCard.module.scss';

import { Link } from 'react-router-dom';
import recipeImg from '../../images/recipe-placeholder.jpg';

function RecipeCard({ recipe }) {

    const { title, ingredients, description, instructions, total_time, link } = recipe;

    return (
        <>
            <div className={`col-12 col-sm-6 col-md-4 col-lg-3`}>
                <button>Delete Recipe</button>
                <Link
                    className={`${styles.recipeLink}`}
                    to={`/recipes/${link}`}>
                    <div className={`${styles.recipeCard} card`}>
                        <div className={`${styles.recipeImgContainer}`}>
                            <img src={recipeImg} className={`${styles.recipeImg} card-img-top`} alt="..."></img>
                        </div>
                        <div className={`${styles.cardBody} card-body`}>
                            <div className={styles.recipeInfo}>
                                <h5 className="card-title">{title}</h5>
                                <p>{total_time}</p>
                                <p>{description}</p>
                                <ul className="card-text">{ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}</ul>
                                <p className="card-text">{instructions}</p>
                            </div>
                            <div className={styles.fade}></div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default RecipeCard;