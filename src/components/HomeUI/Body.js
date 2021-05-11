import { Button } from '@material-ui/core';
import ImageSlider from './ImageSlider';
import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCallInput, setMeetingType } from '../../redux/actions/videoActions';
import firebase from 'firebase';

const Body = () => {
  const inputText = useRef('');

  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  const { callInput, meetingType } = video;

  async function createRoom() {
    const db = firebase.firestore();
    const roomRef = await db.collection('rooms').doc();
    dispatch(setCallInput(roomRef?.id));
  }

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
          <LeftButtons>
            <Button
              onClick={() => {
                createRoom();
                dispatch(setMeetingType('create'));
              }}
            >
              <span
                className='material-icons-outlined'
                style={{ marginRight: '10px' }}
              >
                video_call
              </span>
              New Meeting
            </Button>
            <CreateMeetLink
              meetingType={meetingType}
              to={callInput === '' ? '/' : `/${callInput}`}
            >
              Create
            </CreateMeetLink>
          </LeftButtons>

          <RightButtons>
            <div>
              <div className='material-icons'>keyboard</div>
              <input
                type='text'
                placeholder='Enter a code or a link'
                ref={inputText}
                value={callInput}
                onChange={(e) => {
                  dispatch(setCallInput(e.target.value));
                }}
                onClick={(e) => {
                  dispatch(setMeetingType('join'));
                }}
              />
            </div>
            <JoinMeetLink
              meetingType={meetingType}
              to={callInput === '' ? '/' : `/${callInput}`}
            >
              Join
            </JoinMeetLink>
          </RightButtons>
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  flex: 1;
  align-items: center;
`;

// BODY LEFT

const BodyLeft = styled.div`
  display: inline-flex;
  flex-basis: 35rem;
  flex-direction: column;
  flex-shrink: 1;
  max-width: 45rem;
  padding: 1em 3em;
  justify-self: center;
  /* border: 1px solid black; */

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
    max-width: 40rem;
    border-top: 1px solid grey;
    margin: 30px 0;
  }
`;

const BodyButtons = styled.div`
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
`;
const LeftButtons = styled.div`
  border-right: 1px solid rgba(128, 128, 128, 0.3);
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
    padding: 10px;
    width: fit-content;
    :hover {
      background-color: #00675b;
    }
  }
`;

const CreateMeetLink = styled(Link)`
  text-decoration: none;
  cursor: default;
  color: rgba(128, 128, 128, 0.3);
  padding: 10px 20px;
  border-radius: 5px;
  display: none;
  transition: all 200ms ease-in-out;
  ${(props) =>
    props.meetingType === 'create' &&
    css`
      display: block;
      color: #00796b;
      :hover {
        cursor: pointer;
        background-color: rgba(128, 128, 128, 0.3);
      }
    `}
`;

const RightButtons = styled.div`
  margin-left: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-evenly;
  > div {
    border: 1px grey solid;
    color: grey;
    height: 48px;
    border-radius: 4px;

    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 10px;
    margin-right: 20px;
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
        background-color: rgba(126, 126, 126, 0.1);
      }
    }
  }
`;

const JoinMeetLink = styled(Link)`
  text-decoration: none;
  cursor: default;
  color: rgba(128, 128, 128, 0.3);
  padding: 10px 20px;
  border-radius: 5px;
  display: none;
  transition: all 200ms ease-in-out;
  ${(props) =>
    props.meetingType === 'join' &&
    css`
      display: block;
      color: #00796b;
      :hover {
        cursor: pointer;
        background-color: rgba(128, 128, 128, 0.3);
      }
    `}
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
  justify-self: center;
`;

export default Body;
