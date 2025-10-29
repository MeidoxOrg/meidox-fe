import { PostAPIResponse } from "@/model/work-session";
import {
  WorkSessionProductionBody,
  WorkSessionProductionResponse,
} from "@/model/work-session-production";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionProduction = async (
  data: WorkSessionProductionBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionProduction.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionProductionId = async (
  workSessionSetupId: String
): Promise<WorkSessionProductionResponse> => {
  const response = await httpClient.get<WorkSessionProductionResponse>({
    url: `${apiLinks.workSessionProduction.getWorkSessionProductionById}/${workSessionSetupId}`,
  });

  return response.data;
};

const workSessionProduction = {
  createWorkSessionProduction,
  getWorkSessionProductionId,
};

export default workSessionProduction;
