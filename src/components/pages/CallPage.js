import React, { Fragment, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import Header from '../CallPageUI/Header';
import MeetingInfo from '../CallPageUI/MeetingInfo';
import Chat from '../CallPageUI/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';

// import MyClock from '../layout/Clock.js';
import firebase from 'firebase';
import {
  setMeetingType,
  setMeetingLeft,
  toggleWebcam,
  toggleMic,
} from '../../redux/actions/videoActions';
import { Button } from '@material-ui/core';

const CallPage = () => {
  // ------------------ webRTC Setup below--------------------------

  const [user] = useAuthState(auth);

  const video = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const { callInput, meetingType, meetingLeft, mic, videocam } = video;

  const localVideoRef = useRef({});
  const remoteVideoRef = useRef({});

  const configuration = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  };

  let peerConnection = null;
  let localStream = null;
  let remoteStream = null;
  let roomId = null;

  async function createRoom(roomId) {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(`${roomId}`);

    console.log('Create PeerConnection with configuration: ', configuration);
    peerConnection = new RTCPeerConnection(configuration);

    registerPeerConnectionListeners();

    console.log('LOCAL STREAM IN CREATE ROOM');
    console.log(localStream);

    console.log('REMOTE STREAM IN CREATE ROOM');
    console.log(remoteStream);

    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });

    // Code for collecting ICE candidates below
    const callerCandidatesCollection = roomRef.collection('callerCandidates');

    peerConnection.addEventListener('icecandidate', (event) => {
      if (!event.candidate) {
        console.log('Got final candidate!');
        return;
      }
      console.log('Got candidate: ', event.candidate);
      callerCandidatesCollection.add(event.candidate.toJSON());
    });
    // Code for collecting ICE candidates above

    // Code for creating a room below
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    console.log('Created offer:', offer);

    const roomWithOffer = {
      offer: {
        type: offer.type,
        sdp: offer.sdp,
      },
    };
    await roomRef.set(roomWithOffer);
    roomId = roomRef.id;
    console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`);

    peerConnection.addEventListener('track', (event) => {
      console.log('Got remote track:', event.streams[0]);
      event.streams[0].getTracks().forEach((track) => {
        console.log('Add a track to the remoteStream:', track);
        remoteStream.addTrack(track);
      });
    });

    // Listening for remote session description below
    roomRef.onSnapshot(async (snapshot) => {
      const data = snapshot.data();
      if (!peerConnection.currentRemoteDescription && data && data.answer) {
        console.log('Got remote description: ', data.answer);
        const rtcSessionDescription = new RTCSessionDescription(data.answer);
        await peerConnection.setRemoteDescription(rtcSessionDescription);
      }
    });
    // Listening for remote session description above

    // Listen for remote ICE candidates below
    roomRef.collection('calleeCandidates').onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === 'added') {
          let data = change.doc.data();
          console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
          await peerConnection.addIceCandidate(new RTCIceCandidate(data));
        }
      });
    });
    // Listen for remote ICE candidates above
  }

  async function joinRoomById(roomId) {
    const db = firebase.firestore();
    const roomRef = db.collection('rooms').doc(`${roomId}`);
    const roomSnapshot = await roomRef.get();
    console.log('Got room:', roomSnapshot.exists);

    if (roomSnapshot.exists) {
      console.log('Create PeerConnection with configuration: ', configuration);
      peerConnection = new RTCPeerConnection(configuration);
      registerPeerConnectionListeners();
      localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
      });

      // Code for collecting ICE candidates below
      const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
      peerConnection.addEventListener('icecandidate', (event) => {
        if (!event.candidate) {
          console.log('Got final candidate!');
          return;
        }
        console.log('Got candidate: ', event.candidate);
        calleeCandidatesCollection.add(event.candidate.toJSON());
      });
      // Code for collecting ICE candidates above

      peerConnection.addEventListener('track', (event) => {
        console.log('Got remote track:', event.streams[0]);
        event.streams[0].getTracks().forEach((track) => {
          console.log('Add a track to the remoteStream:', track);
          remoteStream.addTrack(track);
        });
      });

      // Code for creating SDP answer below
      const offer = roomSnapshot.data().offer;
      console.log('Got offer:', offer);
      await peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.createAnswer();
      console.log('Created answer:', answer);
      await peerConnection.setLocalDescription(answer);

      const roomWithAnswer = {
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
      };
      await roomRef.update(roomWithAnswer);
      // Code for creating SDP answer above

      // Listening for remote ICE candidates below
      roomRef.collection('callerCandidates').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach(async (change) => {
          if (change.type === 'added') {
            let data = change.doc.data();
            console.log(
              `Got new remote ICE candidate: ${JSON.stringify(data)}`
            );
            await peerConnection.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      // Listening for remote ICE candidates above
    }
  }

  async function openUserMedia(e) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    console.log('stream');
    console.log(stream);
    localVideoRef.current.srcObject = stream;
    localStream = stream;
    remoteStream = new MediaStream();
    remoteVideoRef.current.srcObject = remoteStream;

    remoteVideoRef.current.onloadedmetadata = function (e) {
      remoteVideoRef.current.play();
    };
  }

  async function hangUp(e) {
    const tracks = localVideoRef.current.srcObject.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
    }

    if (peerConnection) {
      peerConnection.close();
    }

    // Delete room on hangup
    if (roomId) {
      const db = firebase.firestore();
      const roomRef = db.collection('rooms').doc(roomId);
      const calleeCandidates = await roomRef
        .collection('calleeCandidates')
        .get();
      calleeCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      const callerCandidates = await roomRef
        .collection('callerCandidates')
        .get();
      callerCandidates.forEach(async (candidate) => {
        await candidate.ref.delete();
      });
      await roomRef.delete();
    }

    dispatch(setMeetingLeft(true));
    console.log('call cut');
  }

  function registerPeerConnectionListeners() {
    peerConnection.addEventListener('icegatheringstatechange', () => {
      console.log(
        `ICE gathering state changed: ${peerConnection.iceGatheringState}`
      );
    });

    peerConnection.addEventListener('connectionstatechange', () => {
      console.log(`Connection state change: ${peerConnection.connectionState}`);
    });

    peerConnection.addEventListener('signalingstatechange', () => {
      console.log(`Signaling state change: ${peerConnection.signalingState}`);
    });

    peerConnection.addEventListener('iceconnectionstatechange ', () => {
      console.log(
        `ICE connection state change: ${peerConnection.iceConnectionState}`
      );
    });
  }
  //---------------------webRTC Setup above -------------------------------------

  // ---------------------- toggle audio and video streams below-------------------
  const toggleAudioStream = () => {
    localStream.getAudioTracks()[0].enabled =
      !localStream.getAudioTracks()[0].enabled;
  };

  const toggleVideoStream = () => {
    localStream.getVideoTracks()[0].enabled =
      !localStream.getVideoTracks()[0].enabled;
  };
  // ---------------------toggle audio and video streams above --------------------

  // -------------------- Footer below-----------------------------------------------

  const Footer = () => {
    return (
      <FooterContainer>
        <UserInfo>
          <span
            class='material-icons'
            style={{
              backgroundColor: '#d93025',
              color: 'white',
              borderRadius: '50%',
              fontSize: '1rem',
              padding: '3px',
              marginRight: '5px',
            }}
          >
            {mic ? 'mic' : `mic_off`}
          </span>
          <p style={{ color: 'white', fontSize: '1rem' }}>You</p>
        </UserInfo>
        <FooterLeft>
          <div>
            <h3>Meeting Details</h3>
            <span class='material-icons-outlined'>expand_less</span>
          </div>
        </FooterLeft>

        <FooterMiddle>
          <div>
            {/* mic button */}
            <CallOptionContainer
              onClick={(e) => {
                dispatch(toggleMic());
                // console.log()
                // toggleAudioStream();
              }}
            >
              <span class='material-icons'>{mic ? 'mic' : `mic_off`}</span>
            </CallOptionContainer>

            {/* hangup button */}
            <CallOptionContainer
              onClick={(e) => {
                hangUp();
                dispatch(setMeetingLeft(true));
                dispatch(setMeetingType('meeting_left'));
              }}
            >
              <span class='material-icons'>phone</span>
            </CallOptionContainer>

            {/* videocam button */}
            <CallOptionContainer
              onClick={(e) => {
                dispatch(toggleWebcam());
                // toggleVideoStream();
              }}
            >
              <span class='material-icons'>
                {videocam ? 'videocam' : `videocam_off`}
              </span>
            </CallOptionContainer>
          </div>
        </FooterMiddle>
        <FooterRight>
          <ControlOptionContainer>
            <div>
              <span class='material-icons-outlined'>closed_caption</span>
              <p>Turn on Caption</p>
            </div>
          </ControlOptionContainer>
          <ControlOptionContainer>
            <div>
              <span class='material-icons-outlined'>present_to_all</span>
              <p>Present Now</p>
            </div>
          </ControlOptionContainer>
          <ControlOptionContainer>
            <div>
              <span class='material-icons-outlined'>more_vert</span>
            </div>
          </ControlOptionContainer>
        </FooterRight>
      </FooterContainer>
    );
  };

  // ---------------- Footer above ------------------------------------------

  useEffect(async () => {
    await openUserMedia();
    if (meetingType === 'create') {
      await createRoom(callInput);
    }
    if (meetingType === 'join') {
      await joinRoomById(callInput);
    }
    console.log('LOCAL STREAM IN USEEFFECT');
    console.log(localStream);
  }, []);

  console.log('LOCAL STREAM OUTSIDE USEEFFECT');
  console.log(localStream);

  if (meetingLeft === true) {
    return (
      <Fragment>
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
            position: 'fixed',
            right: '20px',
            top: '20px',
            textTransform: 'none',
          }}
        >
          <p style={{ color: '#63676c', fontSize: 'normal', padding: '0 5px' }}>
            Logout{' '}
          </p>
          <span
            className='material-icons-outlined'
            style={{ color: '#63676c', fontSize: '2rem' }}
          >
            logout
          </span>
        </Button>
        <MeetingLeftContainer>
          <div>
            <h1>You left the meeting.</h1>
            <ReturnHomeTag href='/'>
              <span> Return to home screen</span>
            </ReturnHomeTag>
            <Button>Submit Feedback</Button>
            <div>
              <div>
                <span class='material-icons'>local_police</span>
                <div>
                  <h2>Your meeting is safe.</h2>
                  <p>
                    No one can join a meeting unless <br /> invited or admitted
                    by the host.
                  </p>
                </div>
              </div>
              <h3>
                <Button>Learn More</Button>
              </h3>
            </div>
          </div>
        </MeetingLeftContainer>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <CallPageContainer>
          {/* Video Camera Input */}
          {/* <VideoContainer src='' controls></VideoContainer> */}

          {/* <h1>Local</h1> */}

          <VideoContainer controls ref={localVideoRef} local></VideoContainer>

          {/* <h1>Remote</h1> */}

          <VideoContainer controls ref={remoteVideoRef} remote></VideoContainer>

          {/* Video Camera */}
          <Header user={user}></Header>
          <Footer user={user}></Footer>
          <MeetingInfo user={user}></MeetingInfo>
          <Chat roomID={callInput} user={user}></Chat>
        </CallPageContainer>
      </Fragment>
    );
  }
};

// ---------------------- styled components below -------------------------

const CallPageContainer = styled.div`
  height: 100vh;
