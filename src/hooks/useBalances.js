// src/hooks/useBalances.js

import { useEffect, useState } from 'react';
import {
  getBitcoinBalance,
  getBitcoinTotalSent,
  getEthereumBalance,
  getUSDCBalance,
  getTetherOutgoingTransactionsSum,
  getCryptoPrices,
  getTetherBalance,
} from '../utils/api';

const useBalances = () => {
  const [balances, setBalances] = useState({
    btc: null,
    eth: null,
    usdc: null,
    usdt: null,
    prices: null,
    totalUSD: null,
  });

  useEffect(() => {
    let intervalId;

    const fetchBalances = async () => {
      const btcAddress = '1P5jycZKohMwvHZB8JYuLLMMBy73DoUeDx';
      const ethAddress = '0xc2c48ae6d42f17823c6263a57c5630821f88b912';
      const usdtAddress = 'TEf3uQxCRwnSK131nfGF7bJgW8pzcR4UU1';
      const etherscanApiKey = process.env.GATSBY_ETHERSCAN_API_KEY;

      // Fecha de inicio (inicio del día de hoy)
      const start = new Date(2024, 8, 16);
      start.setHours(0, 0, 0, 0);
      const fromTimestamp = start.getTime();

      try {
        // Para Ethereum, necesitamos obtener el número de bloque correspondiente a la fecha

        const [
          btcBalance,
          btcSent,
          ethSent,
          usdcSent,
          usdBalance,
          usdtSent,
          prices,
        ] = await Promise.all([
          getBitcoinBalance(btcAddress),
          getBitcoinTotalSent(btcAddress),
          getEthereumBalance(ethAddress, etherscanApiKey),
          getUSDCBalance(
            ethAddress,
            '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eb48',
            etherscanApiKey
          ),
          getTetherBalance(usdtAddress),
          getTetherOutgoingTransactionsSum(usdtAddress, fromTimestamp),
          getCryptoPrices(),
        ]);

        const btcUSD = (btcBalance + btcSent) * prices.bitcoin.usd;
        const ethUSD = ethSent * prices.ethereum.usd;
        const usdcUSD = usdcSent * prices['usd-coin'].usd;
        const usdtUSD = (usdBalance + usdtSent) * prices.tether.usd;

        const totalUSD = btcUSD + ethUSD + usdcUSD + usdtUSD;

        setBalances({
          btc: (btcBalance + btcSent),
          eth: ethSent,
          usdc: usdcSent,
          usdt: (usdBalance + usdtSent),
          prices,
          totalUSD,
        });
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    // Llamada inicial
    fetchBalances();

    // Establecer intervalo para actualizar los datos
    intervalId = setInterval(fetchBalances, 60000); // Actualiza cada 60 segundos

    // Limpiar el intervalo al desmontar
    return () => clearInterval(intervalId);
  }, []);

  return balances;
};

export default useBalances;

