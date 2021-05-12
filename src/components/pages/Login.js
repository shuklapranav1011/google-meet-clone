import { Button } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { auth, providerGoogle, providerGithub } from '../../firebase';
import logo from '../../images/google_meet_logo.png';

const Login = () => {
  const signInGoogle = (e) => {
    e.preventDefault();
    auth.signInWithPopup(providerGoogle).catch((err) => console.log(err));
  };
  // const signInGithub = (e) => {
  //   e.preventDefault();
  //   auth.signInWithPopup(providerGithub).catch((err) => console.log(err));
  // };
  return (
    <LoginContainer>
      <LoginLogoContainer>
        <img src={logo} alt='google_meet_logo' />
        <h1>Sign In</h1>
        <p>Google Meet Clone</p>
        <Button onClick={signInGoogle}> Sign In via Google</Button>
        {/* <Button onClick={signInGithub}>Sign In via Github</Button> */}
        <Button
          href='/about'
          style={{
            width: 'fit-content',
            padding: '5px 10px',
            marginLeft: '5px',
            position: 'absolute',
            right: '30px',
            top: '20px',
            textTransform: 'none',
            borderRadius: '5px',
          }}
          target='_blank'
        >
          <p style={{ color: '#63676c', fontSize: 'normal', padding: '0 5px' }}>
            About{' '}
          </p>
          <span
            className='material-icons-outlined'
            style={{ color: '#63676c', fontSize: '2rem' }}
          >
            info
          </span>
        </Button>
      </LoginLogoContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginLogoContainer = styled.div`
  border: 1px solid black;
  position: relative;
  background-color: white;
  padding: 200px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.12);
  border-radius: 25px;
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 30px;
    text-transform: inherit;
    background-color: #41af8e;
    color: white;
    margin: 10px;
    margin-top: 20px;
    &:hover {
      color: black;
    }
  }
`;
