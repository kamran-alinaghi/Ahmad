export type TableRow = {
  title: string;
  values: number[];
};

export type TableData = {
  columns: string[];
  rows: TableRow[];
};