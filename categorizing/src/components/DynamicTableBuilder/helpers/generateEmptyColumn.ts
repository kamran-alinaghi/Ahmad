import type { TableData } from '../types';

export const generateEmptyColumn = (data: TableData): TableData => {
  return {
    columns: [...data.columns, ''],
    rows: data.rows.map((row) => ({
      ...row,
      values: [...row.values, ''],
    })),
  };
};