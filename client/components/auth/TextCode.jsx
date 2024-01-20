import React, {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import { NavLink, useParams,useNavigate } from 'react-router-dom';



export default function Text(){
  const [userCode, setUserCode] = useState('');
  const navigate = useNavigate();
 
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");
  
  async function submitForm(){
  
    const options = {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({text_code:userCode, user_id:id})
    };
    
    const response =  await fetch('/auth/verifytext', options);
    
    if(response.status === 200){
      const res = await response.json();
     
      
      return navigate("/");
    

  
    }else{
      return navigate('/login');
    }
     
  }
  return (
  
    <>
      <div>Send Text Code</div>
      <div {...stylex.props(styles.buttonWrapper)}>
        <div {...stylex.props(styles.wrap)}>
          <div>Enter Code</div>
          <input value={userCode} onChange={(e)=>setUserCode(e.target.value)}  {...stylex.props(styles.input)}/> 
        </div>
       
       
          
      </div>

      <button onClick={submitForm} {...stylex.props(styles.submitButton)}> Get Code</button>
   
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