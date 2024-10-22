  /* eslint-disable @typescript-eslint/no-explicit-any */
  const BASE_URL = "http://localhost:8080/api";

  function wait(delay: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

  type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

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

    return wait(100)
      .then(() => {
        return fetch(BASE_URL + url, options);
      })
      .then(async (response) => {
        if (!response.ok) {
          const res = await response.text();

          console.error("Server error response:", res);

          switch (response.status) {
            case 400:
            case 401:
              throw new Error(res || "Unauthorized");
            case 500:
              throw new Error("Internal Server Error");
            default:
              throw new Error("An unexpected error occurred");
          }
        }

        return response.json();
      });
  }

  // Оновлений об'єкт `client` для запитів
  export const client = {
    get: <T>(url: string, token: string = "") => request<T>(url, token),
    post: <T>(url: string, data: any, token: string = "") =>
      request<T>(url, token, "POST", data),
    patch: <T>(url: string, data: any, token: string = "") =>
      request<T>(url, token, "PATCH", data),
    delete: <T>(url: string, token: string = "") =>
      request<T>(url, token, "DELETE"),
    put: <T>(url: string, data: any, token: string = "") =>
      request<T>(url, token, "PUT", data),
  };
