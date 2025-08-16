import React from 'react';
import type { TableData } from './types';
import './TableBuilder.css';

type Props = {
  table: TableData;
  updateCell: (row: number, col: number, value: string) => void;
  updateColumnTitle: (col: number, value: string) => void;
  updateRowTitle: (row: number, value: string) => void;
  addColumn: () => void;
  addRow: () => void;
  deleteColumn: (col: number) => void;
  deleteRow: (row: number) => void;
};

const TableRenderer: React.FC<Props> = ({
  table,
  updateCell,
  updateColumnTitle,
  updateRowTitle,
  addColumn,
  addRow,
  deleteColumn,
  deleteRow,
}) => {
  return (
    <div className="table-wrapper">
      <table className="editable-table">
        <thead>
          <tr>
            <th></th>
            {table.columns.map((col, colIdx) => (
              <th key={colIdx}>
                <input
                  value={col}
                  onChange={(e) => updateColumnTitle(colIdx, e.target.value)}
                />
                <button onClick={() => deleteColumn(colIdx)}>×</button>
              </th>
            ))}
            <th>
              <button onClick={addColumn}>＋</button>
            </th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIdx) => (
            <tr key={rowIdx}>
              <td>
                <input
                  value={row.title}
                  onChange={(e) => updateRowTitle(rowIdx, e.target.value)}
                />
                <button onClick={() => deleteRow(rowIdx)}>×</button>
              </td>
              {row.values.map((cell, colIdx) => (
                <td key={colIdx}>
                  <input
                    value={cell}
                    onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
                  />
                </td>
              ))}
              <td></td>
            </tr>
          ))}
          <tr>
            <td>
              <button onClick={addRow}>＋</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableRenderer;