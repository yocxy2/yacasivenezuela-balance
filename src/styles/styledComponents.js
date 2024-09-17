// src/styles/styledComponents.js

import styled from 'styled-components';
import BackgroundImage from '../images/background.png';

export const Container = styled.div`
  text-align: center;
  padding: 1rem;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (min-width: 600px) {
    font-size: 1.5rem;
  }
`;


export const TotalBalance = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  margin: 0 0 1rem;

  border: 0.5px solid rgba(71, 63, 79, 0.16);
  padding: 0.5rem;
  
  @media (min-width: 600px) {
    font-size: 2rem;
  }
`;

export const BalanceList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;
