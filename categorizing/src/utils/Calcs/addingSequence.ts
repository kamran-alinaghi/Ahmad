import { addAvgSequence, addWardSequence } from "../../redux/calcSlice";
import type { AppDispatch } from "../../redux/store";
import type { Members, Point } from "./Members";

export class AddingSequence {
  MembersToAdd: number[];   // Members that are supposed to go to a subgroup
  SubGroup: number[];       // The subgroup that is selected to accept a member
  FirstDistance: number;
  SecondOption?: number[];  // optional
  SecondDistance?: number;  // optional

  constructor() {
    this.MembersToAdd = [];
    this.SubGroup = [];
    this.FirstDistance = 0;
    this.SecondOption = [];
    this.SecondDistance = 0;
  }
}



export function AddToSequence(
  dispatch: AppDispatch,
  members: Members[],
  firstCloseMember: Point,
  secondCloseMember: Point | null,
  method: "ward" | "average"
): void {
  const tempStep = new AddingSequence();

  tempStep.SubGroup =
    members[firstCloseMember.Y].GetIds() ?? [];

  tempStep.MembersToAdd =
    members[firstCloseMember.X].GetIds() ?? [];

  tempStep.FirstDistance = firstCloseMember.Value ?? 0;

  if (secondCloseMember) {
    tempStep.SecondOption =
      members[secondCloseMember.Y].GetIds() ?? [];
    tempStep.SecondDistance =
      secondCloseMember.Value ?? 0;
  }

  if (method === "ward") {
    dispatch(addWardSequence(tempStep));
  } else {
    dispatch(addAvgSequence(tempStep));
  }
}
