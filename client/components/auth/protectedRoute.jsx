import React, {Suspense, useEffect, useState} from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";


const ProtectedRoute =  () => {
  const [loggedIn, setLoggedIn] = useState();
  const navigate = useNavigate();
  useEffect(()=>{
    async function checkToken(){
      const userQuery = await fetch('/auth/checkCookie');
      console.log(userQuery.status);
      if(userQuery.status === 401){
        navigate('/login');
      }
      const user = await userQuery.json();
      
      setLoggedIn(true);
      
    }
    checkToken();
  },[loggedIn]);

  return(
    <Suspense fallback={<Loading />}>
      {loggedIn ? <Outlet/> : <></>}
    </Suspense>
  );
};
function Loading() {
  return <h2>🌀 Loading...</h2>;
}
export default ProtectedRoute;

