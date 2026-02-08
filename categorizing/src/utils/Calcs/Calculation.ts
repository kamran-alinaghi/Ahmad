import type { TableData } from "../../components/DynamicTableBuilder/types";
import { scaleTable } from "./ScaleTableData";

export function Calculation(table: TableData) {
    const result = scaleTable(table); //scale all number from 0 to 0.707
    alert(JSON.stringify(result));
}