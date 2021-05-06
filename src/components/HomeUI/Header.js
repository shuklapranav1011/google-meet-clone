import React from 'react';
import styled from 'styled-components';
import HeaderIconPhoto from '../../images/google_meet_header.jpg';
import firebase from 'firebase';

const Header = () => {
  const currTime = firebase.firestore.FieldValue.serverTimestamp();

  return (
    <HeaderContainer>
      <HeaderIcon src={HeaderIconPhoto}></HeaderIcon>
      <HeaderContent>
        <span class='material-icons-outlined'>help_outline</span>
        <span class='material-icons-outlined'>announcement</span>
        <span class='material-icons-outlined'>settings</span>
        <span class='material-icons-outlined'>apps</span>
        {/* <RoundImg src={user?.photoURL} alt='<user_photo>' /> */}
      </HeaderContent>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div``;
const HeaderIcon = styled.img``;
const HeaderContent = styled.div``;
const RoundImg = styled.img`
  height: 40px;
  width: auto;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export default Header;
