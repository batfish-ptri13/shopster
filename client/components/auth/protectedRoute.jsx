import React, {useEffect} from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  let loggedIn;
  
  useEffect(() => {
    
    fetch('/checkCookie')
      .then(data => data.json())
      .then(data => {
        console.log(data);
        loggedIn = data.rows[0];
      })
      .catch(err => {
        console.log('Error found in protectedRoute.jsx fetch request: ', err);
      });

  }, []);

  if(loggedIn === false) {
    return <Navigate to='/login' />;
  }
  return children;
};

export default ProtectedRoute;