`;

const VideoContainer = styled.video`
  transform: rotateY(180deg);
  position: absolute;
  height: calc(100vh - 30px);
  width: calc(100% - 350px);
  object-fit: cover;
  z-index: -1;

  ${(props) =>
    props.local &&
    css`
      display: none;
    `}
`;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0px;
  left: 0px;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  height: 90px;
`;

const UserInfo = styled.div`
  position: fixed;
  bottom: 110px;
  left: 10px;
  display: flex;
  align-items: center;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  > div {
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    transition: background-color 200ms ease-in-out;

    :hover {
      background-color: rgba(128, 128, 128, 0.1);
      cursor: pointer;
    }

    > h3 {
      font-size: 1.2rem;
      font-weight: 400;
      line-height: 1.5rem;
      color: #202124;
      max-width: 400px;
    }

    > span {
      font-size: 1.7rem;
      font-weight: 400;
      line-height: 1.5rem;
      color: #202124;
      max-width: 400px;
      margin-left: 10px;
    }
  }
`;

const FooterMiddle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  > div {
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    > div:nth-child(odd) {
      background-color: #d93025;
      color: white;
    }

    > div:nth-child(even) {
      background-color: white;
      color: #d93025;
    }
  }
`;

const CallOptionContainer = styled.div`
  border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 50%;
  padding: 15px;
  margin: 0 10px;
  transition: background-color 200ms ease-in-out;
  :hover {
    background-color: rgba(128, 128, 128, 0.1);
    cursor: pointer;
    box-shadow: 0px 0px 1px black;
  }

  > span {
    font-size: 1.5rem;
  }
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  > div {
    height: 100%;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;

    :hover {
      background-color: rgba(128, 128, 128, 0.1);
      cursor: pointer;
    }
  }
