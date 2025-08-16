import type { TableRow } from "../types";

export const generateEmptyRow = (columnCount: number): TableRow => ({
  title: '',
  values: Array(columnCount).fill(''),
});