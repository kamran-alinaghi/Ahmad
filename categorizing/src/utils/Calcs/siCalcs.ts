import type { AddingSequence } from "./addingSequence";

export function GetSiSequence(sequenceInstance: AddingSequence): number {
    const dist = sequenceInstance.SecondDistance ?? 0;
    return GetSiNumber(dist,sequenceInstance.FirstDistance);
}

export function GetSiNumber(firstDistance:number, secondDistance:number) {
    const max = Math.max(secondDistance, firstDistance);
    const diff = secondDistance - firstDistance;
    return max != 0 ? (diff / max) : (diff == 0 ? 1 : -1000);
}

export function FindMaxSi(wardRes: AddingSequence[], avgRes: AddingSequence[]): AddingSequence {
    let maxSi = -100;
    let result: AddingSequence = wardRes[0];
    for (let i = 0; i < wardRes.length; i++) {
        const tempSi = GetSiSequence(wardRes[i]);
        if (tempSi > maxSi) {
            maxSi = tempSi;
            result = wardRes[i];
        }
    }
    for (let i = 0; i < avgRes.length; i++) {
        const tempSi = GetSiSequence(avgRes[i]);
        if (tempSi > maxSi) {
            maxSi = tempSi;
            result = avgRes[i];
        }
    }
    return result;
}