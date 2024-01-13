import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nav() {

    const navigate = useNavigate();

    function handleClick(event) {
        if (event.target.innerText === 'Store Map') navigate('/maze');
        else if (event.target.innerText === 'Shopping List') navigate('/');
    }

    return (
        <div className='nav'>
            <div className='navContent'>
                <h1>SHOPSTER</h1>
                <ul>
                    <li onClick={handleClick}>Shopping List</li>
                    <li onClick={handleClick}>Store Map</li>
                </ul>
            </div>
        </div>
    )


}