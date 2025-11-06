import {
  CompleteReasonForStoppingNoKanbanStart,
  ReasonForStoppingNoKanbanStartBody,
  ReasonForStoppingNoKanbanStartListResponse,
  ReasonForStoppingNoKanbanStartResponse,
} from "@/model/reason-for-stopping-no-kanban";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createReasonForStoppingNoKanbanStart = async (
  data: ReasonForStoppingNoKanbanStartBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.reasonForStoppingNoKanbanStart.create,
    data: data,
  });

  return response.data;
};

const getReasonForStoppingNoKanbanStartId = async (
  ReasonForStoppingNoKanbanStartId: String
): Promise<ReasonForStoppingNoKanbanStartResponse> => {
  const response = await httpClient.get<ReasonForStoppingNoKanbanStartResponse>(
    {
      url: `${apiLinks.reasonForStoppingNoKanbanStart.getReasonForStoppingNoKanbanStartById}/${ReasonForStoppingNoKanbanStartId}`,
    }
  );

  return response.data;
};

const updateReasonForStoppingNoKanbanStartRemark = async (
  ReasonForStoppingNoKanbanStartId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingNoKanbanStart
      .updateReasonForStoppingNoKanbanStartRemark,
    data: {
      id: ReasonForStoppingNoKanbanStartId,
      remark: remark,
    },
  });

  return response.data;
};

const completeReasonForStoppingNoKanbanStart = async (
  completeBody: CompleteReasonForStoppingNoKanbanStart
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingNoKanbanStart
      .completeReasonForStoppingNoKanbanStart,
    data: completeBody,
  });

  return response.data;
};

const getReasonForStoppingNoKanbanStartByWsId = async (
  workSessionId: String
): Promise<ReasonForStoppingNoKanbanStartListResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingNoKanbanStartListResponse>({
      url: `${apiLinks.reasonForStoppingNoKanbanStart.getReasonForStoppingNoKanbanStartByWsId}/${workSessionId}`,
    });

  return response.data;
};

const reasonForStoppingNoKanbanStartServies = {
  createReasonForStoppingNoKanbanStart,
  getReasonForStoppingNoKanbanStartId,
  updateReasonForStoppingNoKanbanStartRemark,
  completeReasonForStoppingNoKanbanStart,
  getReasonForStoppingNoKanbanStartByWsId,
};

export default reasonForStoppingNoKanbanStartServies;
