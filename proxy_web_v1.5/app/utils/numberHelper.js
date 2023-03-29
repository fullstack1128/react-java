import numeral from 'numeral';

export const isFloatString = (value) => (
  /^\d+\.\d+$/.test(value)
);

export const isIntegerString = (value) => (
  /^\+?(0|[1-9]\d*)$/.test(value)
);

export const isBetween = (value, min, max) => (
  min <= value && value <= max
);

export const formatCurrency = (value) => (
  numeral(value).format('0,0.0[0]')
);

export const formatCryptoCurrency = (value) => (
  numeral(value).format('0,0.000000[0]')
);

export const formatPercentageWithDecimals = (value, isShowPercent = true) => (
  isShowPercent ? numeral(value).format('0.0[0]%') : numeral(value * 100).format('0.0[0]')
);

export const formatCurrencyRounded = (value) => (
  numeral(value).format('0,0')
);

export const isEven = (number) => (
  number % 2 === 0
);

export const isOdd = (number) => (
  Math.abs(number % 2) === 1
);

export const formatDistance = (value) => (
  numeral(value).format('0.00')
);

export const locationList = [];

export const packageLocationList = [
  { id: 'Unlimited', name: 'Unlimited' },
  ...locationList,
];

export const generateAuthProxy = () => `u${generateText(7)}:p${generateNumber(7)}`;

export const generateText = (length) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
};

export const generateNumber = (length) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
};
