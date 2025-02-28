export enum CryptosEnum {
  BTC = 'BTC',
  ETH = 'ETH',
  ADA = 'ADA',
  XRP = 'XRP',
  LTC = 'LTC',
}

export interface CryptoData {
  name: string;
  symbol: CryptosEnum;
  color: string;
}

export const CryptoUsdPrices: Record<CryptosEnum, number> = {
  [CryptosEnum.BTC]: 84107,
  [CryptosEnum.ETH]: 2216,
  [CryptosEnum.ADA]: 0.631,
  [CryptosEnum.XRP]: 2.14,
  [CryptosEnum.LTC]: 127.72,
};

export const Cryptos: Record<CryptosEnum, CryptoData> = {
  [CryptosEnum.BTC]: {
    name: 'Bitcoin',
    symbol: CryptosEnum.BTC,
    color: '#f7931a',
  },
  [CryptosEnum.ETH]: {
    name: 'Ethereum',
    symbol: CryptosEnum.ETH,
    color: '#627eea',
  },
  [CryptosEnum.ADA]: {
    name: 'Cardano',
    symbol: CryptosEnum.ADA,
    color: '#0c1d2f',
  },
  [CryptosEnum.XRP]: {
    name: 'XRP',
    symbol: CryptosEnum.XRP,
    color: '#23292f',
  },
  [CryptosEnum.LTC]: {
    name: 'Litecoin',
    symbol: CryptosEnum.LTC,
    color: '#bfbbbb',
  },
} as const;
