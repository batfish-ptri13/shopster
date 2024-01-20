import LoginType from './LoginType.jsx';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import React from 'react';
import * as stylex from '@stylexjs/stylex';
import NavNotLogged from '../NavNotLogged.jsx'




export default function AuthLayout(children) {

  return (

    <>
      <NavNotLogged />
      <div {...stylex.props(styles.scafold)}>
        <div {...stylex.props(styles.loginBox)}>
          <Outlet />
          <div {...stylex.props(styles.signUp)}>
            <div>Need an account? Signup</div>
            <NavLink to={'/signup'} {...stylex.props(styles.link)}>Here</NavLink>
          </div>
        </div>
      </div>

    </>
  );
}

const styles = stylex.create({
  scafold: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBox: {
    position: 'relative',
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    alignItems: 'center',
    minHeight: '70%',
    backgroundColor: '#312f32',
    fontSize: 18,
    lineHeight: 1.5,
    color: {
      'default': '#e8e7d5'
    }
  },

  signUp: {
    position: 'absolute',
    display: 'flex',
    justifyItems: 'center',
    bottom: '0',
    right: '0'
  },
  link: {
    color: {
      'default': '#e8e7d5',
      ":hover": "#d5e7e8"
    },
    marginLeft: '4px'
  }

});