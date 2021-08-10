import React from 'react';
import Image from 'react-bootstrap/Image';
import connected from 'assets/img/connected.png';
import { WelcomeDiv } from 'components/Welcome/style';

const Splash = () => {
  return (
    <WelcomeDiv>
      <h2>UBook</h2>
      <h4>Bringing you closer to your Loved ones, Friends & Colleagues</h4>
      <Image src={connected} fluid></Image>
    </WelcomeDiv>
  );
};

export default Splash;
