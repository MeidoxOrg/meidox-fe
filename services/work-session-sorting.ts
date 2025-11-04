import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSessionSorting,
  WorkSessionSortingBody,
  WorkSessionSortingListResponse,
  WorkSessionSortingResponse,
} from "@/model/work-session-sorting";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionSorting = async (
  data: WorkSessionSortingBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionSorting.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionSortingId = async (
  workSessionSortingId: String
): Promise<WorkSessionSortingResponse> => {
  const response = await httpClient.get<WorkSessionSortingResponse>({
    url: `${apiLinks.workSessionSorting.getWorkSessionSortingById}/${workSessionSortingId}`,
  });

  return response.data;
};

const updateWorkSessionSortingRemark = async (
  workSessionSortingId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionSorting.updateWorkSessionSortingRemark,
    data: {
      id: workSessionSortingId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionSorting = async (
  completeBody: CompleteWorkSessionSorting
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionSorting.completeWorkSessionSorting,
    data: completeBody,
  });

  return response.data;
};

const getWorkSessionSortingByWsId = async (
  workSessionId: String
): Promise<WorkSessionSortingListResponse> => {
  const response = await httpClient.get<WorkSessionSortingListResponse>({
    url: `${apiLinks.workSessionSorting.getWorkSessionSortingByWsId}/${workSessionId}`,
  });

  return response.data;
};

const workSessionSortingServies = {
  createWorkSessionSorting,
  getWorkSessionSortingId,
  updateWorkSessionSortingRemark,
  completeWorkSessionSorting,
  getWorkSessionSortingByWsId,
};

export default workSessionSortingServies;
