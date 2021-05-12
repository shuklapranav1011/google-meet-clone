import React from 'react';
import AboutLinks from '../AboutPage UI/AboutLinks';
import styled from 'styled-components';

const About = () => {
  return (
    <AboutContainer>
      <AboutInfo>
        <Info>
          <h1
            style={{
              textAlign: 'center',
              fontSize: '2.75rem',
              fontWeight: '400',
            }}
          >
            About
          </h1>
          <p
            style={{
              textAlign: 'center',
              fontSize: '1.125rem',
              fontWeight: '400',
              lineHeight: '1.5rem',
              color: '#5f6368',
            }}
          >
            Hey, thanks for visiting my Google Meet Clone. This is a one to one
            video chat and messaging app based on Google Meet UI. <br />{' '}
            Messaging supports group chat but there is no option of group video
            chat...yet. I will be adding feature of group video chat in future.
          </p>
          <h2
            style={{
              // textAlign: 'center',
              fontSize: '1.75rem',
              fontWeight: '500',
              marginTop: '20px',
              color: '#00796b',
            }}
          >
            {`Technologies used :`}
          </h2>
          <ul
            style={{
              // textAlign: 'center',
              fontSize: '1.125rem',
              fontWeight: '400',
              lineHeight: '1.5rem',
              color: '#5f6368',
            }}
          >
            <li>ReactJs, React-hooks, React Router Dom</li>
            <li>Redux, Redux-Thunk, Redux-dev-tools</li>
            <li>React Styled-Components</li>
            <li>Firebase/Firestore, React-firebase-hooks</li>
          </ul>
          <Me>
            <p>
              <h4 style={{ color: '#5f6368' }}> Designed and developed by </h4>
              <h1 style={{ color: 'var(--font-color-3)' }}>Pranav Shukla.</h1>
            </p>
            <div></div>
            <p>
              {/* <a
                target='_blank'
                rel='noreferrer'
                href='https://pranav-shukla.netlify.app/'
              >
                Click to checkout my other projects.
              </a>{' '}
              <br /> */}
              <br />
              <span style={{ color: 'var(--font-color-3)' }}>
                {' '}
                <i>I'm open to front-end dev opportunities.</i>
              </span>
              <br />
              <br />
              <span style={{ color: 'var(--font-color-3)' }}>
                {' '}
                Thankyou for visiting!! Toodles...
              </span>
              <br />
            </p>
          </Me>
        </Info>
        <AboutLinks></AboutLinks>
      </AboutInfo>
    </AboutContainer>
  );
};

const AboutContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const AboutInfo = styled.div`
  overflow: auto;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Info = styled.div`
  overflow: auto;
  margin-bottom: 3rem;
  > h1 {
    margin-bottom: 1rem;
  }

  > p {
    margin-bottom: 3rem;
  }

  > h2 {
    margin-bottom: 1rem;
  }

  > ul {
    margin-bottom: 2rem;
    > li {
      margin-bottom: 1rem;
    }
  }
`;

const Me = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default About;
