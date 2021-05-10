import { Button } from '@material-ui/core';
import React from 'react';

import styled from 'styled-components';

const Header = ({ user }) => {
  const HeaderOptions = ({ title, tooltip, alert }) => {
    return (
      <Button style={{ position: 'relative' }}>
        <span className='material-icons-outlined' style={{ color: '#63676c' }}>
          {title}
        </span>
        {alert ? (
          <span
            class='material-icons'
            style={{
              color: '#00796b',
              fontSize: '10px',
              position: 'absolute',
              right: '18px',
              top: '5px',
            }}
          >
            circle
          </span>
        ) : (
          ''
        )}
      </Button>
    );
  };

  return (
    <HeaderContainer>
      <HeaderOptions title='people' />
      <HeaderOptions title='chat' alert />
      <UserInfoContainer>
        <p>You</p>
        <RoundImg src={user?.photoURL} alt='<user_photo>' />
        <div>
          <i class='material-icons'>mic_off</i>
        </div>
      </UserInfoContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 10px;
  padding: 10px;
`;

const RoundImg = styled.img`
  object-fit: contain;
  height: 35px;
  width: auto;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    opacity: 0.8;
  }
`;

const UserInfoContainer = styled.div`
  position: relative;
  display: flex;
  margin-left: 10px;

  > p {
    line-height: 0px;
    padding: 30px 0 0 0;
    margin: 0;
    font-size: 14px;
    bottom: 0;
  }
  > div {
    position: relative;
    line-height: 0px;
    > i {
      margin-top: 22px;
      margin-left: 5px;
      font-size: 14px;
      background-color: #d93025;
      border-radius: 50%;
      color: white;
      padding: 2px;
    }
  }
`;

export default Header;
