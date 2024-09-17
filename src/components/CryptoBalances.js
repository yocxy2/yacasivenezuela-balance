import React from 'react';
import styled from 'styled-components';
import useBalances from '../hooks/useBalances';
import BalanceItem from './BalanceItem';
import Footer from './Footer';
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
  font-size: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (min-width: 600px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const TotalBalance = styled.h2`
  font-size: 1.8rem;
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  margin: 0 0 2rem;

  border: 0.5px solid rgba(71, 63, 79, 0.16);
  padding: 1rem;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.4);

  @media (min-width: 600px) {
    font-size: 2.2rem;
  }
`;

export const BalanceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en pantallas medianas */
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr); /* 3 columnas en pantallas más grandes */
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr); /* 4 columnas en pantallas extra grandes */
  }
`;

const CryptoBalances = () => {
  const balances = useBalances();

  const btcAddress = '1P5jycZKohMwvHZB8JYuLLMMBy73DoUeDx';
  const ethAddress = '0xc2c48ae6d42f17823c6263a57c5630821f88b912';
  const usdtAddress = 'TEf3uQxCRwnSK131nfGF7bJgW8pzcR4UU1';

  return (
    <Container>
      <Title>#YaCasiVenezuela</Title>
      {balances.totalUSD !== null && (
        <TotalBalance>
          Recaudado: ${balances.totalUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
        </TotalBalance>
      )}

      <BalanceGrid>
        <BalanceItem
          name="Bitcoin"
          symbol="BTC"
          balance={balances.btc}
          price={balances.prices ? balances.prices.bitcoin.usd : null}
          address={btcAddress}
          network="Bitcoin"
        />
        <BalanceItem
          name="Ethereum"
          symbol="ETH"
          balance={balances.eth}
          price={balances.prices ? balances.prices.ethereum.usd : null}
          address={ethAddress}
          network="Ethereum (ERC20)"
        />
        <BalanceItem
          name="USDC Coin"
          symbol="USDC"
          balance={balances.usdc}
          price={balances.prices ? balances.prices['usd-coin'].usd : null}
          address={ethAddress}
          network="Ethereum (ERC20)"
        />
        <BalanceItem
          name="Tether"
          symbol="USDT"
          balance={balances.usdt}
          price={balances.prices ? balances.prices.tether.usd : null}
          address={usdtAddress}
          network="Tron (TRC20)"
        />
      </BalanceGrid>

      
      <Footer />
    </Container>
  );
};

export default CryptoBalances;




