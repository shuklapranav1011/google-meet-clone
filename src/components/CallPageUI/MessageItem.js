import React from 'react';
import styled from 'styled-components';

const MessageItem = ({ message, timeStamp, user }) => {
  return (
    <Sender>
      <p>
        {user} <small>{`${timeStamp?.toDate().toUTCString()}`}</small>
      </p>
      <Message>{message}</Message>
    </Sender>
  );
};

export default MessageItem;

const Sender = styled.div`
  font-weight: 500;
  font-size: 14px;

  > small {
    margin-left: 5px;
    font-weight: 300;
    color: #555;
  }
  margin-bottom: 15px;
`;

const Message = styled.div`
  margin: 0;
  padding-top: 5px;
  color: #555;
  font-size: 14px;
`;
