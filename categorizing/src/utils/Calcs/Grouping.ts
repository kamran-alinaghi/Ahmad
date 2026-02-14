import type { AddingSequence } from "./addingSequence";
import type { Member } from "./Members";
import { GetSiNumber } from "./siCalcs";

export type Cluster = {
    ClusterMembers: number[];
    AlternativeMembers: number[];
}

export type FinalCluster = {
    Clustered: Cluster[];
    NotClustered: Cluster;
}

export function FinalGrouping(startingGroup: AddingSequence, instances: Member[]): FinalCluster {
    const distMatrix = GetDistanceMatrix(instances);
    const FinalCluster: FinalCluster = { Clustered: [], NotClustered: { ClusterMembers: [], AlternativeMembers: [] } };

    FinalCluster.Clustered.push({
        ClusterMembers:[...startingGroup.MembersToAdd,...startingGroup.SubGroup],
        AlternativeMembers:[]
    });

    ReorderFinalCluster(FinalCluster, instances);

    let sum = CompareClusters(FinalCluster.Clustered, FinalCluster.NotClustered, distMatrix);
    let oldSum = 0;
    while (sum > oldSum && FinalCluster.NotClustered.ClusterMembers.length > 0) {
        oldSum = sum;
        sum = CheckingNextMatch(oldSum, instances, FinalCluster, distMatrix);
    }
    return FinalCluster;
}

export function CompareArrays(array1: number[], array2: number[]): number {
    let result = 0;
    if (array1.length != array2.length) {
        throw new Error("Length doesn't match:\nFirst array length: " + array1.length + "\nSecond array length: " + array2.length);
    }
    else {
        for (let i = 0; i < array1.length; i++) {
            result += Math.pow((array1[i] - array2[i]), 2);
        }
    }
    return Math.sqrt(result);
}

export function GetDistanceMatrix(instances: Member[]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < instances.length; i++) {
        const tempArray: number[] = [];
        for (let j = 0; j < instances.length; j++) {
            if (j < i) {
                tempArray.push(result[j][i]);
            } else if (i === j) {
                tempArray.push(0);
            } else {
                tempArray.push(CompareArrays(instances[i].Properties, instances[j].Properties));
            }
        }
        result.push(tempArray);
    }
    return result;
}

export function CompareClusters(clustered: Cluster[], notClustered: Cluster, distMatrix:number[][]): number {
    const resultArray: number[] = [];
    clustered.map((cluster)=>{
        cluster.ClusterMembers.map((num)=>{
            const selfResult = InstanceCompareCluster(num, cluster.ClusterMembers, distMatrix);
            const otherResult = InstanceCompareCluster(num, cluster.AlternativeMembers, distMatrix);
            const tempSi = GetSiNumber(selfResult, otherResult);
            resultArray.push(tempSi);
        });
    });
    notClustered.ClusterMembers.forEach((num) => {
        const selfResult = InstanceCompareCluster(num, notClustered.ClusterMembers, distMatrix);
        const otherResult = InstanceCompareCluster(num, notClustered.AlternativeMembers, distMatrix);
        const tempSi = GetSiNumber(selfResult, otherResult);
        resultArray.push(tempSi);
    });
    let resultAverage = 0;
    resultArray.map((val) => { resultAverage += val; });
    return resultAverage / resultArray.length;
}

export function InstanceCompareCluster(instanceIndex:number, clusterIndexes:number[], distMatrix:number[][]){
    let result = 0;
    let count = 0;
    for (let i = 0; i < clusterIndexes.length; i++) {
        if (clusterIndexes.indexOf(instanceIndex) < 0 || (clusterIndexes.indexOf(instanceIndex) > -1 && clusterIndexes[i] != instanceIndex)) {
            const tempval = distMatrix[instanceIndex][clusterIndexes[i]];
            result += tempval;
            count++;
        }
    }
    const res = count > 0 ? (result / count) : 0;
    return res;
}

