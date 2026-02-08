import type { TableData, TableRow } from "../../components/DynamicTableBuilder/types";


/**
 * Convert string values to numbers (empty/NaN -> 0) and scale each column
 * independently to [0, scaleMax] (default 0.7).
 */
export function scaleTable(
  table: TableData,
  scaleMax = 0.7
): TableData {
  const colCount = table.columns.length;

  // 1) Normalize to numeric matrix with fixed column length
  const numericRows: TableRow[] = table.rows.map(({ title, values }) => {
    const fixed = new Array(colCount).fill(0).map((_, i) => {
      const raw = values[i] ?? 0; // pad missing cells with ""
      return raw;
    });
    return { title, values: fixed };
  });


  // 2) Compute per-column min/max
  const mins = new Array(colCount).fill(Infinity);
  const maxs = new Array(colCount).fill(-Infinity);

  for (const row of numericRows) {
    for (let c = 0; c < colCount; c++) {
      const v = row.values[c];
      if (v < mins[c]) mins[c] = v;
      if (v > maxs[c]) maxs[c] = v;
    }
  }

  // 3) Scale each column to [0, scaleMax]
  const scaledRows: TableRow[] = numericRows.map(({ title, values }) => {
    const out = values.map((v, c) => {
      const min = mins[c];
      const max = maxs[c];
      //if (!Number.isFinite(min) || !Number.isFinite(max)) return 0; // no data
      if (max === min) return 0; // flat column → all zeros
      const scaled = ((v - min) / (max - min)) * scaleMax;
      // guard tiny FP drift:
      return Math.min(scaleMax, Math.max(0, scaled));
    });
    return { title, values: out };
  });

  return {
    columns: [...table.columns],
    rows: scaledRows,
  };
}
