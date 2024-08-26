import { LoginData, LoginResponse } from "../types/LogInTypes";
import { SignUpData, SignUpResponse } from "../types/SignUpTypes";
import { client } from "../utils/fetchClient";


export const logIn = (data: LoginData) => {
  return client.post<LoginResponse>("/auth/login", data);
};


export const signUp = (data: SignUpData) => {
  return client.post<SignUpResponse>("/auth/register", data);
};
