import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSessionQualityCheck,
  WorkSessionQualityCheckBody,
  WorkSessionQualityCheckListResponse,
  WorkSessionQualityCheckResponse,
} from "@/model/work-session-quality-check";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionQualityCheck = async (
  data: WorkSessionQualityCheckBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionQualityCheck.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionQualityCheckId = async (
  workSessionQualityCheckId: String
): Promise<WorkSessionQualityCheckResponse> => {
  const response = await httpClient.get<WorkSessionQualityCheckResponse>({
    url: `${apiLinks.workSessionQualityCheck.getWorkSessionQualityCheckById}/${workSessionQualityCheckId}`,
  });

  return response.data;
};

const updateWorkSessionQualityCheckRemark = async (
  workSessionQualityCheckId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionQualityCheck.updateWorkSessionQualityCheckRemark,
    data: {
      id: workSessionQualityCheckId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionQualityCheck = async (
  completeBody: CompleteWorkSessionQualityCheck
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionQualityCheck.completeWorkSessionQualityCheck,
    data: completeBody,
  });

  return response.data;
};

const getWorkSessionQualityCheckByWsId = async (
  workSessionId: String
): Promise<WorkSessionQualityCheckListResponse> => {
  const response = await httpClient.get<WorkSessionQualityCheckListResponse>({
    url: `${apiLinks.workSessionQualityCheck.getWorkSessionQualityCheckByWsId}/${workSessionId}`,
  });

  return response.data;
};

const workSessionQualityCheckServies = {
  createWorkSessionQualityCheck,
  getWorkSessionQualityCheckId,
  updateWorkSessionQualityCheckRemark,
  completeWorkSessionQualityCheck,
  getWorkSessionQualityCheckByWsId,
};

export default workSessionQualityCheckServies;
