import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { saveProjectTable } from '../../redux/projectSlice';
import DynamicTableBuilder from '../DynamicTableBuilder/DynamicTableBuilder';

const TableContainer = () => {
  const dispatch = useAppDispatch();
  const selectedProjectId = useAppSelector(s => s.projects.selectedProjectId);
  const table = useAppSelector(s =>
    s.projects.list.find(p => p.id === selectedProjectId)?.table
  );

  const [localTable, setLocalTable] = useState(table || { columns: [], rows: [] });
  const [isDirty, setIsDirty] = useState(false);

  // Restore project table if it changes
  useEffect(() => {
    setLocalTable(table || { columns: [], rows: [] });
    setIsDirty(false);
  }, [table]);

  const handleSave = () => {
    if (selectedProjectId && isDirty) {
      dispatch(saveProjectTable({ projectId: selectedProjectId, table: localTable }));
      setIsDirty(false);
    }
  };

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (isDirty) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', top: '150px', padding: '20px' }}>
      <DynamicTableBuilder
        initialTable={table || { columns: [], rows: [] }}
        onChange={setLocalTable}
        onDirtyChange={setIsDirty}
      />
      {isDirty && (
        <button
          onClick={handleSave}
          style={{ position: 'relative', top:20, left: 0 }}
        >
          Save
        </button>
      )}
    </div>
  );
};

export default TableContainer;