`;

const ControlOptionContainer = styled.div`
  color: #3c4043;
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  margin: 5px;
  overflow: hidden;
  text-align: center;
  text-transform: none;
`;

const MeetingLeftContainer = styled.div`
  height: 50vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    > h1 {
      font-size: 36px;
      font-weight: 400;
      line-height: 44px;
      color: #3c4043;
      cursor: default;
      max-width: 700px;
      margin-bottom: 30px;
    }

    > button {
      font-size: small;
      color: #00796b;
      text-transform: none;
      font-weight: 600;
      margin-bottom: 30px;
    }

    > div {
      border: 1px solid rgba(126, 126, 126, 0.4);
      padding: 10px 20px;
      > div {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        margin-right: 30px;
        > div {
          text-align: left;
          > h2 {
            font-size: 1.125rem;
            font-weight: 400;
            line-height: 1.5rem;
          }
          > p {
            font-size: 0.875rem;
            font-weight: 400;
            line-height: 1.25rem;
            color: #80868b;
          }
        }
        > span {
          font-size: 50px;
          align-self: center;
          padding: 10px;
          color: #4285f4;
        }
      }

      > h3 {
        text-align: right;
        > button {
          font-size: small;
          color: #00796b;
          text-transform: none;
          font-weight: 600;
        }
      }
    }
  }
`;

const ReturnHomeTag = styled.a`
  background-color: #00796b;
  padding: 0 10px;
  border-radius: 4px;
  text-decoration: none;
  > span {
    font-family: Roboto, sans-serif;
    color: white;
    text-decoration: none;
    cursor: pointer;
    font-size: small;
    font-weight: 800;
    line-height: 36px;
  }
`;
export default CallPage;
