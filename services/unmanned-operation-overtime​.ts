import {
  EndUnmannedOperationOvertime,
  UnmannedOperationOvertimeBody,
  UnmannedOperationOvertimeListResponse,
  UnmannedOperationOvertimeResponse,
} from "@/model/unmanned-operation-overtime​";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createUnmannedOperationOvertimes = async (
  data: UnmannedOperationOvertimeBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedOperationOvertime.create,
    data: data,
  });

  return response.data;
};

const getUnmannedOperationOvertimesId = async (
  UnmannedOperationOvertimesId: String
): Promise<UnmannedOperationOvertimeResponse> => {
  const response = await httpClient.get<UnmannedOperationOvertimeResponse>({
    url: `${apiLinks.workSessionUnmannedOperationOvertime.getUnmannedOperationOvertimeById}/${UnmannedOperationOvertimesId}`,
  });

  return response.data;
};

const updateUnmannedOperationOvertimesRemark = async (
  UnmannedOperationOvertimesId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedOperationOvertime
      .updateUnmannedOperationOvertimeRemark,
    data: {
      id: UnmannedOperationOvertimesId,
      remark: remark,
    },
  });

  return response.data;
};

const endUnmannedOperationOvertimes = async (
  endBody: EndUnmannedOperationOvertime
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedOperationOvertime
      .endAutoOperationUnmannedOperationOvertime,
    data: endBody,
  });

  return response.data;
};

const getUnmannedOperationOvertimesByWsId = async (
  workSessionId: String
): Promise<UnmannedOperationOvertimeListResponse> => {
  const response = await httpClient.get<UnmannedOperationOvertimeListResponse>({
    url: `${apiLinks.workSessionUnmannedOperationOvertime.getUnmannedOperationOvertimeByWsId}/${workSessionId}`,
  });

  return response.data;
};

const updateCanNo = async (
  UnmannedOperationOvertimesId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedOperationOvertime
      .updateCanNoUnmannedOperationOvertime,
    data: {
      id: UnmannedOperationOvertimesId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const updateLotEnd = async (
  UnmannedOperationOvertimesId: String,
  lotEnd: Boolean
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedOperationOvertime
      .updateLotEndUnmannedOperationOvertime,
    data: {
      id: UnmannedOperationOvertimesId,
      lotEnd: lotEnd,
    },
  });

  return response.data;
};

const updateNumberOfGoodProducts = async (
  UnmannedOperationOvertimesId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedOperationOvertime
      .udpateNumberOfGoodProducts,
    data: {
      id: UnmannedOperationOvertimesId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const updateUnmannedTime = async (
  UnmannedOperationOvertimesId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionUnmannedOperationOvertime.udpateUnmannedTime,
    data: {
      id: UnmannedOperationOvertimesId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const unmannedOperationOvertimesServies = {
  createUnmannedOperationOvertimes,
  getUnmannedOperationOvertimesId,
  updateUnmannedOperationOvertimesRemark,
  getUnmannedOperationOvertimesByWsId,
  endUnmannedOperationOvertimes,
  updateLotEnd,
  updateCanNo,
  updateNumberOfGoodProducts,
  updateUnmannedTime,
};

export default unmannedOperationOvertimesServies;
