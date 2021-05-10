import {
  TOGGLE_WEBCAM,
  TOGGLE_MIC,
  SET_CALL_INPUT,
  SET_HANGUP_BUTTON,
  SET_MEETING_TYPE,
  SET_MEETING_LEFT,
} from '../types';

const initialState = {
  callInput: '',
  hangupButton: false,
  meetingType: 'create',
  meetingLeft: 'false',
  videocam: true,
  phone: true,
  mic: true,
};

const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_WEBCAM:
      return {
        ...state,
        videocam: !state.videocam,
      };
    case TOGGLE_MIC:
      return {
        ...state,
        mic: !state.mic,
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
