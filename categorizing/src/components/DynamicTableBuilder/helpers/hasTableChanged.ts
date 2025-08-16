import type { TableData } from '../types';

export const hasTableChanged = (a: TableData, b: TableData): boolean => {
  return JSON.stringify(a) !== JSON.stringify(b);
};