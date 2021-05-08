import React, { Fragment } from 'react';
import styled, { css } from 'styled-components';

import i3 from '../../images/imageSlider2.png';
import i4 from '../../images/imageSlider1.png';
import i1 from '../../images/imageSlider3.png';
import i2 from '../../images/imageSlider4.png';

import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import './imageSlider.css';

const ImageSlider = () => {
  return (
    <Fragment>
      <Carousel plugins={['arrows']}>
        <CarousalContainer>
          <ImageContainer src={i1} alt='' />
          <ImageContent>
            <h2>Get a link you can share</h2>
            <p>
              Click <strong>New meeting</strong> to get a link you acan send to{' '}
              <br /> people you want to meet with
            </p>
            <div>
              <span style={{ color: '#00675b' }}>.</span>
              <span style={{ color: 'grey' }}>.</span>
              <span style={{ color: 'grey' }}>.</span>
              <span style={{ color: 'grey' }}>.</span>
            </div>
          </ImageContent>
        </CarousalContainer>

        <div>
          <ImageContainer src={i2} alt='' />
          <ImageContent>
            <h2>See everyone together</h2>
            <p>
              To see more than one people at the same time, go to Change
              <br /> layout in More options in menu
            </p>

            <div>
              <span style={{ color: 'grey' }}>.</span>
              <span style={{ color: '#00675b' }}>.</span>
              <span style={{ color: 'grey' }}>.</span>
              <span style={{ color: 'grey' }}>.</span>
            </div>
          </ImageContent>
        </div>

        <div>
          <ImageContainer src={i3} alt='' />
          <ImageContent>
            <h2>Plan ahead</h2>
            <p>
              Click <strong>New meeting</strong> to schedule new meetings in
              Google <br /> Calander and send invites to participants
            </p>

            <div>
              <span style={{ color: 'grey' }}>.</span>
              <span style={{ color: 'grey' }}>.</span>
              <span style={{ color: '#00675b' }}>.</span>
              <span style={{ color: 'grey' }}>.</span>
            </div>
          </ImageContent>
        </div>

        <div>
          <ImageContainer src={i4} alt='' />
          <ImageContent>
            <h2>Your meeting is safe</h2>
            <p>
              No one can join a meeting unless invited or <br /> admitted by the
              host
            </p>

            <div>
              <span style={{ color: 'grey' }}>.</span>
              <span style={{ color: 'grey' }}>.</span>
              <span style={{ color: 'grey' }}>.</span>
              <span style={{ color: '#00675b' }}>.</span>
            </div>
          </ImageContent>
        </div>
      </Carousel>
    </Fragment>
  );
};

const ImageContainer = styled.img`
  height: 330px;
  width: 330px;
`;

const ImageContent = styled.div`
  text-align: center;

  > h2 {
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0;
    line-height: 2rem;
    margin-top: 12px;
  }

  > p {
    letter-spacing: 0.01428571em;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
  }

  > div > span {
    font-size: 3rem;
    margin: 0;
    padding: 0;
    line-height: 0;
  }
`;

const CarousalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export default ImageSlider;
