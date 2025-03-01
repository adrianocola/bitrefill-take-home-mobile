import * as React from 'react';
import {SvgProps} from 'react-native-svg';

import AdaSvg from '@/assets/icons/crypto/ada.svg';
import BnbSvg from '@/assets/icons/crypto/bnb.svg';
import BtcSvg from '@/assets/icons/crypto/btc.svg';
import DogeSvg from '@/assets/icons/crypto/doge.svg';
import EthSvg from '@/assets/icons/crypto/eth.svg';
import LtcSvg from '@/assets/icons/crypto/ltc.svg';
import SolSvg from '@/assets/icons/crypto/sol.svg';
import TrxSvg from '@/assets/icons/crypto/trx.svg';
import UsdcSvg from '@/assets/icons/crypto/usdc.svg';
import UsdtSvg from '@/assets/icons/crypto/usdt.svg';
import XrpSvg from '@/assets/icons/crypto/xrp.svg';
import {CryptosEnum} from '@/constants/Cryptos';

interface CryptoIconProps extends SvgProps {
  crypto: CryptosEnum;
}

const cryptoIconsMap: Record<CryptosEnum, React.FC<SvgProps>> = {
  [CryptosEnum.BTC]: BtcSvg,
  [CryptosEnum.ETH]: EthSvg,
  [CryptosEnum.ADA]: AdaSvg,
  [CryptosEnum.XRP]: XrpSvg,
  [CryptosEnum.LTC]: LtcSvg,
  [CryptosEnum.BNB]: BnbSvg,
  [CryptosEnum.SOL]: SolSvg,
  [CryptosEnum.DOGE]: DogeSvg,
  [CryptosEnum.TRX]: TrxSvg,
  [CryptosEnum.USDT]: UsdtSvg,
  [CryptosEnum.USDC]: UsdcSvg,
};

export const IconCrypto = ({crypto, ...props}: CryptoIconProps) => {
  const IconComponent = cryptoIconsMap[crypto];

  return <IconComponent width={32} height={32} {...props} />;
};