function ReorderFinalCluster(finalCluster: FinalCluster, instances:Member[]): void {
    const tempNotClustered: Cluster = { ClusterMembers: [], AlternativeMembers: [] };
    instances.map((inst)=>{
        let exist = false;
        finalCluster.Clustered.map((cluster)=>{
            cluster.ClusterMembers.map((id)=>{
                if(inst.id==id){exist=true;}
            })
        });
        if (!exist) { tempNotClustered.ClusterMembers.push(inst.id); }
    });
    finalCluster.NotClustered = tempNotClustered;
    finalCluster.NotClustered.AlternativeMembers = finalCluster.Clustered[0].ClusterMembers;
    finalCluster.Clustered[0].AlternativeMembers = tempNotClustered.ClusterMembers;
}

function CheckingNextMatch(startingSum: number, instances: Member[], finalCluster: FinalCluster, distMatrix:number[][]): number {
    let resultCluster: Cluster[] = [];
    let maxSum = startingSum;
    const matchList = FindMatchList(finalCluster, distMatrix);
    for (let i = 0; i < matchList.length; i++) {
        const tempClusters = GetTempClustered(finalCluster.Clustered, matchList[i]);

        const tempNotClustered = GetTempNotClustered(matchList[i].MembersToAdd, matchList[i].SubGroup, finalCluster);
        const tempSum = CompareClusters(tempClusters, tempNotClustered, distMatrix);

        if (tempSum > maxSum) {
            maxSum = tempSum;
            resultCluster = tempClusters;
        }
    }
    if (maxSum > startingSum) {
        finalCluster.Clustered = resultCluster;
        finalCluster.NotClustered = GetNotClustered(finalCluster.Clustered, instances, distMatrix);
    }

    return maxSum;
}

function FindMatchList(finalCluster: FinalCluster, distMatrix:number[][]) {
    const result: AddingSequence[] = [];
    const allIndividuals: number[][] = [];
    finalCluster.NotClustered.ClusterMembers.map((val) => {
        allIndividuals.push([val]);
    });

    finalCluster.Clustered.map((cluster) => {
        allIndividuals.push(cluster.ClusterMembers);
    });

    for (let i = 0; i < allIndividuals.length; i++) {
        for (let j = i + 1; j < allIndividuals.length; j++) {
            const tempSeq: AddingSequence = {
                MembersToAdd: allIndividuals[i],
                SubGroup: allIndividuals[j],
                FirstDistance: 0
            }
            const temparr = FindingAlternative(allIndividuals[i], allIndividuals[j], finalCluster, distMatrix);
            tempSeq.SecondOption = temparr.length > 0 ? temparr : [-10];
            result.push(tempSeq);
        }
    }
    return result;
}

function FindingAlternative(
    elementGroup:number[], 
    subElementGroup:number[], 
    finalCluster:FinalCluster, 
    distMatrix:number[][]
): number[] {
    let minDist = 0;
    let isFirst = true;
    let resultIndex = -1;
    const tempNotClustered = GetTempNotClustered(elementGroup, subElementGroup, finalCluster);
    const allClusters: Cluster[] =[];
    finalCluster.Clustered.map((val) => { allClusters.push(val); });
    allClusters.push(tempNotClustered);
    for (let i = 0; i < allClusters.length; i++) {
        if (allClusters[i].ClusterMembers != elementGroup && allClusters[i].ClusterMembers != subElementGroup) {
            if (isFirst) {
                minDist = CalculateDistance(elementGroup, allClusters[i], distMatrix);
                resultIndex = i;
                isFirst = false;
            }
            else {
                let tempVal = 0;
                tempVal = CalculateDistance(elementGroup, allClusters[i], distMatrix);
                if (tempVal < minDist) {
                    minDist = tempVal;
                    resultIndex = i;
                }
            }
        }
    }
    return allClusters[resultIndex].ClusterMembers;
}

