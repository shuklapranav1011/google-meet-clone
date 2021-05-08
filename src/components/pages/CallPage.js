import React, { Fragment } from 'react';
import styled from 'styled-components';
import Header from '../CallPageUI/Header';
import Footer from '../CallPageUI/Footer';
import MeetingInfo from '../CallPageUI/MeetingInfo';
import Chat from '../CallPageUI/Chat';

// import MyClock from '../layout/Clock.js';
const CallPage = () => {
  return (
    <Fragment>
      <CallPageContainer>
        <VideoContainer src='' controls></VideoContainer>
        <Header></Header>
        <Footer></Footer>
        <MeetingInfo></MeetingInfo>
        <Chat></Chat>
      </CallPageContainer>
    </Fragment>
  );
};

const CallPageContainer = styled.div``;

const VideoContainer = styled.video`
  position: absolute;
  height: 100%;
  width: 100%;
`;
export default CallPage;
