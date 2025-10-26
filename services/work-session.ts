import {
  PostWorkSessionResponse,
  WorkSessionByIdResponse,
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

const getWorkSessionById = async (
  workSessionId: String
): Promise<WorkSessionByIdResponse> => {
  const response = await httpClient.post<WorkSessionByIdResponse>({
    url: `${apiLinks.worksession.getById}/${workSessionId}`,
  });

  return response.data;
};

const workSessionServices = {
  createWorkSession,
  getWorkSessionById,
};

export default workSessionServices;
