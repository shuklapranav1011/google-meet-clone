import React from 'react';
import styled, { css } from 'styled-components';

const Chat = () => {
  return (
    <ChatContainer>
      <Header>
        <h3>Meeting Details</h3>
        <span class='material-icons-outlined'>close</span>
      </Header>

      <HeaderTabs>
        <Tab>
          <span class='material-icons-outlined'>people</span>
          <p>(1)</p>
        </Tab>
        <Tab active>
          <span class='material-icons'>chat_bubble</span>
        </Tab>
      </HeaderTabs>

      <ChatSection>
        <ChatBlock>
          <Sender>
            <p>
              You <small>Time</small>
            </p>
            <Message>Actual Message</Message>
          </Sender>
        </ChatBlock>
        <ChatBox>
          <input type='text' placeholder='Send message to everyone' />
          <span class='material-icons'>send</span>
        </ChatBox>
      </ChatSection>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: white;
  height: calc(100vh - 90px);
  width: 350px;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #202124;
  padding: 20px;

  > h3 {
    font-size: 1.125rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 1.5rem;
  }

  > span {
    :hover {
      cursor: pointer;
      opacity: 0.2;
    }
  }
`;

const HeaderTabs = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  color: #555;
  padding: 10px;
  transition: border 300ms ease-out;
  :hover {
    cursor: pointer;
    background-color: rgba(126, 126, 126, 0.1);
  }

  p {
    margin-left: 10px;
  }

  ${(props) =>
    props.active &&
    css`
      border-bottom: 2px solid #00796b;
      color: #00796b;
    `}
`;

const ChatSection = styled.div`
  flex: 1;
  overflow-y: scroll;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChatBlock = styled.div`
  padding: 20px;
  margin-bottom: 30px;
  order: 1px solid black;
`;

const Sender = styled.div`
  font-weight: 500;
  font-size: 14px;

  > small {
    margin-left: 5px;
    font-weight: 300;
  }
`;

const Message = styled.div`
  margin: 0;
  padding-top: 5px;
  color: #555;
  font-size: 14px;
`;

const ChatBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #555;

  padding: 20px;
  box-shadow: 0 1px 10px rgba(126, 126, 126, 0.3);

  > input {
    border: none;
    outline: none;
    border-bottom: 2px solid #eee;
    width: 80%;
    padding: 5px;
    transition: border 300ms ease-in-out;

    :focus {
      border-bottom: 2px solid #00796b;
    }
  }

  > span {
    cursor: pointer;
    color: grey;
    font-size: 1.5rem;
    :hover {
      color: #00796b;
    }
  }
`;

export default Chat;
