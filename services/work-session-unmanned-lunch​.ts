import { PostAPIResponse } from "@/model/work-session";
import {
  EndWorkSessionUnmannedLunch,
  WorkSessionUnmannedLunchBody,
  WorkSessionUnmannedLunchListResponse,
  WorkSessionUnmannedLunchResponse,
} from "@/model/work-session-unmanned-lunch​";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionUnmannedLunch = async (
  data: WorkSessionUnmannedLunchBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedLunch.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionUnmannedLunchId = async (
  workSessionUnmannedLunchId: String
): Promise<WorkSessionUnmannedLunchResponse> => {
  const response = await httpClient.get<WorkSessionUnmannedLunchResponse>({
    url: `${apiLinks.workSessionUnmannedLunch.getUnmannedLunchById}/${workSessionUnmannedLunchId}`,
  });

  return response.data;
};

const updateWorkSessionUnmannedLunchRemark = async (
  workSessionUnmannedLunchId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedLunch.updateUnmannedLunchRemark,
    data: {
      id: workSessionUnmannedLunchId,
      remark: remark,
    },
  });

  return response.data;
};

const endWorkSessionUnmannedLunch = async (
  endBody: EndWorkSessionUnmannedLunch
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedLunch.updateEndAutoOperationUnmannedLunch,
    data: endBody,
  });

  return response.data;
};

const getWorkSessionUnmannedLunchByWsId = async (
  workSessionId: String
): Promise<WorkSessionUnmannedLunchListResponse> => {
  const response = await httpClient.get<WorkSessionUnmannedLunchListResponse>({
    url: `${apiLinks.workSessionUnmannedLunch.getUnmannedLunchByWsId}/${workSessionId}`,
  });

  return response.data;
};

const updateCanNo = async (
  workSessionUnmannedLunchId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedLunch.updateCanNoUnmannedLunch,
    data: {
      id: workSessionUnmannedLunchId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const updateLotEnd = async (
  workSessionUnmannedLunchId: String,
  lotEnd: Boolean
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedLunch.updateLotEndUnmannedLunch,
    data: {
      id: workSessionUnmannedLunchId,
      lotEnd: lotEnd,
    },
  });

  return response.data;
};

const updateNumberOfGoodProducts = async (
  workSessionUnmannedLunchId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedLunch.udpateNumberOfGoodProducts,
    data: {
      id: workSessionUnmannedLunchId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const updateUnmannedTime = async (
  workSessionUnmannedLunchId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedLunch.updateUnmannedLunchRemark,
    data: {
      id: workSessionUnmannedLunchId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const workSessionUnmannedLunchServies = {
  createWorkSessionUnmannedLunch,
  getWorkSessionUnmannedLunchId,
  updateWorkSessionUnmannedLunchRemark,
  getWorkSessionUnmannedLunchByWsId,
  endWorkSessionUnmannedLunch,
  updateLotEnd,
  updateCanNo,
  updateNumberOfGoodProducts,
  updateUnmannedTime,
};

export default workSessionUnmannedLunchServies;
