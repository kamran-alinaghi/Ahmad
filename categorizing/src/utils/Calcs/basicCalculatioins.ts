import { GetPairList, Point, type Members } from "./Members";

/**
 * Finds the closest pair of Members based on the given method
 */
export function FindClosestMembers(
  memberList: Members[],
  method: string
): Point | null {
  const pairList = GetPairList(memberList);

  let minValue = 0;
  let minIndex = -1;

  for (let i = 0; i < pairList.length; i++) {
    const tempValue = memberList[pairList[i].X].CompareWith(
      memberList[pairList[i].Y],
      method
    );

    if (i === 0) {
      minValue = tempValue;
      minIndex = 0;
    } else if (tempValue < minValue) {
      minValue = tempValue;
      minIndex = i;
    }
  }

  if (minIndex > -1) {
    return {
      X: pairList[minIndex].X,
      Y: pairList[minIndex].Y,
      Value: minValue
    };
  }

  return null;
}


/**
 * Finds the second closest member to the current pair
 */
export function FindSecondClosestMember(
  memberList: Members[],
  method: string,
  currentMembers: Point | null
): Point | null {
  let minValue = 0;
  let minIndex = -1;
  let firstAssign = true;

  if (currentMembers) {
    for (let i = 0; i < memberList.length; i++) {
      if (i !== currentMembers.X && i !== currentMembers.Y) {
        const tempValue = memberList[currentMembers.X].CompareWith(
          memberList[i],
          method
        );

        if (firstAssign) {
          minValue = tempValue;
          minIndex = i;
          firstAssign = false;
        } else if (tempValue < minValue) {
          minValue = tempValue;
          minIndex = i;
        }
      }
    }

    if (minIndex > -1) {
      return {
        X:currentMembers.X,
        Y: minIndex,
        Value: minValue
      };
    }
  }

  return null;
}


export function RearrangeInstances(
  instanceList: Members[],
  indexes: Point | null
): void {
  if (indexes) {
    for (
      let i = 0;
      i < instanceList[indexes.Y].Members.length;
      i++
    ) {
      instanceList[indexes.X].Members.push(
        instanceList[indexes.Y].Members[i]
      );
    }

    instanceList.splice(indexes.Y, 1);
  }
}
