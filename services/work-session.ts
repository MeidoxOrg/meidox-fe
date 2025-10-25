import {
  PostWorkSessionResponse,
  WorkSessionParams,
} from "@/model/work-session";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSession = async (
  workSession: WorkSessionParams
): Promise<PostWorkSessionResponse> => {
  const response = await httpClient.post<PostWorkSessionResponse>({
    url: apiLinks.worksession.create,
    data: workSession,
  });

  return response.data;
};

const workSessionServices = {
  createWorkSession,
};

export default workSessionServices;
