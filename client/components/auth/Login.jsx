

import React from 'react';
import * as stylex from '@stylexjs/stylex';
import { NavLink } from 'react-router-dom';



export default function Login(){
 
  return (
  
    <>
      <div {...stylex.props(styles.scafold)}>
        <div {...stylex.props(styles.loginBox)} >
        
 
          <div>How Would You Like To Login</div>
          <div {...stylex.props(styles.buttonWrapper)}>
         
           
            <button {...stylex.props(styles.button)}> User Name and Password</button>
            <button {...stylex.props(styles.button)}> Magic Link</button>
            <button {...stylex.props(styles.button)}> Text Code</button>
          </div>
         
  
          <div  {...stylex.props(styles.signUp)}>
            <div>Need an account? Signup</div>
            <NavLink to={'/signup'} {...stylex.props(styles.link)}>Here</NavLink> 
          </div>
        </div>
       
      </div>

    </>
  );
}

const styles = stylex.create({
  scafold:{
    width:'100%',
    height: '100vh',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  },
  loginBox: {
    position:'relative',
    width:'400px',
    display:'flex',
    flexDirection:'column',
    padding:'20px',
    alignItems:'center',
    height: '400px',
    backgroundColor:'#312f32',
    fontSize: 18,
    lineHeight: 1.5,
    color: {
      'default':'#e8e7d5'
    }
  },
  buttonWrapper:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    marginTop:'20px',
    width: '100%',
   
  },
  button:{
    height:'40px',
    width: '50%',
    marginTop:'20px',
    borderRadius: '4px',
    backgroundColor:{
      default: '#e8e7d5',
      ':hover': "#d5e7e8"
    }
    
  },
  signUp:{
    position:'absolute',
    display:'flex',
    justifyItems:'center',
    bottom:'0',
    right:'0'
  },
  link:{
    color: {
      'default':'#e8e7d5',
      ":hover": "#d5e7e8"
    },
    marginLeft:'4px'
  }
  
});