import { RoadmapItem, RoadmapItemCreate } from "../types/RoadmapItem";
import { client } from "../utils/fetchClient";

export const addToRoadmap = (data: RoadmapItemCreate, token: string) => {
  return client.post<RoadmapItem>("/roadmaps/add", data, token);
};

