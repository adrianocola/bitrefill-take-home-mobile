export enum CoinsEnum {
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
  LINK = 'LINK',
  XLM = 'XLM',
  AVAX = 'AVAX',
}

export interface CoinData {
  name: string;
  symbol: CoinsEnum;
  color: string;
  textColor?: string;
}

export const CoinUsdPrices: Record<CoinsEnum, number> = {
  [CoinsEnum.BTC]: 65000,
  [CoinsEnum.ETH]: 1600,
  [CoinsEnum.ADA]: 1.1,
  [CoinsEnum.XRP]: 0.89,
  [CoinsEnum.LTC]: 190.72,
  [CoinsEnum.BNB]: 592.49,
  [CoinsEnum.SOL]: 140.48,
  [CoinsEnum.DOGE]: 0.203,
  [CoinsEnum.TRX]: 0.2327,
  [CoinsEnum.USDT]: 0.9996,
  [CoinsEnum.USDC]: 0.9999,
  [CoinsEnum.LINK]: 17.15,
  [CoinsEnum.XLM]: 0.3513,
  [CoinsEnum.AVAX]: 24.74,
};

export const Coins: Record<CoinsEnum, CoinData> = {
  [CoinsEnum.BTC]: {
    name: 'Bitcoin',
    symbol: CoinsEnum.BTC,
    color: '#f7931a',
  },
  [CoinsEnum.ETH]: {
    name: 'Ethereum',
    symbol: CoinsEnum.ETH,
    color: '#627eea',
  },
  [CoinsEnum.ADA]: {
    name: 'Cardano',
    symbol: CoinsEnum.ADA,
    color: '#0c1d2f',
  },
  [CoinsEnum.XRP]: {
    name: 'XRP',
    symbol: CoinsEnum.XRP,
    color: '#23292f',
  },
  [CoinsEnum.LTC]: {
    name: 'Litecoin',
    symbol: CoinsEnum.LTC,
    color: 'white',
    textColor: 'black',
  },
  [CoinsEnum.BNB]: {
    name: 'BNB',
    symbol: CoinsEnum.BNB,
    color: '#f3ba2f',
    textColor: 'black',
  },
  [CoinsEnum.SOL]: {
    name: 'Solana',
    symbol: CoinsEnum.SOL,
    color: '#66f9a1',
    textColor: 'black',
  },
  [CoinsEnum.DOGE]: {
    name: 'Dogecoin',
    symbol: CoinsEnum.DOGE,
    color: '#c3a635',
  },
  [CoinsEnum.TRX]: {
    name: 'TRON',
    symbol: CoinsEnum.TRX,
    color: '#ef2026',
  },
  [CoinsEnum.USDT]: {
    name: 'Tether',
    symbol: CoinsEnum.USDT,
    color: '#26a17b',
  },
  [CoinsEnum.USDC]: {
    name: 'USDC',
    symbol: CoinsEnum.USDC,
    color: '#3e73c4',
  },
  [CoinsEnum.LINK]: {
    name: 'Chainlink',
    symbol: CoinsEnum.LINK,
    color: '#335dd2',
  },
  [CoinsEnum.XLM]: {
    name: 'Stellar',
    symbol: CoinsEnum.XLM,
    color: 'white',
    textColor: 'black',
  },
  [CoinsEnum.AVAX]: {
    name: 'Avalanche',
    symbol: CoinsEnum.AVAX,
    color: '#E84142',
  },
} as const;
