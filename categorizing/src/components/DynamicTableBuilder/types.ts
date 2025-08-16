export type TableRow = {
  title: string;
  values: string[];
};

export type TableData = {
  columns: string[];
  rows: TableRow[];
};