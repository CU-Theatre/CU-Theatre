import { User } from "../types/User";
import { client } from "../utils/fetchClient";

export const getCurrentUser = (token: string) => {
  return client.get<User>("/user/current-user", token);
};

export const updateUser = (updatedUser: User, token: string, userId: number) => {
  return client.put<User>(`/user/${userId}`, updatedUser, token);
};