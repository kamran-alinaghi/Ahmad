import * as XLSX from 'xlsx';
import type { TableData } from '../components/DynamicTableBuilder/types';

export function convertExcelToTableData(file: File): Promise<TableData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];

      if (json.length === 0) {
        resolve({ columns: [], rows: [] });
        return;
      }

      const [_, ...dataRows] = json;
      const columnHeaders = json[0].slice(1); // skip first column which is row titles

      const rows = dataRows.map((row) => {
        const [title, ...values] = row;
        return {
          title: title ?? '',
          values: values.map(v => v?.toString() ?? ''),
        };
      });

      resolve({
        columns: columnHeaders.map(c => c?.toString() ?? ''),
        rows,
      });
    };

    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}
