// src/components/SocialShare.js

import React from 'react';
import styled from 'styled-components';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon,
} from 'react-share';

const ShareWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const SocialShare = () => {
  const shareUrl = 'https://yacasidonaciones.com';
  const title = '#YaCasiVenezuela - Saldos de Criptomonedas';

  return (
    <ShareWrapper>
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
      <TelegramShareButton url={shareUrl} title={title}>
        <TelegramIcon size={32} round />
      </TelegramShareButton>
    </ShareWrapper>
  );
};

export default SocialShare;
