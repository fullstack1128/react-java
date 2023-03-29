import { eModemStatus } from 'enums/EModemStatus';
import { eModemType } from 'enums/EModemType';

export const getModemStatusOptions = (intl) => [
  {
    name: eModemStatus.READY,
    id: eModemStatus.READY,
  },
  {
    name: eModemStatus.PAUSE,
    id: eModemStatus.PAUSE,
  },
  {
    name: eModemStatus.STOP,
    id: eModemStatus.STOP,
  },
];

export const getModemTypeOptions = (intl) => [
  {
    name: eModemType.WAN,
    id: eModemType.WAN,
  },
  {
    name: eModemType.MOBILE,
    id: eModemType.MOBILE,
  },
];

