import React, { useEffect } from 'react';
import { useDynamicTable } from './useDynamicTable';
import TableRenderer from './TableRenderer';
import type { TableData } from './types';

type Props = {
  initialTable: TableData;
  onChange: (data: TableData) => void;
  onDirtyChange?: (isDirty: boolean) => void;
};

const DynamicTableBuilder: React.FC<Props> = ({ initialTable, onChange, onDirtyChange }) => {
  const {
    table,
    updateCell,
    updateColumnTitle,
    updateRowTitle,
    addColumn,
    addRow,
    deleteColumn,
    deleteRow,
    hasChanges,
  } = useDynamicTable(initialTable, onChange);

  useEffect(() => {
    if (onDirtyChange) onDirtyChange(hasChanges);
  }, [hasChanges]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <TableRenderer
        table={table}
        updateCell={updateCell}
        updateColumnTitle={updateColumnTitle}
        updateRowTitle={updateRowTitle}
        addColumn={addColumn}
        addRow={addRow}
        deleteColumn={deleteColumn}
        deleteRow={deleteRow}
      />
    </div>
  );
};

export default DynamicTableBuilder;
