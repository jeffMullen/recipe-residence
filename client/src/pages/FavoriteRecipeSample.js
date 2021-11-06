// This code can be implemented to add favoriting functionality to our recipe cards

import React from 'react';
import { useState, useContext } from 'react';

import FavoritesContext from '../utils/favoriteRecipe';

const FavoriteRecipe = () => {
    const {favorites, add} = useContext(FavoritesContext);

    const [draft, setDraft] = useState('');

    const handleChange = event => setDraft(event.target.value);
    const handleAdd = () => {
        add(draft);
        setDraft('');
    };

    return (
        // Code here
        <div>
            <ul>
                {favorites.map(favorite => <li>{favorite}</li>)}
            </ul>
            <input value={draft} type="text" onChange={handleChange} />
            <button onClick={handleAdd}>Add</button>
        </div>
        // Code here
      );
};

export default FavoriteRecipe