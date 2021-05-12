import React, { Fragment } from 'react';
import styled from 'styled-components';

const AboutLinksDiv = styled.div`
  margin: 30px;
  display: flex;
  justify-content: center;
  a {
    font-size: var(--l-length-s);
    color: var(--main-color-purple);
    margin: 40px;
    font-size: 2rem;
    transition-property: color, transform, animation;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;

    &:hover {
      transform: scale(1.5, 1.5);
      color: var(--main-color-pink);
      animation: animate1 1.5s infinite alternate;
    }
  }
`;

const AboutLinks = () => {
  return (
    <Fragment>
      <AboutLinksDiv>
        <AboutLinksDiv
          style={{
            borderTop: '1px solid var(--main-color-pink)',
            padding: '0 20px',
          }}
        >
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/pranavshukla1011'
          >
            <i class='fab fa-github'></i>
          </a>

          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.linkedin.com/in/shuklapranav1011/'
          >
            <i class='fab fa-linkedin-in'></i>
          </a>

          <a
            target='_blank'
            rel='noreferrer'
            href='https://mail.google.com/mail/u/1/?view=cm&fs=1&to=pranav.1011.shukla@gmail.com&tf=1'
          >
            <i class='fab fa-google'></i>
          </a>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://pranav-shukla.netlify.app/'
          >
            <i class='fas fa-at'></i>
          </a>
        </AboutLinksDiv>
      </AboutLinksDiv>
    </Fragment>
  );
};

export default AboutLinks;
