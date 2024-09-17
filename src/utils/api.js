import axios from 'axios';

export const getCryptoPrices = async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price',
    {
      params: {
        ids: 'bitcoin,ethereum,usd-coin,tether',
        vs_currencies: 'usd',
      },
    }
  );
  return response.data;
};

export const getBitcoinBalance = async (address) => {
  const response = await axios.get(`https://blockchain.info/q/addressbalance/${address}`);
  return response.data / 1e8; // Convertir satoshis a BTC
};

export const getEthereumBalance = async (address, apiKey) => {
  const response = await axios.get(`https://api.etherscan.io/api`, {
    params: {
      module: 'account',
      action: 'balance',
      address,
      apikey: apiKey,
    },
  });
  return response.data.result / 1e18; // Convertir Wei a ETH
};

export const getUSDCBalance = async (address, contractAddress, apiKey) => {
  const response = await axios.get(`https://api.etherscan.io/api`, {
    params: {
      module: 'account',
      action: 'tokenbalance',
      contractaddress: contractAddress,
      address,
      apikey: apiKey,
    },
  });
  return response.data.result / 1e6; // USDC tiene 6 decimales
};

export const getTetherBalance = async (address) => {
  try {
    const response = await axios.get(`https://apilist.tronscan.org/api/account?address=${address}`);

    const trc20Tokens = response.data.trc20token_balances || [];

    const usdtToken = trc20Tokens.find(
      (token) => token.tokenId === 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
    );

    return usdtToken ? usdtToken.balance / Math.pow(10, usdtToken.tokenDecimal) : 0;
  } catch (error) {
    console.error('Error fetching USDT balance:', error);
    return 0;
  }
};
