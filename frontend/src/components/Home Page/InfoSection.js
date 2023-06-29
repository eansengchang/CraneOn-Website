import React from 'react';

import img1 from '../../img/map.png';
import img2 from '../../img/calendar.png';
import img3 from '../../img/piggy-bank.png';

import {
  CardsWrapper,
  CardGrid,
  CardContainer,
  ImageWrapper,
  Image,
  TextWrapper,
  ImageCircle,
} from './CardElements';

export const InfoSection = () => {
  return (
    <div className="container">
      <h2>About us</h2>
      <p>
        We provide a rental hub for construction site equipment. Our motto is
        efficiency. Our website is a space for the equipment providers to be
        visible and accessible to the construction companies in real time and
        specific place. By being able to compare prices and distance of nearby
        equipment, transfers can be made more rapidly and delays avoided.
      </p>
      <h2>What we offer:</h2>
      <CardsWrapper>
        <CardGrid>
          <CardContainer>
            <ImageWrapper>
              <ImageCircle>
                <Image src={img1} />
              </ImageCircle>
            </ImageWrapper>

            <TextWrapper>
              <h3>Service Locator and Job Finder</h3>
              <p>We offer the ability to find the closest equipment from your location using a map of all the advertised equipments. There is no need for tedious searching online.</p>
            </TextWrapper>
          </CardContainer>
          <CardContainer>
            <ImageWrapper>
              <ImageCircle>
                <Image src={img2} />
              </ImageCircle>
            </ImageWrapper>

            <TextWrapper>
              <h3>Planning of Equipment Usage in Advance</h3>
              <p>We have a built-in timetable and calendar to keep track of all your bookings of eqiupments for you.</p>
            </TextWrapper>
          </CardContainer>
          <CardContainer>
            <ImageWrapper>
              <ImageCircle>
                <Image src={img3}  />
              </ImageCircle>
            </ImageWrapper>

            <TextWrapper>
              <h3>Saving Costs Through Efficient Equipment Timetables</h3>
              <p>Advertised equipments can be more efficiently used through booking and therefore save money</p>
            </TextWrapper>
          </CardContainer>
        </CardGrid>
      </CardsWrapper>
    </div>
  );
};
