import { User } from "../types/User";
import { client } from "../utils/fetchClient";

export const getCurrentUser = (token: string) => {
  return client.get<User>("/user/current-user", token);
};

export const updateUser = (id: number) => {
  
}
