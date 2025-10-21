import axios, { AxiosResponse, ResponseType } from "axios";
import { getSession } from "next-auth/react";
import apiLinks from "./api-links";

interface Options {
  url: ((al: typeof apiLinks) => string) | string;
  data?: object | string;
  params?: object;
  signal?: AbortSignal;
  contentType?: string;
  responseType?: ResponseType;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";

const getToken = async (): Promise<string | undefined> => {
  try {
    const session = await getSession();
    return (session as any)?.accessToken;
  } catch (error) {
    console.error("Failed to get session token:", error);
    return undefined;
  }
};

const request = async <T = unknown>({
  method,
  url,
  data,
  params,
  signal,
  contentType = "application/json",
  responseType = "json",
}: Options & { method: HttpMethod }): Promise<AxiosResponse<T>> => {
  const token = await getToken();

  return axios.request<T>({
    method,
    url: typeof url === "string" ? url : url(apiLinks),
    data,
    params,
    signal,
    responseType,
    headers: {
      "content-type": contentType,
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
};

const httpClient = {
  request,
  ...(["GET", "POST", "PUT", "DELETE", "OPTIONS"] as const).reduce(
    (acc, method) => {
      acc[method.toLowerCase() as Lowercase<typeof method>] = <T = unknown>(
        options: Options
      ) => request<T>({ ...options, method });
      return acc;
    },
    {} as Record<
      Lowercase<HttpMethod>,
      <T>(options: Options) => Promise<AxiosResponse<T>>
    >
  ),
};

export default httpClient;
