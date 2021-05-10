import React, { Fragment, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../CallPageUI/Header';
import Footer from '../CallPageUI/Footer';
import MeetingInfo from '../CallPageUI/MeetingInfo';
import Chat from '../CallPageUI/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLocalStream,
  setRemoteStream,
  initializePC,
  addTrackPC,
  addTrackRemoteStream,
  setCallButton,
  setAnswerButton,
  toggleWebcam,
  setWebcamVideo,
  setRemoteVideo,
} from '../../redux/actions/videoActions';

// import MyClock from '../layout/Clock.js';
import firebase from 'firebase';

const CallPage = () => {
  const [user] = useAuthState(auth);
  return (
    <Fragment>
      <CallPageContainer>
        {/* Video Camera Input */}
        {/* <VideoContainer src='' controls></VideoContainer> */}

        <VideoContainer controls></VideoContainer>

        {/* Video Camera */}
        <Header user={user}></Header>
        <Footer user={user}></Footer>
        <MeetingInfo user={user}></MeetingInfo>
        <Chat user={user}></Chat>
      </CallPageContainer>
    </Fragment>
  );
};

const CallPageContainer = styled.div`
  height: 100vh;
`;

const VideoContainer = styled.video`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  z-index: -1;
`;

export default CallPage;
