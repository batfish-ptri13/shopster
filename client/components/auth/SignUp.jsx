

import React, {useState} from 'react';
import * as stylex from '@stylexjs/stylex';



export default function SignUp(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');


  async function submitForm(){
    const options = {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({user_name: name, user_email:email, user_phone:phone, user_pass:pass})
    };
    
    const html =  await fetch('/auth/signup', options);

    if(html.status === 200){
      const response = await html.json();
   
      console.log(response);
    

  
    }else{
      console.log(await html.json());
    }
     
  }
  return (
  
    <>
     
  
        
 
      <div>Create New Account</div>
      <div {...stylex.props(styles.buttonWrapper)}>
        <div {...stylex.props(styles.wrap)}>
          <div>Name</div>
          <input value={name} onChange={(e)=>setName(e.target.value)} {...stylex.props(styles.input)}/> 
        </div>
       
        <div {...stylex.props(styles.wrap)}>
          <div>Email</div>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} {...stylex.props(styles.input)}/> 
        </div>
        <div {...stylex.props(styles.wrap)}>
          <div>Phone</div>
          <input value={phone} onChange={(e)=>setPhone(e.target.value)} {...stylex.props(styles.input)}/> 
        </div>
        <div {...stylex.props(styles.wrap)}>
          <div>Password </div>
          <input value={pass} onChange={(e)=>setPass(e.target.value)}  {...stylex.props(styles.input)}/> 
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