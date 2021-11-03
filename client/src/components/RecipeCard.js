import React from 'react';

function RecipeCard({ recipe }) {

    const { title, ingredients, description, instructions, total_time, link } = recipe;


    return (
        <>
            <div classNameName="col">
                <div className="card">
                    <img src="..." className="card-img-top" alt="..."></img>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p>{total_time}</p>
                        <p>{description}</p>
                        <ul className="card-text">{ingredients.map(ingredient => <li>{ingredient}</li>)}</ul>
                        <p className="card-text">{instructions}</p>
                        <a href={link} rel="noreferrer" target="_blank">Blog Recipe</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecipeCard;