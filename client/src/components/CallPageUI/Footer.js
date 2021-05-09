import React, { Fragment } from 'react';
import styled from 'styled-components';

const Footer = () => {
  const CallOption = ({ disabled, title }) => {
    return (
      <Fragment>
        <CallOptionContainer>
          <span class='material-icons'>
            {disabled ? title : `${title}_off`}
          </span>
        </CallOptionContainer>
      </Fragment>
    );
  };

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
          mic_off
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
          <CallOption title='mic' disabled></CallOption>
          <CallOption title='call_end' id='hangupButton'></CallOption>
          <CallOption title='videocam' id='webcamButton' disabled></CallOption>
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

export default Footer;
