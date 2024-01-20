

import React, { useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { NavLink,useNavigate  } from 'react-router-dom';


export default function UandP(){
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');
  const navigate = useNavigate();
  async function submitForm(){
    const options = {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_email:userEmail,  user_pass:userPass})
    };
    
    const response =  await fetch('/auth/login/uandp', options);

    if(response.status === 200){
      const res = await response.json();
     
      
      return navigate("/shoppinglist");
    

  
    }else{
      return navigate('/login');
    }
     
  }
  return (
  
    <>
      <div>Enter Login Information</div>
      <div {...stylex.props(styles.buttonWrapper)}>
        <div {...stylex.props(styles.wrap)}>
          <div>User Name</div>
          <input value={userEmail} onChange={(e)=>setUserEmail(e.target.value)}  {...stylex.props(styles.input)}/> 
        </div>
        <div {...stylex.props(styles.wrap)}>
          <div>Password</div>
          <input value={userPass} onChange={(e)=>setUserPass(e.target.value)} {...stylex.props(styles.input)}/>
        </div>
       
          
      </div>

      <button onClick={submitForm} {...stylex.props(styles.submitButton)}> Submit</button>

      <NavLink {...stylex.props(styles.backWrapper)} to={'/login'}> 
       
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...stylex.props(styles.svg)}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>

      
        <div {...stylex.props(styles.backButton)}>Back</div>
      </NavLink>
   
    </>
  );
}






const styles = stylex.create({
 
  buttonWrapper:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    marginTop:'20px',
    width: '100%',
     
  },
  wrap:{
    width:'60%',
    marginBottom:"20px",
    
  },
  
  input:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    height:'40px',
    width:'100%',
    backgroundColor:{
      default: '#e8e7d5',
      ':hover': "#d5e7e8"
    }
  },
  submitButton:{
    height:'50px',
    width: '200px',
    marginTop:'10px',
    borderRadius: '4px',
    backgroundColor:{
      default: '#d5e7e8',
      ':hover': "#d5e7f8"
    },
    color:{
      default:"#312f32",
      ':hover':'#312f32',
    }
      
  },
  backWrapper:{
    display:'flex',
   
  },
  backButton:{
    color:{
      default:"#e8e7d5",
      ':hover':'#d5e7e8',
    },
    textDecoration:'none'
  },
  svg:{
    height:"4px",
    width:"4px",
    currentColor:"white"
  }
    
});