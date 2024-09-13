export interface RoadmapItem {
  id: number;
  mainTitle: string;
  title: string;
  text?: string;
}

export type RoadmapItemCreate = {
  title: string;
  mainTitle: string;
  text?: string;
  courseId: number;
}