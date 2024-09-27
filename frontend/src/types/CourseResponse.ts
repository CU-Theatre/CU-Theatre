import { RoadmapItem } from "./RoadmapItem";

export type CourseResponse = {
  id: number;
  name: string;
  description: string;
  status: "IN_PROGRESS" | "NOT_STARTED";
  startDate: Date;
  finishDate?: Date;
  image: string;
  icon: string;
  roadMaps: RoadmapItem[];
  usersId: null | number[];
};
