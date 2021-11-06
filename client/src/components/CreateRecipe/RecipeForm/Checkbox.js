import React from 'react';

function Checkbox({ restriction, addRestriction }) {

    return (
        <>
            <div className="form-check">
                <input
                    onClick={(e) => addRestriction(e)}
                    className="form-check-input" type="checkbox" value={restriction} id="flexCheckDefault"></input>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    {restriction}
                </label>
            </div>
        </>
    )
}

export default Checkbox;