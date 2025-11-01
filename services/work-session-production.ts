import { PostAPIResponse } from "@/model/work-session";
import { WorkSessionMoldChangeListResponse } from "@/model/work-session-mold-change";
import {
  CompleteWorkSessionProduction,
  WorkSessionProductionBody,
  WorkSessionProductionResponse,
  WorkSessionProductionsByWsIdResponse,
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

const updateNumberOfGoodProduct = async (
  workSessionProductionId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionProduction.updateNumberOfGoodProduct,
    data: {
      id: workSessionProductionId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const updateCanNumber = async (
  workSessionProductionId: String,
  canNumber: String
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionProduction.updateCanNumber,
    data: {
      id: workSessionProductionId,
      canNumber: canNumber,
    },
  });

  return response.data;
};

const updateWorkSessionProductionRemark = async (
  workSessionSetupId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionProduction.updateRemark,
    data: {
      id: workSessionSetupId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionProduction = async (
  completeBody: CompleteWorkSessionProduction
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionProduction.completeWorkSessionProduction,
    data: completeBody,
  });

  return response.data;
};

const pauseWorkSessionProduction = async (
  id: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionProduction.pauseWorkSessionProduction,
    data: {
      id: id,
    },
  });

  return response.data;
};

const getWorkSessionProductionByWsId = async (
  workSessionId: String
): Promise<WorkSessionProductionsByWsIdResponse> => {
  const response = await httpClient.get<WorkSessionProductionsByWsIdResponse>({
    url: `${apiLinks.workSessionProduction.getWorkSessionProductionByWsId}/${workSessionId}`,
  });

  return response.data;
};

const getWorkSessionMoldChangeByWsId = async (
  workSessionId: String
): Promise<WorkSessionMoldChangeListResponse> => {
  const response = await httpClient.get<WorkSessionMoldChangeListResponse>({
    url: `${apiLinks.workSessionMoldChange.getWorkSessionMoldChangeByWsId}/${workSessionId}`,
  });

  return response.data;
};

const workSessionProduction = {
  createWorkSessionProduction,
  getWorkSessionProductionId,
  updateNumberOfGoodProduct,
  updateCanNumber,
  updateWorkSessionProductionRemark,
  completeWorkSessionProduction,
  pauseWorkSessionProduction,
  getWorkSessionProductionByWsId,
  getWorkSessionMoldChangeByWsId,
};

export default workSessionProduction;
