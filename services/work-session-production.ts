import { PostAPIResponse } from "@/model/work-session";
import { WorkSessionProductionBody } from "@/model/work-session-production";
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

const workSessionProduction = {
  createWorkSessionProduction,
};

export default workSessionProduction;
