import { useEffect, useState } from 'react';
import {
  getBitcoinBalance,
  getEthereumBalance,
  getUSDCBalance,
  getTetherBalance,
  getCryptoPrices,
} from '../utils/api';

const useBalances = () => {
  const [balances, setBalances] = useState({
    btc: null,
    eth: null,
    usdc: null,
    usdt: null,
    prices: null,
  });

  useEffect(() => {
    const fetchBalances = async () => {
      const btcAddress = '1P5jycZKohMwvHZB8JYuLLMMBy73DoUeDx';
      const ethAddress = '0xc2c48ae6d42f17823c6263a57c5630821f88b912';
      const usdtAddress = 'TEf3uQxCRwnSK131nfGF7bJgW8pzcR4UU1';
      const etherscanApiKey = process.env.GATSBY_ETHERSCAN_API_KEY;

      try {
        const [btcBalance, ethBalance, usdcBalance, usdtBalance, prices] = await Promise.all([
          getBitcoinBalance(btcAddress),
          getEthereumBalance(ethAddress, etherscanApiKey),
          getUSDCBalance(
            ethAddress,
            '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eb48',
            etherscanApiKey
          ),
          getTetherBalance(usdtAddress),
          getCryptoPrices(),
        ]);

        setBalances({
          btc: btcBalance,
          eth: ethBalance,
          usdc: usdcBalance,
          usdt: usdtBalance,
          prices,
        });
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    fetchBalances();
  }, []);

  return balances;
};

export default useBalances;
