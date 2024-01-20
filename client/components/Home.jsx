/*
  type of component: presentational/container
  what it does: xxx
*/

import React, { useRef, useEffect } from 'react';
import NavNotLogged from './NavNotLogged.jsx';
import { NavLink, useNavigate } from 'react-router-dom';





// import lobster from '/shopster_lobster_logo_01.png'





export default function Home() {

  const navigate = useNavigate()


  // <NavLink to={'/login'} > Login</NavLink>

  function onClick() {
    navigate('/login')


  }

  return (
    <div>
      <NavNotLogged />
      <div className='homeContainer'>

        {/* <h1> Welcome to Shopster</h1> */}
        <img src='/shopster_lobster_logo_01.png'></img>
        <button onClick={onClick}>LOGIN</button>

      </div>

    </div>
  );
}

