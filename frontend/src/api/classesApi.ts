import { ClassesAPI } from "../types/ClassesAPI";
import { NewCourseEvents } from "../types/newCourseEvent";
import { client } from "../utils/fetchClient";

export const getAllClasses = (token: string) => {
  return client.get('/course-events', token);
};

export const getClass = (classId: number, token: string): Promise<ClassesAPI | undefined> => {
  return  client.get(`/course-events/${classId}`, token)
};

export const createClass = (data: NewCourseEvents, token: string) => {
  return client.post('/course-events', data, token);
};

export const deleteClass = (classId: number, token: string) => {
  return client.delete(`/course-events/${classId}`, token);
}; 

export const updateClass = (classId: number, updatedClass: ClassesAPI, token: string) => {
  return client.put(`/course-events/${classId}`, updatedClass, token);
};