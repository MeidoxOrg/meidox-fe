import {
  CompleteReasonForStoppingNoOperator,
  ReasonForStoppingNoOperatorBody,
  ReasonForStoppingNoOperatorListResponse,
  ReasonForStoppingNoOperatorResponse,
} from "@/model/reason-for-stopping-no-operator​";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createReasonForStoppingNoOperator = async (
  data: ReasonForStoppingNoOperatorBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.reasonForStoppingNoOperator.create,
    data: data,
  });

  return response.data;
};

const getReasonForStoppingNoOperatorId = async (
  ReasonForStoppingNoOperatorId: String
): Promise<ReasonForStoppingNoOperatorResponse> => {
  const response = await httpClient.get<ReasonForStoppingNoOperatorResponse>({
    url: `${apiLinks.reasonForStoppingNoOperator.getReasonForStoppingNoOperatorById}/${ReasonForStoppingNoOperatorId}`,
  });

  return response.data;
};

const updateReasonForStoppingNoOperatorRemark = async (
  ReasonForStoppingNoOperatorId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingNoOperator
      .updateReasonForStoppingNoOperatorRemark,
    data: {
      id: ReasonForStoppingNoOperatorId,
      remark: remark,
    },
  });

  return response.data;
};

const completeReasonForStoppingNoOperator = async (
  completeBody: CompleteReasonForStoppingNoOperator
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingNoOperator
      .completeReasonForStoppingNoOperator,
    data: completeBody,
  });

  return response.data;
};

const getReasonForStoppingNoOperatorByWsId = async (
  workSessionId: String
): Promise<ReasonForStoppingNoOperatorListResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingNoOperatorListResponse>({
      url: `${apiLinks.reasonForStoppingNoOperator.getReasonForStoppingNoOperatorByWsId}/${workSessionId}`,
    });

  return response.data;
};

const reasonForStoppingNoOperatorServies = {
  createReasonForStoppingNoOperator,
  getReasonForStoppingNoOperatorId,
  updateReasonForStoppingNoOperatorRemark,
  completeReasonForStoppingNoOperator,
  getReasonForStoppingNoOperatorByWsId,
};

export default reasonForStoppingNoOperatorServies;
