import styled from 'styled-components';
import BackgroundImage from '../images/background.png';

export const Container = styled.div`
  text-align: center;
  padding: 2rem;
  background-image: url(${BackgroundImage});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  color: white;
`;

export const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

export const BalanceList = styled.ul`
  list-style: none;
  padding: 0;
  width: 40%;
  margin: 0 auto;
`;
