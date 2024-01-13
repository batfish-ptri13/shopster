

import React from 'react';
import * as stylex from '@stylexjs/stylex';



export default function Login(){
 
  return (
  
  <>
<div {...stylex.props(styles.scafold)}>
  <div {...stylex.props(styles.loginBox)} >
  <div>
    Login
  </div>
 
  <div {...stylex.props(styles.inputWrapper)}>
  <div>Name</div>
    <input {...stylex.props(styles.input)}/>
</div>
  


  </div>
  </div>

  </>
  )
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
    inputWrapper:{
        marginTop:'20px',
     width: '100%'
    },
    input:{
        height:'20px',
        width: '80%'
    }
  
  });