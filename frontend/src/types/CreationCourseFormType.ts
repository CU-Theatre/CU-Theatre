import { RoadmapItem } from "./Rodmap";
import { ServerRoadmapItem } from "./ServerRoadmapItem";

export type CreationCourseFormType = {
  name: string;
  description: string;
  startDate: string;
  finishDate: string;
  icon: string;
  price: number;
  image: string;
  roadmap: Omit<ServerRoadmapItem, "id">[];
};