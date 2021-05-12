import React from 'react';
import styled from 'styled-components';
import HeaderIconPhoto from '../../images/google_meet_header.jpg';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
  let current = new Date();
  console.log(current);
  current = current.toDateString();

  const [user] = useAuthState(auth);

  const HeaderOptions = ({ title, tooltip }) => {
    return (
      <Button
        style={{ width: 'fit-content', padding: '5px 0', marginLeft: '5px' }}
      >
        <span className='material-icons-outlined' style={{ color: '#63676c' }}>
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
          <StyledLink to='/about'>About</StyledLink>
          <Button
            onClick={(e) => {
              e.preventDefault();
              console.log('signing out');
              auth.signOut();
            }}
            style={{
              width: 'fit-content',
              padding: '5px 0',
              marginLeft: '5px',
            }}
          >
            <span
              className='material-icons-outlined'
              style={{ color: '#63676c' }}
            >
              logout
            </span>
          </Button>
        </HeaderContentRight>
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px 10px 15px;
  height: 5%;
`;

const HeaderIcon = styled.img`
  object-fit: contain;
  height: 35px;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  width: fit-content;
  padding: 5px 20px;
  margin-left: 10px;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  border-radius: 5px;
  font-weight: normal;
  font-size: 1.17em;
  color: #00675b;
  :hover {
    background-color: rgba(128, 128, 128, 0.1);
  }
`;
export default Header;
