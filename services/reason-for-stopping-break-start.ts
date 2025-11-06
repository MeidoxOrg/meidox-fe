import {
  CompleteReasonForStoppingBreakStart,
  ReasonForStoppingBreakStartBody,
  ReasonForStoppingBreakStartListResponse,
  ReasonForStoppingBreakStartResponse,
} from "@/model/reason-for-stopping-break-start";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createReasonForStoppingBreakStart = async (
  data: ReasonForStoppingBreakStartBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.reasonForStoppingBreakStart.create,
    data: data,
  });

  return response.data;
};

const getReasonForStoppingBreakStartId = async (
  ReasonForStoppingBreakStartId: String
): Promise<ReasonForStoppingBreakStartResponse> => {
  const response = await httpClient.get<ReasonForStoppingBreakStartResponse>({
    url: `${apiLinks.reasonForStoppingBreakStart.getReasonForStoppingBreakStartById}/${ReasonForStoppingBreakStartId}`,
  });

  return response.data;
};

const updateReasonForStoppingBreakStartRemark = async (
  ReasonForStoppingBreakStartId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingBreakStart
      .updateReasonForStoppingBreakStartRemark,
    data: {
      id: ReasonForStoppingBreakStartId,
      remark: remark,
    },
  });

  return response.data;
};

const completeReasonForStoppingBreakStart = async (
  completeBody: CompleteReasonForStoppingBreakStart
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingBreakStart
      .completeReasonForStoppingBreakStart,
    data: completeBody,
  });

  return response.data;
};

const getReasonForStoppingBreakStartByWsId = async (
  workSessionId: String
): Promise<ReasonForStoppingBreakStartListResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingBreakStartListResponse>({
      url: `${apiLinks.reasonForStoppingBreakStart.getReasonForStoppingBreakStartByWsId}/${workSessionId}`,
    });

  return response.data;
};

const reasonForStoppingBreakStartServies = {
  createReasonForStoppingBreakStart,
  getReasonForStoppingBreakStartId,
  updateReasonForStoppingBreakStartRemark,
  completeReasonForStoppingBreakStart,
  getReasonForStoppingBreakStartByWsId,
};

export default reasonForStoppingBreakStartServies;
