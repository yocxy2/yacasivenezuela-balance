import React from 'react';
import styled from 'styled-components';

const BalanceItemWrapper = styled.li`
  font-size: 1.3rem;
  margin: 1.5rem 0;
  background: rgba(0, 0, 0, 0.6);
  display: block;
  padding: 1rem 2rem;
  border-radius: 10px;
`;

const AmountUSD = styled.span`
  display: block;
  font-size: 1.8rem;
  color: #ddd;
  margin-top: 0.5rem;
`;

const Address = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #ccc;
  margin-top: 0.5rem;
  word-wrap: break-word;
`;

const Network = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #ccc;
  margin-top: 0.5rem;
`;

const BalanceItem = ({ name, symbol, balance, price, address, network }) => (
  <BalanceItemWrapper>
    {name} ({symbol}): {balance !== null ? `${balance} ${symbol}` : 'Cargando...'}
    {price && balance !== null && (
      <AmountUSD>
        (~${(balance * price).toFixed(2)} USD)
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
  </BalanceItemWrapper>
);

export default BalanceItem;
