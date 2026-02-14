import { AddingSequence, AddToSequence } from './addingSequence';
import type { TableData } from "../../components/DynamicTableBuilder/types";
import { FindClosestMembers, FindSecondClosestMember, RearrangeInstances } from "./basicCalculatioins";
import { Member, TableData2Member, TableData2Members } from "./Members";
import { scaleTable } from "./ScaleTableData";
import { FindMaxSi } from './siCalcs';
import { FinalGrouping, type FinalCluster } from './Grouping';

export type FinalClusterToShow = {
    Clustered: NamedCluster[];
    NotClustered: NamedCluster;
}

export type NamedCluster = {
    ClusterMembers: string[];
}
export function Calculation(table: TableData): FinalClusterToShow {
    const firstPair: AddingSequence = GetFirstPair(table);
    const memberAray: Member[] = TableData2Member(table);
    const finalGrouping: FinalCluster = FinalGrouping(firstPair, memberAray);
    const finalResult: FinalClusterToShow = GetFinalResultNames(finalGrouping, memberAray);
    return finalResult;
}

export function GetFirstPair(table: TableData): AddingSequence {
    const wardResult: AddingSequence[] = [];
    const avgResult: AddingSequence[] = [];
    const result = scaleTable(table); //scale all number from 0 to 0.707
    const membersArray = TableData2Members(result);
    while (membersArray.length > 1) {
        const firstCloseMember = FindClosestMembers(membersArray, "ward");
        const secondCloseMember = FindSecondClosestMember(membersArray, "ward", firstCloseMember);
        wardResult.push(AddToSequence(membersArray, firstCloseMember, secondCloseMember));
        RearrangeInstances(membersArray, firstCloseMember);
    }

    const membrsArray2 = TableData2Members(result);
    while (membrsArray2.length > 1) {
        const firstCloseMember2 = FindClosestMembers(membrsArray2, "avg");
        const secondCloseMember2 = FindSecondClosestMember(membrsArray2, "avg", firstCloseMember2);
        avgResult.push(AddToSequence(membrsArray2, firstCloseMember2, secondCloseMember2));
        RearrangeInstances(membrsArray2, firstCloseMember2);
    }
    return FindMaxSi(wardResult, avgResult);
}

function GetFinalResultNames(finalGrouping: FinalCluster, memberAray: Member[]): FinalClusterToShow {
    const result: FinalClusterToShow = { Clustered: [], NotClustered: { ClusterMembers: [] } };
    finalGrouping.Clustered.map((cluster) => {
        const temp: NamedCluster = { ClusterMembers: [] };
        cluster.ClusterMembers.map((ind) => {
            temp.ClusterMembers.push(memberAray[ind].Name);
        });
        result.Clustered.push(temp);
    });
    finalGrouping.NotClustered.ClusterMembers.map((ind) => {
        result.NotClustered.ClusterMembers.push(memberAray[ind].Name);
    });
    return result
}
