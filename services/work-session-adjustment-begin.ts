import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSessionAdjustmentBegin,
  WorkSessionAdjustmentBeginBody,
  WorkSessionAdjustmentBeginListResponse,
  WorkSessionAdjustmentBeginResponse,
} from "@/model/work-session-adjustment-begin";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionAdjustmentBegin = async (
  data: WorkSessionAdjustmentBeginBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionAdjustmentBegin.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionAdjustmentBeginId = async (
  workSessionMoldChnageId: String
): Promise<WorkSessionAdjustmentBeginResponse> => {
  const response = await httpClient.get<WorkSessionAdjustmentBeginResponse>({
    url: `${apiLinks.workSessionAdjustmentBegin.getWorkSessionAdjustmentBeginById}/${workSessionMoldChnageId}`,
  });

  return response.data;
};

const updateWorkSessionAdjustmentBeginRemark = async (
  workSessionAdjustmentBeginId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionAdjustmentBegin
      .updateWorkSessionAdjustmentBeginRemark,
    data: {
      id: workSessionAdjustmentBeginId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionSetup = async (
  completeBody: CompleteWorkSessionAdjustmentBegin
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionAdjustmentBegin.completeWorkSessionAdjustmentBegin,
    data: completeBody,
  });

  return response.data;
};

const getWorkSessionAdjustmentBeginByWsId = async (
  workSessionId: String
): Promise<WorkSessionAdjustmentBeginListResponse> => {
  const response = await httpClient.get<WorkSessionAdjustmentBeginListResponse>(
    {
      url: `${apiLinks.workSessionAdjustmentBegin.getWorkSessionAdjustmentBeginByWsId}/${workSessionId}`,
    }
  );

  return response.data;
};

const workSessionAdjustmentBeginServies = {
  createWorkSessionAdjustmentBegin,
  getWorkSessionAdjustmentBeginId,
  updateWorkSessionAdjustmentBeginRemark,
  completeWorkSessionSetup,
  getWorkSessionAdjustmentBeginByWsId,
};

export default workSessionAdjustmentBeginServies;