function GetTempNotClustered(elementGroup:number[], subElementGroup:number[], finalCluster:FinalCluster): Cluster {
    const result:Cluster = {ClusterMembers:[],AlternativeMembers:[]};
    if (elementGroup.length == 1 && finalCluster.NotClustered.ClusterMembers.indexOf(elementGroup[0]) > -1) {
        if (subElementGroup.length == 1 && finalCluster.NotClustered.ClusterMembers.indexOf(subElementGroup[0]) > -1) {
            finalCluster.NotClustered.ClusterMembers.map((val) => {
                if (val != elementGroup[0] && val != subElementGroup[0]) {
                    result.ClusterMembers.push(val);
                }
            });
        }
        else {
            finalCluster.NotClustered.ClusterMembers.map((val) => {
                if (val != elementGroup[0]) {
                    result.ClusterMembers.push(val);
                }
            });
        }
    }
    else {
        if (subElementGroup.length == 1 && finalCluster.NotClustered.ClusterMembers.indexOf(subElementGroup[0]) > -1) {
            finalCluster.NotClustered.ClusterMembers.map((val) => {
                if (val != subElementGroup[0]) {
                    result.ClusterMembers.push(val);
                }
            });
        }
        else {
            result.ClusterMembers = finalCluster.NotClustered.ClusterMembers;
        }
    }
    result.AlternativeMembers = [...elementGroup, ...subElementGroup];
    return result;
}

function CalculateDistance(firstArray:number[], cluster:Cluster, distMatrix:number[][]): number {
    let result = 0;
        for (let i = 0; i < firstArray.length; i++) {
            for (let j = 0; j < cluster.ClusterMembers.length; j++) {
                result += distMatrix[firstArray[i]][cluster.ClusterMembers[j]];
            }
        }
    return result / (firstArray.length * cluster.ClusterMembers.length);
}

function GetTempClustered(alreadyClustered:Cluster[], newChoice:AddingSequence):Cluster[] {
    let isNew = true;

    // Create a deep-ish copy to avoid mutating the original array
    let result:Cluster[] = alreadyClustered.map(c => {return {
        ClusterMembers:[...c.ClusterMembers],
        AlternativeMembers:[...c.AlternativeMembers]
    }});

    for (let cluster of result) {
        // Check if any member or subgroup value exists in ClusterMembers
        const overlap = [...newChoice.MembersToAdd, ...newChoice.SubGroup].some(
            val => cluster.ClusterMembers.includes(val)
        );

        if (overlap) {
            isNew = false;
            // Merge arrays and remove duplicates
            const mergedSet = new Set([
                ...cluster.ClusterMembers,
                ...newChoice.MembersToAdd,
                ...newChoice.SubGroup
            ]);
            cluster.ClusterMembers = Array.from(mergedSet);
        }

        // Remove any values from AlternativeMembers that also appear in MembersToAdd or SubGroup
        const removeSet = new Set([...newChoice.MembersToAdd, ...newChoice.SubGroup]);
        cluster.AlternativeMembers = cluster.AlternativeMembers.filter(val => !removeSet.has(val));
    }

    if (isNew) {
        const tempCluster:Cluster = {
            ClusterMembers:[...newChoice.MembersToAdd, ...newChoice.SubGroup],
            AlternativeMembers:[...newChoice.SecondOption??[0]]
        };
        result.push(tempCluster);
    }

    return result;
}

function GetNotClustered(Clusters:Cluster[], instances:Member[], distMatrix:number[][]) {
    const res:Cluster = {ClusterMembers:[],AlternativeMembers:[]};
    instances.forEach((instance) => {
        let canAdd = true;
        Clusters.forEach((c) => {
            c.ClusterMembers.forEach((mem) => {
                if (instance.id == mem) { canAdd = false; }
            })
        });
        if (canAdd) { res.ClusterMembers.push(instance.id); }
    });
    if (res.ClusterMembers.length > 0) {
        res.AlternativeMembers = GetAltForNotClustered(Clusters, res.ClusterMembers, distMatrix);
    }
    else { return {ClusterMembers:[],AlternativeMembers:[]}; }
    return res;
}

function GetAltForNotClustered(Clusters:Cluster[],notClusteredMembers:number[], distMatrix:number[][]) {
    let res = [1]; res.length = 0;
    let min = 0;
    try { min = CalculateDistance(notClusteredMembers, Clusters[0],distMatrix); }
    catch { alert(JSON.stringify(Clusters)); }
    res = Clusters[0].ClusterMembers;
    for (let i = 1; i < Clusters.length; i++) {
        let tempMin = 0;
        tempMin = CalculateDistance(notClusteredMembers, Clusters[i],distMatrix);
        if (tempMin < min) {
            min = tempMin;
            res = Clusters[i].ClusterMembers;
        }
    }
    return res;
}