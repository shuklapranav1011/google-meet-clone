import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, db } from '../../firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';

const ChatBox = ({ roomID, bottomRef }) => {
  const [text, setText] = useState('');

  const [user] = useAuthState(auth);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log(roomID);

    db.collection('rooms').doc(roomID).collection('messages').add({
      message: text,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      email: user?.email,
    });

    setText('');

    bottomRef?.current?.scrollIntoView({
      behavior: 'smooth',
    });
    console.log('message sent');
  };

  return (
    <ChatBoxContainer>
      <form>
        <input
          type='text'
          value={text}
          placeholder={`Enter Message...`}
          onChange={onChange}
        />
        <Button hidden type='submit' onClick={sendMessage}>
          <span class='material-icons'>send</span>
        </Button>
      </form>
    </ChatBoxContainer>
  );
};

const ChatBoxContainer = styled.div`
  position: fixed;
  bottom: 90px;
  width: 335px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #555;
  box-shadow: 0 1px 10px rgba(126, 126, 126, 0.3);

  > form {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 20px;
  }

  > form > input {
    border: none;
    outline: none;
    border-bottom: 2px solid #eee;
    flex: 0.9;
    padding: 5px;
    transition: border 300ms ease-in-out;

    :focus {
      border-bottom: 2px solid #00796b;
    }
  }

  > form > button {
    flex: 0.1;
    > span {
      cursor: pointer;
      color: grey;
      font-size: 1.5rem;
      :hover {
        color: #00796b;
      }
    }
  }
`;
export default ChatBox;
