// src/components/CryptoBalances.js

import React from 'react';
import { Container, Title, BalanceList } from '../styles/styledComponents';
import useBalances from '../hooks/useBalances';
import BalanceItem from './BalanceItem';

const CryptoBalances = () => {
  const balances = useBalances();

  // Direcciones y redes
  const btcAddress = '1P5jycZKohMwvHZB8JYuLLMMBy73DoUeDx';
  const ethAddress = '0xc2c48ae6d42f17823c6263a57c5630821f88b912';
  const usdtAddress = 'TEf3uQxCRwnSK131nfGF7bJgW8pzcR4UU1';

  return (
    <Container>
      <Title>#YaCasiVenezuela</Title>
      <BalanceList>
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
      </BalanceList>
    </Container>
  );
};

export default CryptoBalances;


