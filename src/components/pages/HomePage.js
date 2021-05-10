import React, { useEffect } from 'react';
import Body from '../HomeUI/Body';

import Header from '../HomeUI/Header';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import {
  setLocalStream,
  setRemoteStream,
  addTrackPC,
  addTrackRemoteStream,
  setCallButton,
  setAnswerButton,
  toggleWebcam,
  setWebcamVideo,
  setCallInput,
  setHangupButton,
  initializePC,
} from '../../redux/actions/videoActions';

const HomePage = () => {
  const video = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const {
    pc,
    localStream,
    remoteStream,
    webcamButton,
    webcamVideo,
    callButton,
    callInput,
    answerButton,
    remoteVideo,
    hangupButton,
  } = video;

  useEffect(() => {
    dispatch(initializePC());
  }, []);

  console.log(pc);

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
