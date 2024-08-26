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
): Promise<T> {
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

  if (method === 'GET') {
    options.mode = 'no-cors';
  }

  return wait(100)
    .then(() => {
      return fetch(BASE_URL + url, options);
    })
    .then(async (response) => {
      if (!response.ok) {

        console.log('response', response);
        

        switch (response.status) {
          case 400: {
            const res = await response.text()
            throw new Error(res);
          }
          case 500:
          case 0:
          case 401: {            
            const res = await response.json()
            throw new Error(res.error);
          }

          default:
            throw new Error();
        }
      }

      return response.json();
    });
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
