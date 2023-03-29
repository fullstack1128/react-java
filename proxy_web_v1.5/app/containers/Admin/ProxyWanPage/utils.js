export const getProxyStatusOptions = (intl) => [
  {
    name: 'Active',
    id: 'CONNECTED',
  },
  {
    name: 'Lost connection',
    id: 'DISCONNECTED',
  },
  {
    name: 'Remove',
    id: 'UNPLUGGED',
  },
];

export const getProxySaleStatusOptions = (intl) => [
  {
    name: 'Unused',
    id: 'AVAILABLE',
  },
  {
    name: 'Used',
    id: 'USED',
  },
];
