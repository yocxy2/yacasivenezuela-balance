// src/components/BalanceItem.js

import React from 'react';
import styled from 'styled-components';

const BalanceItemWrapper = styled.li`
  background: rgba(0, 0, 0, 0.7);
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 10px;
  text-align: left;
`;

const CryptoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CryptoName = styled.h2`
  font-size: 1rem;
  margin: 0;

  @media (min-width: 600px) {
    font-size: 1.8rem;
  }
`;

const CryptoSymbol = styled.span`
  font-size: 1rem;
  color: #aaa;

  @media (min-width: 600px) {
    font-size: 1.2rem;
  }
`;

const BalanceInfo = styled.div`
  margin-top: 0.5rem;
`;

const BalanceAmount = styled.p`
  font-size: 0.8rem;
  margin: 0.5rem 0;
`;

const AmountUSD = styled.span`
  font-size: 1.2rem;
  color: #fff;
`;

const Address = styled.p`
  font-size: 0.7rem;
  color: #ccc;
  margin: 0.5rem 0;
  word-wrap: break-word;
`;

const Network = styled.p`
  font-size: 0.7rem;
  color: #ccc;
  margin: 0.5rem 0;
`;

const BalanceItem = ({ name, symbol, balance, price, address, network }) => (
  <BalanceItemWrapper>
    <CryptoHeader>
      <CryptoName>{name}</CryptoName>
      <CryptoSymbol>{symbol}</CryptoSymbol>
    </CryptoHeader>
    <BalanceInfo>
      <BalanceAmount>
        Balance: {balance !== null ? `${balance} ${symbol}` : 'Cargando...'}
      </BalanceAmount>
      {price && balance !== null && (
        <AmountUSD>
          Saldo en USD: ${Number(balance * price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
        </AmountUSD>
      )}
      {address && (
        <Address>
          <strong>Dirección:</strong> {address}
        </Address>
      )}
      {network && (
        <Network>
          <strong>Red:</strong> {network}
        </Network>
      )}
    </BalanceInfo>
  </BalanceItemWrapper>
);

export default BalanceItem;
