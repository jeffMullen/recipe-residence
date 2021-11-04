import React from 'react';

function CreateRecipe() {

    return (
        <>
            <form className="createRecipe">
                <div>
                    <label htmlFor="" className="form-label"></label>
                    <input id="" aria-describedby=""></input>
                </div>
                <div>
                    <label htmlFor="" className="form-label"></label>
                    <input id="" aria-describedby=""></input>
                </div>
                <div>
                    <label htmlFor="" className="form-label"></label>
                    <input id="" aria-describedby=""></input>
                </div>
                <div>
                    <label htmlFor="" className="form-label"></label>
                    <input id="" aria-describedby=""></input>
                </div>
                <div>
                    <label htmlFor="" className="form-label"></label>
                    <input id="" aria-describedby=""></input>
                </div>
                <button onClick={(e) => {
                    e.preventDefault();
                }}
                type="submit"
                >Create</button>
            </form>

        </>
    )
}

export default CreateRecipe;