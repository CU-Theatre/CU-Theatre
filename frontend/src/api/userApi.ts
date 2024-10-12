import { User } from "../types/User";
import { client } from "../utils/fetchClient";

export const getCurrentUser = (token: string) => {
  return client.get<User>("/user/current-user", token);
};

// TODO finish function
export const updateUser = (updatedUser: User, token: string) => {
  return client.put<User>("/user/update", updatedUser, token);
};