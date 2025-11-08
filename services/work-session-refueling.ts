import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSessionRefueling,
  WorkSessionRefuelingBody,
  WorkSessionRefuelingListResponse,
  WorkSessionRefuelingResponse,
} from "@/model/work-session-refueling";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionRefueling = async (
  data: WorkSessionRefuelingBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionRefueling.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionRefuelingId = async (
  workSessionRefuelingId: String
): Promise<WorkSessionRefuelingResponse> => {
  const response = await httpClient.get<WorkSessionRefuelingResponse>({
    url: `${apiLinks.workSessionRefueling.getWorkSessionRefuelingById}/${workSessionRefuelingId}`,
  });

  return response.data;
};

const updateWorkSessionRefuelingRemark = async (
  workSessionRefuelingId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionRefueling.updateWorkSessionRefuelingRemark,
    data: {
      id: workSessionRefuelingId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionRefueling = async (
  completeBody: CompleteWorkSessionRefueling
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionRefueling.completeWorkSessionRefueling,
    data: completeBody,
  });

  return response.data;
};

const getWorkSessionRefuelingByWsId = async (
  workSessionId: String
): Promise<WorkSessionRefuelingListResponse> => {
  const response = await httpClient.get<WorkSessionRefuelingListResponse>({
    url: `${apiLinks.workSessionRefueling.getWorkSessionRefuelingByWsId}/${workSessionId}`,
  });

  return response.data;
};

const updateFuelAmount = async (
  workSessionRefuelId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionRefueling.updateFuelAmount,
    data: {
      id: workSessionRefuelId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const updateOilType = async (
  workSessionRefuelId: String,
  oilType: String
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionRefueling.setOilType,
    data: {
      id: workSessionRefuelId,
      oilType: oilType,
    },
  });

  return response.data;
};

const workSessionRefuelingServies = {
  createWorkSessionRefueling,
  getWorkSessionRefuelingId,
  updateWorkSessionRefuelingRemark,
  completeWorkSessionRefueling,
  getWorkSessionRefuelingByWsId,
  updateFuelAmount,
  updateOilType,
};

export default workSessionRefuelingServies;
