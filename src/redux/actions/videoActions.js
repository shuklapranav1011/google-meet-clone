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

export const initializePC = (val) => {
  return {
    type: SET_PC,
    payload: val,
  };
};

export const setLocalStream = (media) => {
  return {
    type: SET_LOCAL_STREAM,
    payload: media,
  };
};

export const setRemoteStream = () => {
  return {
    type: SET_REMOTE_STREAM,
    payload: new MediaStream(),
  };
};

export const addTrackPC = (track, stream) => {
  return {
    type: ADD_TRACK_PC,
    payload: {
      track: track,
      stream: stream,
    },
  };
};

export const addTrackRemoteStream = (track) => {
  return {
    type: ADD_TRACK_REMOTE_STREAM,
    payload: { track: track },
  };
};

export const setWebcamVideo = () => {
  return {
    type: SET_WEBCAM_VIDEO,
  };
};

export const setRemoteVideo = () => {
  return {
    type: SET_REMOTE_VIDEO,
  };
};

export const setCallButton = (value) => {
  return {
    type: SET_CALL_BUTTON,
    payload: value,
  };
};

export const setAnswerButton = (value) => {
  return {
    type: SET_ANSWER_BUTTON,
    payload: value,
  };
};

export const toggleWebcam = () => {
  return {
    type: TOGGLE_WEBCAM,
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
