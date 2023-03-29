import latinize from 'latinize';

export const getSuggestionProvince = (currentAddress, provinces) => {
  if (!currentAddress) return '';
  const suggestionProvince = provinces.find((option) => (
    currentAddress.includes(latinize(option.value))
  ));

  return suggestionProvince ? suggestionProvince.id : '';
};
