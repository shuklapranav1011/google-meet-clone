import {
  TOGGLE_WEBCAM,
  SET_CALL_INPUT,
  SET_HANGUP_BUTTON,
  SET_MEETING_TYPE,
  SET_MEETING_LEFT,
  TOGGLE_MIC,
} from '../types';

export const toggleWebcam = () => {
  return {
    type: TOGGLE_WEBCAM,
  };
};

export const toggleMic = () => {
  return {
    type: TOGGLE_MIC,
  };
};

export const setCallInput = (value) => {
  return {
    type: SET_CALL_INPUT,
    payload: value,
  };
};

export const setHangupButton = (value) => {
  return {
    type: SET_HANGUP_BUTTON,
    payload: value,
  };
};

export const setMeetingType = (value) => {
  return {
    type: SET_MEETING_TYPE,
    payload: value,
  };
};

export const setMeetingLeft = (value) => {
  return {
    type: SET_MEETING_LEFT,
    payload: value,
  };
};
/////////////////////////////////////////////////////////
