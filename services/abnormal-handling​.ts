import {
  CompleteWorkSessionAbnormalHandling,
  WorkSessionAbnormalHandlingBody,
  WorkSessionAbnormalHandlingListResponse,
  WorkSessionAbnormalHandlingResponse,
} from "@/model/abnormal-handling​";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionAbnormalHandling = async (
  data: WorkSessionAbnormalHandlingBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionAbnormalHandling.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionAbnormalHandlingId = async (
  workSessionAbnormalHandlingId: String
): Promise<WorkSessionAbnormalHandlingResponse> => {
  const response = await httpClient.get<WorkSessionAbnormalHandlingResponse>({
    url: `${apiLinks.workSessionAbnormalHandling.getAbnormalHandlingById}/${workSessionAbnormalHandlingId}`,
  });
  console.log(response.data);
  return response.data;
};

const updateWorkSessionAbnormalHandlingRemark = async (
  workSessionAbnormalHandlingId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionAbnormalHandling.updateAbnormalHandlingRemark,
    data: {
      id: workSessionAbnormalHandlingId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionAbnormalHandling = async (
  completeBody: CompleteWorkSessionAbnormalHandling
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionAbnormalHandling.completeAbnormalHandling,
    data: completeBody,
  });

  return response.data;
};

const getWorkSessionAbnormalHandlingByWsId = async (
  workSessionId: String
): Promise<WorkSessionAbnormalHandlingListResponse> => {
  const response =
    await httpClient.get<WorkSessionAbnormalHandlingListResponse>({
      url: `${apiLinks.workSessionAbnormalHandling.getAbnormalHandlingByWsId}/${workSessionId}`,
    });

  return response.data;
};

const updateAbnormalProductPiecesHandling = async (
  workSessionAbnormalHandlingId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionAbnormalHandling
      .updateAbnormalProductPiecesHandling,
    data: {
      id: workSessionAbnormalHandlingId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const updateAbnormalProductKgHandling = async (
  workSessionAbnormalHandlingId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionAbnormalHandling.updateAbnormalProductKgHandling,
    data: {
      id: workSessionAbnormalHandlingId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const workSessionAbnormalHandlingServies = {
  createWorkSessionAbnormalHandling,
  getWorkSessionAbnormalHandlingId,
  updateWorkSessionAbnormalHandlingRemark,
  completeWorkSessionAbnormalHandling,
  getWorkSessionAbnormalHandlingByWsId,
  updateAbnormalProductPiecesHandling,
  updateAbnormalProductKgHandling,
};

export default workSessionAbnormalHandlingServies;
