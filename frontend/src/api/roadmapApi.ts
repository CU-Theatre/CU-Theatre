import { ServerRoadmapItem, ServerRoadmapItemSend } from "../types/ServerRoadmapItem";
import { client } from "../utils/fetchClient";

export const addToRoadmap = (data: ServerRoadmapItemSend, token: string) => {
  return client.post<ServerRoadmapItem>("/roadmaps/add", data, token);
};

