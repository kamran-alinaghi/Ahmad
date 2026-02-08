import { useEffect, useState } from 'react';
import type { TableData } from './types';
import { hasTableChanged } from './helpers/hasTableChanged';
import { generateEmptyRow } from './helpers/generateEmptyRow';
import { normalizeTable } from './helpers/normalizeTable';

export const useDynamicTable = (initial: TableData, onChange?: (data: TableData) => void) => {
  const [original, setOriginal] = useState<TableData>(normalizeTable(initial));
  const [table, setTable] = useState<TableData>(normalizeTable(initial));

  useEffect(() => {
    setOriginal(normalizeTable(initial));
    setTable(normalizeTable(initial));
  }, [initial]);

  useEffect(() => {
    if (onChange) onChange(table);
  }, [table]);

  const updateCell = (rowIdx: number, colIdx: number, value: number) => {
    const copy = { ...table };
    copy.rows[rowIdx].values[colIdx] = value;
    setTable(normalizeTable(copy));
  };

  const updateColumnTitle = (index: number, value: string) => {
    const copy = { ...table, columns: [...table.columns] };
    copy.columns[index] = value;
    setTable(copy);
  };

  const updateRowTitle = (index: number, value: string) => {
    const copy = { ...table, rows: [...table.rows] };
    copy.rows[index].title = value;
    setTable(copy);
  };

  const addColumn = () => {
    setTable((prev) => normalizeTable({
      columns: [...prev.columns, ''],
      rows: prev.rows.map((r) => ({ ...r, values: [...r.values, 0] })),
    }));
  };

  const addRow = () => {
    setTable((prev) => normalizeTable({
      columns: [...prev.columns],
      rows: [...prev.rows, generateEmptyRow(prev.columns.length)],
    }));
  };

  const deleteColumn = (index: number) => {
    const copy = {
      columns: table.columns.filter((_, i) => i !== index),
      rows: table.rows.map((row) => ({
        ...row,
        values: row.values.filter((_, i) => i !== index),
      })),
    };
    setTable(normalizeTable(copy));
  };

  const deleteRow = (index: number) => {
    const copy = {
      columns: table.columns,
      rows: table.rows.filter((_, i) => i !== index),
    };
    setTable(normalizeTable(copy));
  };

  const reset = () => setTable(normalizeTable(original));

  const hasChanges = hasTableChanged(table, original);

  return {
    table,
    setTable,
    updateCell,
    updateColumnTitle,
    updateRowTitle,
    addColumn,
    addRow,
    deleteColumn,
    deleteRow,
    reset,
    hasChanges,
  };
};