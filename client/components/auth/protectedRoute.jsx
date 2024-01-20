import React, {useEffect} from "react";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = ({children}) => {
  let loggedIn;
  let user_id; 

 
    
  fetch('/auth/checkCookie')
    .then(data => data.json())
    .then(data => {
      console.log('ProtectedRoute.jsx: ', data);

      return user_id = data;
    })
    .then(user_id => {
      console.log('Protected', user_id);
      if(!user_id) {
        return <Navigate to='/login' />;
      }
      return children;
    })
    .catch(err => {
      console.log('Error found in protectedRoute.jsx fetch request: ', err);
    });

 

  // if(!user_id) {
  //   return <Navigate to='/login' />;
  // }
  // return children;
};

export default ProtectedRoute;

