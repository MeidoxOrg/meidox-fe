import { LogServer } from "@/model/log-server";
import { PostAPIResponse } from "@/model/work-session";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createLog = async (body: LogServer): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: `${apiLinks.logServer.createLog}`,
    data: body,
  });

  return response.data;
};

const logServices = { createLog };

export default logServices;
