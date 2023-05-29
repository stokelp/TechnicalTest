import { Band } from '../../types';

export const filterBand = (bands: Band[], key: 'style' | 'origin', value: string) => bands.filter(band => band[key]?.toLowerCase().includes(value.toLowerCase()));

export const sort = (a: string | number, b: string | number) => {
    let valueA = typeof a === 'string' ? a.toLowerCase() : a;
    let valueB = typeof b === 'string' ? b.toLowerCase() : b;
    if (valueA > valueB) {
        return 1;
      }
      if (valueA < valueB) {
        return -1;
      }
      return 0;
}