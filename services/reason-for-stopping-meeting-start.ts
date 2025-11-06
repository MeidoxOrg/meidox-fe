import {
  CompleteReasonForStoppingMeetingStart,
  ReasonForStoppingMeetingStartBody,
  ReasonForStoppingMeetingStartListResponse,
  ReasonForStoppingMeetingStartResponse,
} from "@/model/reason-for-stopping-meeting-start";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createReasonForStoppingMeetingStart = async (
  data: ReasonForStoppingMeetingStartBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.reasonForStoppingMeetingStart.create,
    data: data,
  });

  return response.data;
};

const getReasonForStoppingMeetingStartId = async (
  ReasonForStoppingMeetingStartId: String
): Promise<ReasonForStoppingMeetingStartResponse> => {
  const response = await httpClient.get<ReasonForStoppingMeetingStartResponse>({
    url: `${apiLinks.reasonForStoppingMeetingStart.getReasonForStoppingMeetingStartById}/${ReasonForStoppingMeetingStartId}`,
  });

  return response.data;
};

const updateReasonForStoppingMeetingStartRemark = async (
  ReasonForStoppingMeetingStartId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingMeetingStart
      .updateReasonForStoppingMeetingStartRemark,
    data: {
      id: ReasonForStoppingMeetingStartId,
      remark: remark,
    },
  });

  return response.data;
};

const completeReasonForStoppingMeetingStart = async (
  completeBody: CompleteReasonForStoppingMeetingStart
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingMeetingStart
      .completeReasonForStoppingMeetingStart,
    data: completeBody,
  });

  return response.data;
};

const getReasonForStoppingMeetingStartByWsId = async (
  workSessionId: String
): Promise<ReasonForStoppingMeetingStartListResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingMeetingStartListResponse>({
      url: `${apiLinks.reasonForStoppingMeetingStart.getReasonForStoppingMeetingStartByWsId}/${workSessionId}`,
    });

  return response.data;
};

const reasonForStoppingMeetingStartServies = {
  createReasonForStoppingMeetingStart,
  getReasonForStoppingMeetingStartId,
  updateReasonForStoppingMeetingStartRemark,
  completeReasonForStoppingMeetingStart,
  getReasonForStoppingMeetingStartByWsId,
};

export default reasonForStoppingMeetingStartServies;
