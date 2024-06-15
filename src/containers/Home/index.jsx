import React from 'react';

import HomeLogo from '../../assets/home-logo.svg';

import { Container, HomeImg } from './styles';
import { CategoryCarousel } from '../../components/CategoryCarousel';

export function Home() {
  return (
    <Container>
      <HomeImg src={HomeLogo} alt="logo da home" />
      <CategoryCarousel />
    </Container>
  );
}
