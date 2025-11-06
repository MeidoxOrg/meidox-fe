import {
  CompleteReasonForStoppingFourSAfterLunchStart,
  ReasonForStoppingFourSAfterLunchStartBody,
  ReasonForStoppingFourSAfterLunchStartListResponse,
  ReasonForStoppingFourSAfterLunchStartResponse,
} from "@/model/reason-for-stopping-four-s-after-lunchStart​";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createReasonForStoppingFourSAfterLunchStart = async (
  data: ReasonForStoppingFourSAfterLunchStartBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.reasonForStoppingFourSAfterLunchStart.create,
    data: data,
  });

  return response.data;
};

const getReasonForStoppingFourSAfterLunchStartId = async (
  ReasonForStoppingFourSAfterLunchStartId: String
): Promise<ReasonForStoppingFourSAfterLunchStartResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingFourSAfterLunchStartResponse>({
      url: `${apiLinks.reasonForStoppingFourSAfterLunchStart.getReasonForStoppingFourSAfterLunchStartById}/${ReasonForStoppingFourSAfterLunchStartId}`,
    });

  return response.data;
};

const updateReasonForStoppingFourSAfterLunchStartRemark = async (
  ReasonForStoppingFourSAfterLunchStartId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingFourSAfterLunchStart
      .updateReasonForStoppingFourSAfterLunchStartRemark,
    data: {
      id: ReasonForStoppingFourSAfterLunchStartId,
      remark: remark,
    },
  });

  return response.data;
};

const completeReasonForStoppingFourSAfterLunchStart = async (
  completeBody: CompleteReasonForStoppingFourSAfterLunchStart
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingFourSAfterLunchStart
      .completeReasonForStoppingFourSAfterLunchStart,
    data: completeBody,
  });

  return response.data;
};

const getReasonForStoppingFourSAfterLunchStartByWsId = async (
  workSessionId: String
): Promise<ReasonForStoppingFourSAfterLunchStartListResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingFourSAfterLunchStartListResponse>({
      url: `${apiLinks.reasonForStoppingFourSAfterLunchStart.getReasonForStoppingFourSAfterLunchStartByWsId}/${workSessionId}`,
    });

  return response.data;
};

const reasonForStoppingFourSAfterLunchStartServies = {
  createReasonForStoppingFourSAfterLunchStart,
  getReasonForStoppingFourSAfterLunchStartId,
  updateReasonForStoppingFourSAfterLunchStartRemark,
  completeReasonForStoppingFourSAfterLunchStart,
  getReasonForStoppingFourSAfterLunchStartByWsId,
};

export default reasonForStoppingFourSAfterLunchStartServies;
