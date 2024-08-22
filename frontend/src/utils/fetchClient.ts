import { ErrorResponses } from "../types/ErrorResponses";

/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "http://localhost:8080/api";

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T>(
  url: string,
  token: string = "",
  method: RequestMethod = "GET",
  data: any = null
): Promise<T | ErrorResponses> {
  const options: RequestInit = { method };
  const headers: HeadersInit = {};

  if (data) {
    options.body = JSON.stringify(data);
    headers["Content-Type"] = "application/json; charset=UTF-8";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  options.headers = headers;

  return wait(100)
    .then(() => {
      return fetch(BASE_URL + url, options);
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      if (response.status === 401) {
        return ErrorResponses.Authorization;
      }
      
      throw new Error();
    })
    // .catch((error) => {
    //   // eslint-disable-next-line
    //   console.log(error);
    // });
}

export const client = {
  get: <T>(url: string, token: string = "") => request<T>(url, token),
  post: <T>(url: string, data: any, token: string = "") =>
    request<T>(url, token, "POST", data),
  patch: <T>(url: string, data: any, token: string = "") =>
    request<T>(url, token, "PATCH", data),
  delete: <T>(url: string, token: string = "") =>
    request<T>(url, token, "DELETE"),
};
