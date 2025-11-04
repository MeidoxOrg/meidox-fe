import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSession4S,
  WorkSession4SBody,
  WorkSession4SListResponse,
  WorkSession4SResponse,
} from "@/model/work-session-4s";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSession4S = async (
  data: WorkSession4SBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSession4S.create,
    data: data,
  });

  return response.data;
};

const getWorkSession4SId = async (
  workSession4SId: String
): Promise<WorkSession4SResponse> => {
  const response = await httpClient.get<WorkSession4SResponse>({
    url: `${apiLinks.workSession4S.getWorkSession4SById}/${workSession4SId}`,
  });

  return response.data;
};

const updateWorkSession4SRemark = async (
  workSession4SId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSession4S.updateWorkSession4SRemark,
    data: {
      id: workSession4SId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSession4S = async (
  completeBody: CompleteWorkSession4S
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSession4S.completeWorkSession4S,
    data: completeBody,
  });

  return response.data;
};

const getWorkSession4SByWsId = async (
  workSessionId: String
): Promise<WorkSession4SListResponse> => {
  const response = await httpClient.get<WorkSession4SListResponse>({
    url: `${apiLinks.workSession4S.getWorkSession4SByWsId}/${workSessionId}`,
  });

  return response.data;
};

const workSession4SServies = {
  createWorkSession4S,
  getWorkSession4SId,
  updateWorkSession4SRemark,
  completeWorkSession4S,
  getWorkSession4SByWsId,
};

export default workSession4SServies;
