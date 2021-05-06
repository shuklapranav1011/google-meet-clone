import React from 'react';
import styled from 'styled-components';
import HeaderIconPhoto from '../../images/google_meet_header.jpg';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Button } from '@material-ui/core';

const Header = () => {
  let current = new Date();
  console.log(current);
  current = current.toDateString();

  const [user] = useAuthState(auth);

  const HeaderOptions = ({ title, tooltip }) => {
    return (
      <Button style={{ width: 'fit-content', padding: '5px 0' }}>
        <span class='material-icons-outlined' style={{ color: '#63676c' }}>
          {title}
        </span>
      </Button>
    );
  };

  return (
    <HeaderContainer>
      <HeaderIcon src={HeaderIconPhoto}></HeaderIcon>
      <HeaderContent>
        <HeaderContentLeft>
          <h3>{current}</h3>
          <HeaderOptions title='help_outline' />
          <HeaderOptions title='announcement' />
          <HeaderOptions title='settings' />
        </HeaderContentLeft>
        <HeaderContentRight>
          <HeaderOptions title='apps' />
          <RoundImg src={user?.photoURL} alt='<user_photo>' />
        </HeaderContentRight>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const HeaderIcon = styled.img`
  object-fit: contain;
  height: 40px;
  width: auto;

  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const HeaderContentLeft = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #63676c;
  > h3 {
    font-weight: 100;
    margin-right: 10px;
  }
  margin-right: 30px;
`;

const HeaderContentRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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

export default Header;
