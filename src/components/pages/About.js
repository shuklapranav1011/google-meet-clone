import React from 'react';
import AboutLinks from '../AboutPage UI/AboutLinks';
import styled from 'styled-components';

const AboutContainer = styled.div`
  flex: 0.8;
  min-width: 400px;
  overflow-y: auto;
`;

const AboutInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  p {
    margin: 20px;
    font-size: var(--m-length-m);
  }
  ul {
    margin: 20px;
  }
  li {
    margin: 10px;
  }
  h4 {
    margin-top: 20px;
  }
  a {
    color: var(--main-color-purple);
  }
`;

const AboutInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr auto 1fr;
  align-items: center;
  justify-content: center;
`;

const About = () => {
  return (
    <AboutContainer>
      <AboutInnerContainer>
        <div>
          <h1 style={{ textAlign: 'center' }}>About</h1>
          <p>
            Hey, thanks for visiting my Google Meet Clone. This is a one to one
            video chat and messaging app based on Google Meet UI. THe messagint
            feature supports group chat although their is no option of group
            video chat...yet. I will be adding feature of group video chat in
            future.
          </p>
          <p>
            <h2>Dependencies used:</h2>
            <ul>
              <li>ReactJs, React-hooks, React Router Dom</li>
              <li>Redux, Redux-Thunk, Redux-dev-tools</li>
              <li>React Styled-Components</li>
              <li>Firebase/Firestore, React-firebase-hooks</li>
            </ul>
          </p>
          <AboutInfo>
            <p>
              <h4> Designed and developed by </h4>
              <h1 style={{ color: 'var(--font-color-3)' }}>Pranav Shukla.</h1>
            </p>
            <div></div>
            <p style={{ float: 'right' }}>
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
          </AboutInfo>

          <AboutLinks></AboutLinks>
        </div>
      </AboutInnerContainer>
    </AboutContainer>
  );
};

export default About;
