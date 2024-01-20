

import React, { useState } from 'react';
import * as stylex from '@stylexjs/stylex';



export default function UandP(){
  const [userEmail, setUserEmail] = useState('');
  const [userPass, setUserPass] = useState('');

  async function submitForm(){
    const options = {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_email:userEmail,  user_pass:userPass})
    };
    
    const html =  await fetch('/auth/login/uandp', options);

    if(html.status === 200){
      const response = await html.json();
   
      console.log(response);
    

  
    }else{
      console.log(await html.json());
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