import axios from 'axios';

// Configuración de Axios para reintentos y timeout
const axiosInstance = axios.create({
  timeout: 5000, // Timeout de 5 segundos
  retry: 3, // Intentos de reintento
  retryDelay: (retryCount) => retryCount * 1000, // Esperar 1 segundo más en cada intento
});

// Función para obtener los precios de las criptomonedas
export const getCryptoPrices = async () => {
  const { data } = await axiosInstance.get(
    'https://api.coingecko.com/api/v3/simple/price',
    {
      params: {
        ids: 'bitcoin,ethereum,usd-coin,tether',
        vs_currencies: 'usd',
      },
    }
  );
  return data;
};

// Función para obtener balance de Bitcoin
export const getBitcoinBalance = async (address) => {
  const { data } = await axiosInstance.get(
    `https://blockchain.info/q/addressbalance/${address}`
  );
  return data / 1e8; // Convertir satoshis a BTC
};

// Función para obtener balance de Ethereum
export const getEthereumBalance = async (address, apiKey) => {
  const { data } = await axiosInstance.get('https://api.etherscan.io/api', {
    params: {
      module: 'account',
      action: 'balance',
      address,
      apikey: apiKey,
    },
  });
  return data.result / 1e18; // Convertir Wei a ETH
};

// Función para obtener balance de USDC
export const getUSDCBalance = async (address, contractAddress, apiKey) => {
  const { data } = await axiosInstance.get('https://api.etherscan.io/api', {
    params: {
      module: 'account',
      action: 'tokenbalance',
      contractaddress: contractAddress,
      address,
      apikey: apiKey,
    },
  });
  return data.result / 1e6; // USDC tiene 6 decimales
};

// Función para obtener balance de USDT (Tether)
export const getTetherBalance = async (address) => {
  try {
    const { data } = await axiosInstance.get(
      `https://apilist.tronscan.org/api/account?address=${address}`
    );
    const usdtToken = data.trc20token_balances?.find(
      (token) => token.tokenId === 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'
    );
    return usdtToken ? usdtToken.balance / Math.pow(10, usdtToken.tokenDecimal) : 0;
  } catch (error) {
    console.error('Error fetching USDT balance:', error);
    return 0;
  }
};

// Obtener el número de bloque por timestamp
export const getBlockNumberByTimestamp = async (timestamp, apiKey) => {
  const { data } = await axiosInstance.get('https://api.etherscan.io/api', {
    params: {
      module: 'block',
      action: 'getblocknobytime',
      timestamp: Math.floor(timestamp / 1000),
      closest: 'before',
      apikey: apiKey,
    },
  });
  return data.result;
};

export const getBitcoinTotalSent = async (address) => {
  const response = await axios.get(`https://blockchain.info/rawaddr/${address}`);
  //const totalReceived = response.data.total_received / 1e8; // Convertir satoshis a BTC
  const totalSent = response.data.total_sent / 1e8; // Convertir satoshis a BTC

  return totalSent - 0.06152176;

};


export const getEthereumOutgoingTransactionsSum = async (address, fromBlock, apiKey) => {
  let totalSent = 0;

  const response = await axios.get(`https://api.etherscan.io/api`, {
    params: {
      module: 'account',
      action: 'txlist',
      address,
      startblock: fromBlock,
      endblock: 99999999,
      sort: 'asc',
      apikey: apiKey,
    },
  });
  const transactions = response.data.result;


  for (const tx of transactions) {
    try{
      if (tx.from !== undefined && tx.from.toLowerCase() === address.toLowerCase()) {
        totalSent += parseFloat(tx.value);
      }
    } catch{
      console.log("Error getEthereumOutgoingTransactionsSum")
    }
    
  }

  return totalSent / 1e18; // Convertir Wei a ETH
};

export const getERC20OutgoingTransactionsSum = async (address, contractAddress, fromBlock, apiKey) => {
  let totalSent = 0;

  const response = await axios.get(`https://api.etherscan.io/api`, {
    params: {
      module: 'account',
      action: 'tokentx',
      contractaddress: contractAddress,
      address,
      startblock: fromBlock,
      endblock: 99999999,
      sort: 'asc',
      apikey: apiKey,
    },
  });

  const transactions = response.data.result;

  for (const tx of transactions) {
    try{
      if (tx.from !== undefined && tx.from.toLowerCase() === address.toLowerCase()) {
        totalSent += parseFloat(tx.value);
      }
    } catch{
      console.log("Error getERC20OutgoingTransactionsSum")
    }
    
  }
  return totalSent / 1e6; // USDC tiene 6 decimales
};

export const getTetherOutgoingTransactionsSum = async (address, fromTimestamp) => {
  let totalSent = 0;
  let limit = 150;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await axios.get(`https://apilist.tronscan.org/api/transaction`, {
      params: {
        address,
        limit,
        start: offset,
        sort: '-timestamp',
      },
    });

    const transactions = response.data.data;
    if (transactions.length === 0) {
      break;
    }

    for (const tx of transactions) {
      if (tx.timestamp < fromTimestamp) {
        hasMore = false;
        break;
      }
      if (tx.ownerAddress === address && tx.contractType === 31) {
        const isUSDT = tx.tokenInfo && tx.tokenInfo.tokenId === '_';
        if (isUSDT) {
          totalSent += parseFloat(tx.trigger_info.parameter._value); // USDT tiene 6 decimales
        }
      }
    }

    offset += limit;
  }

  return totalSent / 1e6;
};

