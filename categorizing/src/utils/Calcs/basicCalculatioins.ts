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
    pairList[minIndex].Value = minValue;
    return pairList[minIndex];
  }

  return null;
}


/**
 * Finds the second closest member to the current pair
 */
export function FindSecondClosestMember(
  memberList: Members[],
  method: string,
  currentMembers: Point
): Point | null {
  let minValue = 0;
  let minIndex = -1;
  let firstAssign = true;

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
    const resultPoint = new Point(currentMembers.X, minIndex);
    resultPoint.Value = minValue;
    return resultPoint;
  }

  return null;
}
