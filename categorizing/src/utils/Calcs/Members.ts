import type { TableData } from "../../components/DynamicTableBuilder/types";

export class Point {
    X: number;
    Y: number;
    Value?: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }
}


export function GetPairList(array: any[]): Point[] {
    const result: Point[] = [];

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            result.push(new Point(i, j));
        }
    }

    return result;
}


export class Member {
    id: number;
    Name: string;
    Properties: number[];

    constructor(id: number) {
        this.id = id;
        this.Name = "";
        this.Properties = [];
    }
}


export class Members {
    Members: Member[];

    constructor() {
        this.Members = [new Member(0)];
        this.Members.pop();
    }

    CompareWith(compare: Members, method: string): number {
        if (method === "ward") {
            const sampleArr1 = this.GetWardProperties();
            const sampleArr2 = compare.GetWardProperties();

            const sumDiff = this.#CompareArrays(sampleArr1, sampleArr2);
            return Math.sqrt(sumDiff);
        } else {
            const tempMembers = new Members();
            tempMembers.Members = this.Members.concat(compare.Members);

            const pairList = GetPairList(tempMembers.Members);

            let sum = 0;
            for (let i = 0; i < pairList.length; i++) {
                const sampleArr1 =
                    tempMembers.Members[pairList[i].X].Properties;
                const sampleArr2 =
                    tempMembers.Members[pairList[i].Y].Properties;

                sum += this.#CompareArrays(sampleArr1, sampleArr2);
            }

            sum = sum / pairList.length;
            return Math.sqrt(sum);
        }
    }

    GetWardProperties(): number[] {
        let result = this.Members[0].Properties;

        if (this.Members.length > 1) {
            result = this.#CompareArraysWard();
        }

        return result;
    }

    #CompareArrays(array1: number[], array2: number[]): number {
        if (array1.length !== array2.length) {
            throw new Error(
                `Length doesn't match:First array length: ${array1.length}Second array length: ${array2.length}`
            );
        }

        let result = 0;
        for (let i = 0; i < array1.length; i++) {
            result += Math.pow(array1[i] - array2[i], 2);
        }

        return result;
    }

    #CompareArraysWard(): number[] {
        const result: number[] = [];

        const pairList = GetPairList(this.Members);

        for (let i = 0; i < this.Members[0].Properties.length; i++) {
            let tempSum = 0;

            for (let j = 0; j < pairList.length; j++) {
                tempSum += Math.pow(
                    this.Members[pairList[j].X].Properties[i] -
                    this.Members[pairList[j].Y].Properties[i],
                    2
                );
            }

            result.push(Math.sqrt(tempSum / pairList.length));
        }

        return result;
    }

    // #CompareArraysAvrg(): number[] {
    //     const result: number[] = [];
    //     return result;
    // }

    GetIds(): number[] | null {
        if (this.Members.length === 0) {
            return null;
        }

        const result: number[] = [];

        for (let i = 0; i < this.Members.length; i++) {
            const id = this.Members[i].id;
            if (id !== null) {
                result.push(id);
            }

        }

        return result;
    }
}

export function TableData2Members(tableData:TableData):Members[] {
    let count = 0;
    const members:Members[] = tableData.rows.map(()=>{
        const tempMember: Member = {
            id:count,
            Name: tableData.rows[count].title,
            Properties: tableData.rows[count].values
        };
        const tempMembers: Members = new Members();
        tempMembers.Members.push(tempMember);
        count++;
        return tempMembers;
    });
    return members;
}

export function TableData2Member(tableData:TableData):Member[] {
    let count = 0;
    const members:Member[] = tableData.rows.map(()=>{
        const tempMember: Member = {
            id:count,
            Name: tableData.rows[count].title,
            Properties: tableData.rows[count].values
        };
        count++;
        return tempMember;
    });
    return members;
}