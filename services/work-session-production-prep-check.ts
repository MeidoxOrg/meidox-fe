import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSessionProductionPrepCheck,
  WorkSessionProductionPrepCheckBody,
  WorkSessionProductionPrepCheckListResponse,
  WorkSessionProductionPrepCheckResponse,
} from "@/model/work-session-production-prep-check";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionProductionPrepCheck = async (
  data: WorkSessionProductionPrepCheckBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionProductionPrepCheck.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionProductionPrepCheckId = async (
  WorkSessionProductionPrepCheckId: String
): Promise<WorkSessionProductionPrepCheckResponse> => {
  const response = await httpClient.get<WorkSessionProductionPrepCheckResponse>(
    {
      url: `${apiLinks.workSessionProductionPrepCheck.getWorkSessionProductionPrepCheckById}/${WorkSessionProductionPrepCheckId}`,
    }
  );

  return response.data;
};

const updateWorkSessionProductionPrepCheckRemark = async (
  WorkSessionProductionPrepCheckId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionProductionPrepCheck
      .updateWorkSessionProductionPrepCheckRemark,
    data: {
      id: WorkSessionProductionPrepCheckId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionProductionPrepCheck = async (
  completeBody: CompleteWorkSessionProductionPrepCheck
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionProductionPrepCheck
      .completeWorkSessionProductionPrepCheck,
    data: completeBody,
  });

  return response.data;
};

const getWorkSessionProductionPrepCheckByWsId = async (
  workSessionId: String
): Promise<WorkSessionProductionPrepCheckListResponse> => {
  const response =
    await httpClient.get<WorkSessionProductionPrepCheckListResponse>({
      url: `${apiLinks.workSessionProductionPrepCheck.getWorkSessionProductionPrepCheckByWsId}/${workSessionId}`,
    });

  return response.data;
};

const workSessionProductionPrepCheckServies = {
  createWorkSessionProductionPrepCheck,
  getWorkSessionProductionPrepCheckId,
  updateWorkSessionProductionPrepCheckRemark,
  completeWorkSessionProductionPrepCheck,
  getWorkSessionProductionPrepCheckByWsId,
};

export default workSessionProductionPrepCheckServies;
