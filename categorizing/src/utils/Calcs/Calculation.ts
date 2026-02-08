import type { TableData } from "../../components/DynamicTableBuilder/types";
import { scaleTable } from "./ScaleTableData";

export function Calculation(table: TableData) {
    const result=  scaleTable(table);
    alert(JSON.stringify(result));
}