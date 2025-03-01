import {NUMBER_MAX, NUMBER_PRECISION} from '@/constants/Consts';

const floatRegex = /^\d+(\.\d+)?$/;

export const validateIsNumber = {
  validator: (value?: string) => !!value && floatRegex.test(value) && parseFloat(value) !== 0,
  message: 'Invalid number',
};

export const validateMaxNumber = {
  validator: (value?: string) => {
    if (!value) return false;
    const [int] = value.split('.');
    console.log(int);

    return parseInt(int, 10) < NUMBER_MAX;
  },
  message: `Maximum number: ${NUMBER_MAX}`,
};

export const validateMaxPrecision = {
  validator: (value?: string) => {
    if (!value) return false;
    const [, float = ''] = value.split('.');

    return float.length <= NUMBER_PRECISION;
  },
  message: `Maximum number of decimal places: ${NUMBER_PRECISION}`,
};
