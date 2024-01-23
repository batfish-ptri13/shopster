import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Nav() {

  const navigate = useNavigate();

  async function handleClick(event) {
    if (event.target.innerText === 'Store Map') navigate('/maze');
    else if (event.target.innerText === 'Shopping List') navigate('/shoppinglist');
    else if (event.target.innerText === 'Logout'){
      
      const logout = await fetch('/auth/logout');
      if(logout.status === 200) navigate('/');
    } 
  }

  return (
    <div className='nav'>
      <div className='navContent'>

        <h1>SHOPSTER</h1>

        <ul>
          <li onClick={handleClick}>Shopping List</li>
          <li onClick={handleClick}>Store Map</li>
          <li onClick={handleClick}>Logout</li>
        </ul>
      </div>
    </div>
  );


}