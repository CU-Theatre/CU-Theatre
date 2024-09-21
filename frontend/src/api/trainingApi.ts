import { CourseEvent } from "../types/CourseEvent"
import { allClasses } from "../utils/allClasses"

export const getAllTraining = () => {
  // TODO make fetch to allClasses 
  return new Promise<CourseEvent[]>(resolve => resolve(allClasses))
}

export const getCurrentTraining = (id: number) => {
  // TODO make fetch to currentTraining 
  return new Promise<CourseEvent | undefined>(resolve => {
    const currentTraining = allClasses.find(training => training.id === id)

    resolve(currentTraining)
  })
}