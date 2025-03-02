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
import AdaWhiteSvg from '@/assets/icons/crypto_logo/ada.svg';
import BnbWhiteSvg from '@/assets/icons/crypto_logo/bnb.svg';
import BtcWhiteSvg from '@/assets/icons/crypto_logo/btc.svg';
import DogeWhiteSvg from '@/assets/icons/crypto_logo/doge.svg';
import EthWhiteSvg from '@/assets/icons/crypto_logo/eth.svg';
import LtcWhiteSvg from '@/assets/icons/crypto_logo/ltc.svg';
import SolWhiteSvg from '@/assets/icons/crypto_logo/sol.svg';
import TrxWhiteSvg from '@/assets/icons/crypto_logo/trx.svg';
import UsdcWhiteSvg from '@/assets/icons/crypto_logo/usdc.svg';
import UsdtWhiteSvg from '@/assets/icons/crypto_logo/usdt.svg';
import XrpWhiteSvg from '@/assets/icons/crypto_logo/xrp.svg';
import {CryptosEnum} from '@/constants/Cryptos';

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

const cryptoWhiteLogosMap: Record<CryptosEnum, React.FC<SvgProps>> = {
  [CryptosEnum.BTC]: BtcWhiteSvg,
  [CryptosEnum.ETH]: EthWhiteSvg,
  [CryptosEnum.ADA]: AdaWhiteSvg,
  [CryptosEnum.XRP]: XrpWhiteSvg,
  [CryptosEnum.LTC]: LtcWhiteSvg,
  [CryptosEnum.BNB]: BnbWhiteSvg,
  [CryptosEnum.SOL]: SolWhiteSvg,
  [CryptosEnum.DOGE]: DogeWhiteSvg,
  [CryptosEnum.TRX]: TrxWhiteSvg,
  [CryptosEnum.USDT]: UsdtWhiteSvg,
  [CryptosEnum.USDC]: UsdcWhiteSvg,
};

interface CryptoIconProps extends SvgProps {
  crypto: CryptosEnum;
  size?: number;
  logoOnly?: boolean;
}

export const IconCrypto = ({crypto, size, logoOnly, ...props}: CryptoIconProps) => {
  const IconComponent = logoOnly ? cryptoWhiteLogosMap[crypto] : cryptoIconsMap[crypto];

  return <IconComponent width={size ?? 32} height={size ?? 32} {...props} />;
};
