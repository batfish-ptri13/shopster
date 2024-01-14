import React from "react";
import * as stylex from '@stylexjs/stylex';
import { NavLink } from 'react-router-dom';
export default function LoginType() {
  return <div {...stylex.props(styles.loginBox)}>
        
 
    <div>How Would You Like To Login</div>
    <div {...stylex.props(styles.buttonWrapper)}>
         
           
      <NavLink to={'/uandp'} {...stylex.props(styles.button)}> User Name and Password</NavLink>
      <NavLink to={'/magiclink'} {...stylex.props(styles.button)}> Magic Link</NavLink>
      <NavLink to={'/text'} {...stylex.props(styles.button)}> Text Code</NavLink>
    </div>
         
  
    
  </div>;
}
  

const styles = stylex.create({
 
  buttonWrapper:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    marginTop:'20px',
    width: '100%',
   
  },
  button:{
    height:'50px',
    width: '100%',
    marginTop:'50px',
    borderRadius: '4px',
    backgroundColor:{
      default: '#e8e7d5',
      ':hover': "#d5e7e8"
    },
    textDecoration:'none',
    color:'#312f32',
    textAlign:'center',
    paddingTop:'20px'
    
  },

  

});