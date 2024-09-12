import { RoadmapItem } from "./Rodmap"

export type CourseResponse = {
  id: number
  name: string
  description: string
  status: 'IN_PROGRESS'
  startDate: Date
  image: string
  roadMaps: RoadmapItem[];
  usersId: null | number[];
}