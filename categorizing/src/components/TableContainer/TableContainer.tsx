import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { saveProjectTable } from '../../redux/projectSlice';
import DynamicTableBuilder from '../DynamicTableBuilder/DynamicTableBuilder';
import './TableButtons.css';
import { convertExcelToTableData } from '../../utils/readXLSXfile';

const TableContainer = () => {
  const dispatch = useAppDispatch();
  const selectedProjectId = useAppSelector(s => s.projects.selectedProjectId);
  const table = useAppSelector(s =>
    s.projects.list.find(p => p.id === selectedProjectId)?.table
  );

  const [tempTable, setTempTable]=useState(table || { columns: [], rows: [] });

  const [localTable, setLocalTable] = useState(table || { columns: [], rows: [] });
  const [isDirty, setIsDirty] = useState(false);

  // Restore project table if it changes
  useEffect(() => {
    setLocalTable(table || { columns: [], rows: [] });
    setTempTable(table || { columns: [], rows: [] });
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

  const Calculation = ()=>{
    alert('calc');
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', top: '150px', padding: '20px' }}>
      <DynamicTableBuilder
        initialTable={tempTable || { columns: [], rows: [] }}
        onChange={setLocalTable}
        onDirtyChange={setIsDirty}
      />
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;

          convertExcelToTableData(file).then((tableData) => {
            if (selectedProjectId) {
              setTempTable(tableData); // or dispatch to Redux
              setIsDirty(true);
            }
            e.target.value = '';
          });
        }}
      />

      {isDirty && (
        <button className='table-save-button' onClick={handleSave}>
          Save
        </button>
      )}
      <button className='table-save-button' onClick={Calculation}>
          Calculate
        </button>
    </div>
  );
};

export default TableContainer;
