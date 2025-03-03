import * as React from 'react';
import {SvgProps} from 'react-native-svg';

import AdaSvg from '@/assets/icons/coin/ada.svg';
import AvaxSvg from '@/assets/icons/coin/avax.svg';
import BnbSvg from '@/assets/icons/coin/bnb.svg';
import BtcSvg from '@/assets/icons/coin/btc.svg';
import DogeSvg from '@/assets/icons/coin/doge.svg';
import EthSvg from '@/assets/icons/coin/eth.svg';
import LinkSvg from '@/assets/icons/coin/link.svg';
import LtcSvg from '@/assets/icons/coin/ltc.svg';
import SolSvg from '@/assets/icons/coin/sol.svg';
import TrxSvg from '@/assets/icons/coin/trx.svg';
import UsdcSvg from '@/assets/icons/coin/usdc.svg';
import UsdtSvg from '@/assets/icons/coin/usdt.svg';
import XlmSvg from '@/assets/icons/coin/xlm.svg';
import XrpSvg from '@/assets/icons/coin/xrp.svg';
import AdaWhiteSvg from '@/assets/icons/coin_logo/ada.svg';
import AvaxWhiteSvg from '@/assets/icons/coin_logo/avax.svg';
import BnbWhiteSvg from '@/assets/icons/coin_logo/bnb.svg';
import BtcWhiteSvg from '@/assets/icons/coin_logo/btc.svg';
import DogeWhiteSvg from '@/assets/icons/coin_logo/doge.svg';
import EthWhiteSvg from '@/assets/icons/coin_logo/eth.svg';
import LinkWhiteSvg from '@/assets/icons/coin_logo/link.svg';
import LtcWhiteSvg from '@/assets/icons/coin_logo/ltc.svg';
import SolWhiteSvg from '@/assets/icons/coin_logo/sol.svg';
import TrxWhiteSvg from '@/assets/icons/coin_logo/trx.svg';
import UsdcWhiteSvg from '@/assets/icons/coin_logo/usdc.svg';
import UsdtWhiteSvg from '@/assets/icons/coin_logo/usdt.svg';
import XlmWhiteSvg from '@/assets/icons/coin_logo/xlm.svg';
import XrpWhiteSvg from '@/assets/icons/coin_logo/xrp.svg';
import {CoinsEnum} from '@/constants/Coins';

const coinIconsMap: Record<CoinsEnum, React.FC<SvgProps>> = {
  [CoinsEnum.BTC]: BtcSvg,
  [CoinsEnum.ETH]: EthSvg,
  [CoinsEnum.ADA]: AdaSvg,
  [CoinsEnum.XRP]: XrpSvg,
  [CoinsEnum.LTC]: LtcSvg,
  [CoinsEnum.BNB]: BnbSvg,
  [CoinsEnum.SOL]: SolSvg,
  [CoinsEnum.DOGE]: DogeSvg,
  [CoinsEnum.TRX]: TrxSvg,
  [CoinsEnum.USDT]: UsdtSvg,
  [CoinsEnum.USDC]: UsdcSvg,
  [CoinsEnum.LINK]: LinkSvg,
  [CoinsEnum.XLM]: XlmSvg,
  [CoinsEnum.AVAX]: AvaxSvg,
};

const coinLogoMap: Record<CoinsEnum, React.FC<SvgProps>> = {
  [CoinsEnum.BTC]: BtcWhiteSvg,
  [CoinsEnum.ETH]: EthWhiteSvg,
  [CoinsEnum.ADA]: AdaWhiteSvg,
  [CoinsEnum.XRP]: XrpWhiteSvg,
  [CoinsEnum.LTC]: LtcWhiteSvg,
  [CoinsEnum.BNB]: BnbWhiteSvg,
  [CoinsEnum.SOL]: SolWhiteSvg,
  [CoinsEnum.DOGE]: DogeWhiteSvg,
  [CoinsEnum.TRX]: TrxWhiteSvg,
  [CoinsEnum.USDT]: UsdtWhiteSvg,
  [CoinsEnum.USDC]: UsdcWhiteSvg,
  [CoinsEnum.LINK]: LinkWhiteSvg,
  [CoinsEnum.XLM]: XlmWhiteSvg,
  [CoinsEnum.AVAX]: AvaxWhiteSvg,
};

interface CoinIconProps extends SvgProps {
  coin: CoinsEnum;
  size?: number;
  logoOnly?: boolean;
}

export const CoinIcon = ({coin, size, logoOnly, ...props}: CoinIconProps) => {
  const IconComponent = logoOnly ? coinLogoMap[coin] : coinIconsMap[coin];

  return <IconComponent width={size ?? 32} height={size ?? 32} {...props} />;
};
