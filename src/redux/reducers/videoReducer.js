import {
  SET_LOCAL_STREAM,
  SET_REMOTE_STREAM,
  ADD_TRACK_PC,
  ADD_TRACK_REMOTE_STREAM,
  SET_WEBCAM_VIDEO,
  SET_REMOTE_VIDEO,
  SET_CALL_BUTTON,
  TOGGLE_WEBCAM,
  SET_ANSWER_BUTTON,
  SET_CALL_INPUT,
  SET_HANGUP_BUTTON,
  SET_PC,
  SET_MEETING_TYPE,
  SET_MEETING_LEFT,
} from '../types';

const initialState = {
  pc: new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  }),
  localStream: null,
  remoteStream: null,
  webcamVideo: null,
  remoteVideo: null,
  webcamButton: false,
  callButton: false,
  callInput: '',
  answerButton: false,
  hangupButton: false,
  meetingType: 'create',
  meetingLeft: 'false',
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.payload,
      };
    case SET_REMOTE_STREAM:
      return {
        ...state,
        remoteStream: action.payload,
      };
    case ADD_TRACK_PC:
      return {
        ...state,
        pc: state.pc.addTrack(action.payload.track, action.payload.stream),
      };
    case ADD_TRACK_REMOTE_STREAM:
      return {
        ...state,
        remoteStream: state.remoteStream.addTrack(action.payload.track),
      };
    case SET_WEBCAM_VIDEO:
      return {
        ...state,
        webcamVideo: state.localStream,
      };
    case SET_REMOTE_VIDEO:
      return {
        ...state,
        remoteVideo: state.remoteStream,
      };
    case SET_CALL_BUTTON:
      return {
        ...state,
        callButton: action.payload,
      };
    case SET_ANSWER_BUTTON:
      return {
        ...state,
        answerButton: action.payload,
      };
    case TOGGLE_WEBCAM:
      return {
        ...state,
        webcamButton: !state.webcamButton,
      };
    case SET_CALL_INPUT:
      return {
        ...state,
        callInput: action.payload,
      };
    case SET_HANGUP_BUTTON:
      return {
        ...state,
        hangupButton: action.payload,
      };

    //   pc

    case SET_PC:
      return {
        ...state,
        pc: action.payload,
      };

    case SET_MEETING_TYPE:
      return {
        ...state,
        meetingType: action.payload,
      };
    case SET_MEETING_LEFT:
      return {
        ...state,
        meetingLeft: action.payload,
      };
    default:
      return state;
  }
};

export default videoReducer;
