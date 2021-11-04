import React from 'react';

function Checkbox({ restriction }) {

    return (
        <>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value={restriction} id="flexCheckDefault"></input>
                <label className="form-check-label" for="flexCheckDefault">
                    {restriction}
                </label>
            </div>
        </>
    )
}

export default Checkbox;