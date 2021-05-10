import { Button } from '@material-ui/core';
import ImageSlider from './ImageSlider';
import React, { useRef } from 'react';
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

import firebase from 'firebase';
import { Link } from 'react-router-dom';

const Body = () => {
  return (
    <BodyContainer>
      <BodyLeft>
        <h1>
          Premium video meetings. <br /> Now free for everyone.
        </h1>
        <h3>
          We re-engineered the services we built for secure business <br />
          meetings, Google Meet, to make it free and available for all.
        </h3>

        <BodyButtons>
          <Button>
            <span
              className='material-icons-outlined'
              style={{ marginRight: '10px' }}
            >
              video_call
            </span>
            New Meeting
          </Button>

          <div>
            <div className='material-icons'>keyboard</div>
            <input type='text' placeholder='Enter a code or a link' />
          </div>
        </BodyButtons>

        <div className='line'></div>

        <LearnMore>
          <a
            href='https://support.google.com/meet/?hl=en#topic=7306097'
            target='_blank'
            rel='noreferrer'
          >
            <span>Learn More</span> about Google Meet
          </a>
        </LearnMore>
      </BodyLeft>
      <BodyRight>
        <ImageSlider></ImageSlider>
      </BodyRight>
    </BodyContainer>
  );
};

const BodyContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

// BODY LEFT

const BodyLeft = styled.div`
  display: inline-flex;
  flex-basis: 35rem;
  flex-direction: column;
  flex-shrink: 1;
  max-width: 35rem;
  padding: 1em 3em;

  > h1 {
    font-family: 'Google Sans Display', Roboto, Arial, sans-serif;
    font-size: 2.75rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 3.25rem;
    padding-bottom: 0.5em;
  }

  > h3 {
    font-family: 'Google Sans', Roboto, Arial, sans-serif;
    font-size: 1.125rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.5rem;
    color: #5f6368;

    max-width: 30rem;
    padding-bottom: 3em;
  }

  .line {
    max-width: 35rem;
    border-top: 1px solid grey;

    margin: 30px 0;
  }
`;

const BodyButtons = styled.div`
  display: flex;
  align-items: center;

  > button {
    background-color: #00796b;
    color: white;
    height: 48px;
    font-weight: 500;
    font-size: 1rem;
    margin-right: 2rem;
    text-transform: none;
    padding: 15px;

    :hover {
      background-color: #00675b;
    }
  }

  > div {
    border: 1px grey solid;
    color: grey;
    height: 48px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    :hover {
      border-color: black;
    }

    :focus {
      outline: #00675b;
    }

    > span {
      color: grey;
    }

    > input {
      border: none;
      font-size: 1rem;
      text-align: center;
      width: 80%;
      :focus {
        outline: none;
      }
    }
  }
`;

const LearnMore = styled.div`
  > a {
    color: grey;
    text-decoration: none;
    > span {
      color: #00796b;

      :hover {
        text-decoration: underline;
      }
    }
  }
`;

// BODY RIGHT

const BodyRight = styled.div`
  min-width: 500px;
  max-width: 500px;
`;

export default Body;
