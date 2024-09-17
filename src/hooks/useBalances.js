import { useEffect, useState } from 'react';
import {
  getBitcoinBalance,
  getBitcoinTotalSent,
  getEthereumBalance,
  getUSDCBalance,
  getEthereumOutgoingTransactionsSum,
  getERC20OutgoingTransactionsSum,
  getTetherOutgoingTransactionsSum,
  getCryptoPrices,
  getTetherBalance,
  getBlockNumberByTimestamp,
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

      const start = new Date(2024, 8, 16);
      start.setHours(0, 0, 0, 0);
      const fromTimestamp = start.getTime();

      try {
        // Verifica si estamos en el navegador
        if (typeof window !== 'undefined') {
          const now = Date.now();
          const oneMinute = 60000; // 60,000 milisegundos

          // Obtiene lastFetchTime y balances en caché desde localStorage
          const lastFetchTime = localStorage.getItem('lastFetchTime');
          const cachedBalancesString = localStorage.getItem('balances');
          const cachedBalances = cachedBalancesString ? JSON.parse(cachedBalancesString) : null;

          // Función para determinar si se debe obtener datos
          const shouldFetchData = () => {
            if (!cachedBalances) {
              return true; // No hay balances en caché, se debe obtener datos
            }

            // Verifica si alguno de los balances es null o 0
            const { btc, eth, usdc, usdt } = cachedBalances;
            return (
              btc == null || btc === 0 ||
              eth == null || eth === 0 ||
              usdc == null || usdc === 0 ||
              usdt == null || usdt === 0
            );
          };

          if (!shouldFetchData()) {
            // Si no es necesario obtener datos debido a balances incompletos, verifica el tiempo
            if (lastFetchTime && now - lastFetchTime < oneMinute) {
              // Ha pasado menos de 1 minuto, usa datos en caché
              console.log('Usando datos en caché, ha pasado menos de 1 minuto desde la última obtención');
              // Carga balances desde localStorage al estado
              setBalances(cachedBalances);
              return;
            }
          }
        } else {
          // Si no estamos en el navegador, no hacemos nada
          return;
        }

        // Procede a obtener datos
        const fromBlock = await getBlockNumberByTimestamp(
          fromTimestamp,
          etherscanApiKey
        );

        // Obtiene los datos en paralelo
        const [
          btcBalance,
          btcSent,
          ethBalance,
          ethSent,
          usdcBalance,
          usdcSent,
          usdBalance,
          usdtSent,
          prices,
        ] = await Promise.all([
          getBitcoinBalance(btcAddress),
          getBitcoinTotalSent(btcAddress),
          getEthereumBalance(ethAddress, etherscanApiKey),
          getEthereumOutgoingTransactionsSum(
            ethAddress,
            fromBlock,
            etherscanApiKey
          ),
          getUSDCBalance(
            ethAddress,
            '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eb48',
            etherscanApiKey
          ),
          getERC20OutgoingTransactionsSum(
            ethAddress,
            '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eb48',
            fromBlock,
            etherscanApiKey
          ),
          getTetherBalance(usdtAddress),
          getTetherOutgoingTransactionsSum(usdtAddress, fromTimestamp),
          getCryptoPrices(),
        ]);

        // Calcula los totales
        const btcTotal = btcBalance + btcSent;
        const ethTotal = ethBalance + ethSent;
        const usdcTotal = usdcBalance + usdcSent;
        const usdtTotal = usdBalance + usdtSent;

        const btcPrice = prices?.bitcoin?.usd ?? 0;
        const ethPrice = prices?.ethereum?.usd ?? 0;
        const usdcPrice = prices?.['usd-coin']?.usd ?? 0;
        const usdtPrice = prices?.tether?.usd ?? 0;

        const btcUSD = btcTotal * btcPrice;
        const ethUSD = ethTotal * ethPrice;
        const usdcUSD = usdcTotal * usdcPrice;
        const usdtUSD = usdtTotal * usdtPrice;

        const totalUSD = btcUSD + ethUSD + usdcUSD + usdtUSD;

        const newBalances = {
          btc: btcTotal,
          eth: ethTotal,
          usdc: usdcTotal,
          usdt: usdtTotal,
          prices,
          totalUSD,
        };

        // Guarda los balances actualizados y el timestamp en localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('balances', JSON.stringify(newBalances));
          localStorage.setItem('lastFetchTime', Date.now().toString());
        }

        setBalances(newBalances);
      } catch (error) {
        console.error('Error al obtener los balances:', error);
        // Opcionalmente, puedes actualizar el estado con información del error
      }
    };

    // Llamada inicial
    fetchBalances();

    // Actualiza cada 2 minutos
    intervalId = setInterval(fetchBalances, 120000);

    return () => clearInterval(intervalId);
  }, []);

  return balances;
};

export default useBalances;


