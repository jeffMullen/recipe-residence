import React from 'react';
import styles from './RenderedRecipe.module.scss';

function RenderedRecipe({ ingredients, instructions }) {

    console.log('ingredients', ingredients);
    console.log('instructions', instructions);
    return (
        <>
            <section className={`${styles.renderedRecipe} d-flex`}>
                <div className={`col-6`}>
                    <ul>
                        {ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
                    </ul>
                </div>
                <div className={`col-6`}>
                    <ol>
                        {instructions.map((instruction, index) => <li key={index}>{instruction}</li>)}
                    </ol>
                </div>
            </section>
        </>
    )
}

export default RenderedRecipe;