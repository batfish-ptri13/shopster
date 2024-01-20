/*
  type of component: presentational/container
  what it does: xxx
*/

import React, { useRef, useEffect } from 'react';
import Nav from './Nav.jsx';
import { NavLink} from 'react-router-dom';





export default function Home () {



  return (
    <div>
      <Nav />
      Welcome to Shopster
      <NavLink to={'/login'} > Login</NavLink>
    </div>
  );
}

