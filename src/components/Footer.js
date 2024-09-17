// src/components/Footer.js

import React from 'react';
import styled from 'styled-components';
import SocialShare from './SocialShare';

const FooterWrapper = styled.footer`
  margin-top: auto;
  padding: 1rem 0;
  background-color: rgba(0, 0, 0, 0.8);
  width: 100%;
  text-align: center;
`;

const FooterText = styled.p`
  color: #fff;
  font-size: 0.9rem;
  margin: 0;

  a {
    color: #1da1f2;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => (
  <FooterWrapper>
  	Compartir: <br/><SocialShare />
    <FooterText>
     Desarrollado por <a href="https://x.com/kerycdiaz" target="_blank" rel="noopener noreferrer">Keryc Díaz</a>
    </FooterText>
  </FooterWrapper>
);

export default Footer;
