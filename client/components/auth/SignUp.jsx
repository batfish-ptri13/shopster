

import React from 'react';
import * as stylex from '@stylexjs/stylex';



export default function SignUp(){
 
  return (
  
    <>
      <div {...stylex.props(styles.scafold)}>
        <div {...stylex.props(styles.loginBox)} >
        
 
          <div>Create New Account</div>
          <div {...stylex.props(styles.buttonWrapper)}>
         
            <div>First Name</div>
            <input {...stylex.props(styles.input)}/> 

            <div>Last Name</div>
            <input {...stylex.props(styles.input)}/>

            <div>Email</div>
            <input {...stylex.props(styles.input)}/>

            <div>Phone</div>
            <input {...stylex.props(styles.input)}/>

          
          
          </div>
         
        


        </div>

        <button {...stylex.props(styles.submitButton)}> Submit</button>
      </div>

    </>
  );
}

const styles = stylex.create({
  scafold:{
    width:'100%',
    height: '100vh',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  loginBox: {
    width:'400px',
    display:'flex',
    flexDirection:'column',
    padding:'40px',
    alignItems:'center',
    height: 'auto',
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

  input:{
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    marginTop:'20px',
    width: '50%',
    height:'40px',
    marginBottom:'10px',
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
      default: '#312f32',
      ':hover': "#d5e7e8"
    },
    color:{
      default:"#d5e7e8",
      ':hover':'#312f32',
    }
    
  }
  
});