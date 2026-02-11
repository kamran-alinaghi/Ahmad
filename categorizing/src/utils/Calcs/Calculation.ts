import { AddToSequence } from './addingSequence';
import type { TableData } from "../../components/DynamicTableBuilder/types";
import { FindClosestMembers, FindSecondClosestMember, RearrangeInstances } from "./basicCalculatioins";
import { TableData2Members } from "./Members";
import { scaleTable } from "./ScaleTableData";

export function Calculation(table: TableData) {
    const result = scaleTable(table); //scale all number from 0 to 0.707
    const membrsArray = TableData2Members(result);
    const firstCloseMember = FindClosestMembers(membrsArray, "ward");
    const secondCloseMember = FindSecondClosestMember(membrsArray,"ward",firstCloseMember);
    const wardResult = AddToSequence(membrsArray,firstCloseMember,secondCloseMember);
    RearrangeInstances(membrsArray,firstCloseMember);

    const membrsArray2 = TableData2Members(result);
    const firstCloseMember2 = FindClosestMembers(membrsArray2, "avg");
    const secondCloseMember2 = FindSecondClosestMember(membrsArray2,"avg",firstCloseMember2);
    const avgResult = AddToSequence(membrsArray2,firstCloseMember2,secondCloseMember2);
    alert(JSON.stringify(wardResult));
    alert(JSON.stringify(avgResult));
}