import { CourseResponse } from "../types/CourseResponse";
import { CreationCourseFormType } from "../types/CreationCourseFormType";
import { client } from "../utils/fetchClient";

export const createCourse = (
  data: Omit<CreationCourseFormType, "roadmap" | "classTime">,
  token: string
) => {
  return client.post<CourseResponse>("/courses/create", data, token);
};

export const getAllCourse = (token: string) => {
  return client.get<CourseResponse[]>("/courses/all", token);
};

export const courseSubscribe = (courseId: number, token: string) => {
  return client.post<CourseResponse>(`/courses/add/${courseId}`,null, token);
};