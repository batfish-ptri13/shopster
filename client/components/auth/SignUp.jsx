

import React from 'react';
import * as stylex from '@stylexjs/stylex';



export default function SignUp(){
 
  return (
  
    <>
     
  
        
 
      <div>Create New Account</div>
      <div {...stylex.props(styles.buttonWrapper)}>
        <div {...stylex.props(styles.wrap)}>
          <div>First Name</div>
          <input {...stylex.props(styles.input)}/> 
        </div>
        <div {...stylex.props(styles.wrap)}>
          <div>Last Name</div>
          <input {...stylex.props(styles.input)}/>
        </div>
        <div {...stylex.props(styles.wrap)}>
          <div>Email</div>
          <input {...stylex.props(styles.input)}/>
        </div>
        <div {...stylex.props(styles.wrap)}>
          <div>Phone</div>
          <input {...stylex.props(styles.input)}/>
        </div>
          
          
      </div>
         
        


  

      <button {...stylex.props(styles.submitButton)}> Submit</button>
   

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
    
  }
  
});