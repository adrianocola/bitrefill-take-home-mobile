export enum CryptosEnum {
  BTC = 'BTC',
  ETH = 'ETH',
  ADA = 'ADA',
  XRP = 'XRP',
  LTC = 'LTC',
  BNB = 'BNB',
  SOL = 'SOL',
  DOGE = 'DOGE',
  TRX = 'TRX',
  USDT = 'USDT',
  USDC = 'USDC',
}

export interface CryptoData {
  name: string;
  symbol: CryptosEnum;
  color: string;
  textColor?: string;
}

export const CryptoUsdPrices: Record<CryptosEnum, number> = {
  [CryptosEnum.BTC]: 84107,
  [CryptosEnum.ETH]: 2216,
  [CryptosEnum.ADA]: 0.631,
  [CryptosEnum.XRP]: 2.14,
  [CryptosEnum.LTC]: 127.72,
  [CryptosEnum.BNB]: 592.49,
  [CryptosEnum.SOL]: 140.48,
  [CryptosEnum.DOGE]: 0.203,
  [CryptosEnum.TRX]: 0.2327,
  [CryptosEnum.USDT]: 0.9996,
  [CryptosEnum.USDC]: 0.9999,
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
    color: 'white',
    textColor: 'black',
  },
  [CryptosEnum.BNB]: {
    name: 'BNB',
    symbol: CryptosEnum.BNB,
    color: '#f3ba2f',
    textColor: 'black',
  },
  [CryptosEnum.SOL]: {
    name: 'Solana',
    symbol: CryptosEnum.SOL,
    color: '#66f9a1',
    textColor: 'black',
  },
  [CryptosEnum.DOGE]: {
    name: 'Dogecoin',
    symbol: CryptosEnum.DOGE,
    color: '#c3a635',
  },
  [CryptosEnum.TRX]: {
    name: 'TRON',
    symbol: CryptosEnum.TRX,
    color: '#ef2026',
  },
  [CryptosEnum.USDT]: {
    name: 'Tether',
    symbol: CryptosEnum.USDT,
    color: '#26a17b',
  },
  [CryptosEnum.USDC]: {
    name: 'USDC',
    symbol: CryptosEnum.USDC,
    color: '#3e73c4',
  },
} as const;
