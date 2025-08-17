import React from 'react';
import './TableBuilder.css';
import type { TableData } from './types';
import CellWithDelete from '../CellWithDelete/CellWithDelete';
import EditableCell from '../EditableCell/EditableCell';

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
                <CellWithDelete
                  value={col}
                  onChange={(v) => updateColumnTitle(colIdx, v)}
                  onDelete={() => deleteColumn(colIdx)}
                />
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
                <CellWithDelete
                  value={row.title}
                  onChange={(v) => updateRowTitle(rowIdx, v)}
                  onDelete={() => deleteRow(rowIdx)}
                />
              </td>
              {row.values.map((cell, colIdx) => (
                <td key={colIdx}>
                  <EditableCell
                    value={cell}
                    onChange={(v) => updateCell(rowIdx, colIdx, v)}
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
