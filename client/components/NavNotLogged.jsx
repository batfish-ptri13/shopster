import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NavNotLogged() {

    const navigate = useNavigate();

    function login() {
        navigate('/login')
    }

    function home() {
        navigate('/')
    }

    return (
        <div className='nav'>
            <div className='navContent'>

                <h1>SHOPSTER</h1>

                <ul>
                    <li onClick={login}>Login</li>
                    <li onClick={home}>Home</li>

                </ul>
            </div>
        </div>
    );


}