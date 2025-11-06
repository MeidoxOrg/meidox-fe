import {
  CompleteReasonForStoppingOtherPlannedStopStart,
  ReasonForStoppingOtherPlannedStopStartBody,
  ReasonForStoppingOtherPlannedStopStartListResponse,
  ReasonForStoppingOtherPlannedStopStartResponse,
} from "@/model/reason-for-stopping-other-planned-stop-start";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createReasonForStoppingOtherPlannedStopStart = async (
  data: ReasonForStoppingOtherPlannedStopStartBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.reasonForStoppingOtherPlannedStopStart.create,
    data: data,
  });

  return response.data;
};

const getReasonForStoppingOtherPlannedStopStartId = async (
  ReasonForStoppingOtherPlannedStopStartId: String
): Promise<ReasonForStoppingOtherPlannedStopStartResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingOtherPlannedStopStartResponse>({
      url: `${apiLinks.reasonForStoppingOtherPlannedStopStart.getReasonForStoppingOtherPlannedStopStartById}/${ReasonForStoppingOtherPlannedStopStartId}`,
    });

  return response.data;
};

const updateReasonForStoppingOtherPlannedStopStartRemark = async (
  ReasonForStoppingOtherPlannedStopStartId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingOtherPlannedStopStart
      .updateReasonForStoppingOtherPlannedStopStartRemark,
    data: {
      id: ReasonForStoppingOtherPlannedStopStartId,
      remark: remark,
    },
  });

  return response.data;
};

const completeReasonForStoppingOtherPlannedStopStart = async (
  completeBody: CompleteReasonForStoppingOtherPlannedStopStart
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingOtherPlannedStopStart
      .completeReasonForStoppingOtherPlannedStopStart,
    data: completeBody,
  });

  return response.data;
};

const getReasonForStoppingOtherPlannedStopStartByWsId = async (
  workSessionId: String
): Promise<ReasonForStoppingOtherPlannedStopStartListResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingOtherPlannedStopStartListResponse>({
      url: `${apiLinks.reasonForStoppingOtherPlannedStopStart.getReasonForStoppingOtherPlannedStopStartByWsId}/${workSessionId}`,
    });

  return response.data;
};

const reasonForStoppingOtherPlannedStopStartServies = {
  createReasonForStoppingOtherPlannedStopStart,
  getReasonForStoppingOtherPlannedStopStartId,
  updateReasonForStoppingOtherPlannedStopStartRemark,
  completeReasonForStoppingOtherPlannedStopStart,
  getReasonForStoppingOtherPlannedStopStartByWsId,
};

export default reasonForStoppingOtherPlannedStopStartServies;
