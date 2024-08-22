import { LoginData, LoginResponse } from "../types/LogInTypes";
import { client } from "../utils/fetchClient";


export const logIn = (data: LoginData) => {
  return client.post<LoginResponse>("/auth/login", data);
};
