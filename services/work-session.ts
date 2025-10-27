import {
  PostAPIResponse,
  PostWorkSessionResponse,
  WorkSessionByIdResponse,
  WorkSessionParams,
  WorkSessionSetupBody,
  WorkSessionSetupResponse,
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

const createWorkSessionSetup = async (
  workSessionSetup: WorkSessionSetupBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.worksession.createWorkSessionSetup,
    data: workSessionSetup,
  });

  return response.data;
};

const getWorkSessionSetupId = async (
  workSessionSetupId: String
): Promise<WorkSessionSetupResponse> => {
  const response = await httpClient.get<WorkSessionSetupResponse>({
    url: `${apiLinks.worksession.getWorkSessionSetupById}/${workSessionSetupId}`,
  });

  return response.data;
};

const updateAdjustmentItemUnit = async (
  workSessionSetupId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.worksession.updateAdjustmentItemUnit,
    data: {
      id: workSessionSetupId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const updateAdjustmentItemKg = async (
  workSessionSetupId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.worksession.updateAdjustmentItemKg,
    data: {
      id: workSessionSetupId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const workSessionServices = {
  createWorkSession,
  getWorkSessionById,
  createWorkSessionSetup,
  getWorkSessionSetupId,
  updateAdjustmentItemUnit,
  updateAdjustmentItemKg,
};

export default workSessionServices;
