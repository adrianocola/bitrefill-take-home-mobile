import * as React from 'react';
import {SvgProps} from 'react-native-svg';

import AdaSvg from '@/assets/icons/crypto/ada.svg';
import BtcSvg from '@/assets/icons/crypto/btc.svg';
import EthSvg from '@/assets/icons/crypto/eth.svg';
import LtcSvg from '@/assets/icons/crypto/ltc.svg';
import XrpSvg from '@/assets/icons/crypto/xrp.svg';
import {CryptosEnum} from '@/constants/Cryptos';

interface CryptoIconProps extends SvgProps {
  crypto: CryptosEnum;
}

const cryptoIconsMap: Record<CryptosEnum, React.FC<SvgProps>> = {
  [CryptosEnum.BTC]: BtcSvg,
  [CryptosEnum.ETH]: EthSvg,
  [CryptosEnum.ADA]: AdaSvg,
  [CryptosEnum.LTC]: LtcSvg,
  [CryptosEnum.XRP]: XrpSvg,
};

export const IconCrypto = ({crypto, ...props}: CryptoIconProps) => {
  const IconComponent = cryptoIconsMap[crypto];

  return <IconComponent width={32} height={32} {...props} />;
};
