import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSessionOtherStop,
  WorkSessionOtherStopBody,
  WorkSessionOtherStopListResponse,
  WorkSessionOtherStopResponse,
} from "@/model/work-session-other-stop";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionOtherStop = async (
  data: WorkSessionOtherStopBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionOtherStop.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionOtherStopId = async (
  workSessionOtherStopId: String
): Promise<WorkSessionOtherStopResponse> => {
  const response = await httpClient.get<WorkSessionOtherStopResponse>({
    url: `${apiLinks.workSessionOtherStop.getWorkSessionOtherStopById}/${workSessionOtherStopId}`,
  });

  return response.data;
};

const updateWorkSessionOtherStopRemark = async (
  workSessionOtherStopId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionOtherStop.updateWorkSessionOtherStopRemark,
    data: {
      id: workSessionOtherStopId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionOtherStop = async (
  completeBody: CompleteWorkSessionOtherStop
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionOtherStop.completeWorkSessionOtherStop,
    data: completeBody,
  });

  return response.data;
};

const getWorkSessionOtherStopByWsId = async (
  workSessionId: String
): Promise<WorkSessionOtherStopListResponse> => {
  const response = await httpClient.get<WorkSessionOtherStopListResponse>({
    url: `${apiLinks.workSessionOtherStop.getWorkSessionOtherStopByWsId}/${workSessionId}`,
  });

  return response.data;
};

const workSessionOtherStopServies = {
  createWorkSessionOtherStop,
  getWorkSessionOtherStopId,
  updateWorkSessionOtherStopRemark,
  completeWorkSessionOtherStop,
  getWorkSessionOtherStopByWsId,
};

export default workSessionOtherStopServies;
