import type { TableData } from '../types';

export const normalizeTable = (data: TableData): TableData => {
  const columnCount = data.columns.length;
  const rows = data.rows.map((row) => {
    const values = [...row.values];
    while (values.length < columnCount) values.push(0);
    return { title: row.title, values };
  });
  return { columns: [...data.columns], rows };
};