import React from 'react';
import Body from '../HomeUI/Body';

import Header from '../HomeUI/Header';
import styled from 'styled-components';

const HomePage = () => {
  return (
    <HomeContainer>
      <Header></Header>
      <Body></Body>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* border: 4px solid yellow; */
`;

export default HomePage;
