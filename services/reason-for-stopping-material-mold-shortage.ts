import {
  CompleteReasonForStoppingMaterialMoldShortage,
  ReasonForStoppingMaterialMoldShortageBody,
  ReasonForStoppingMaterialMoldShortageListResponse,
  ReasonForStoppingMaterialMoldShortageResponse,
} from "@/model/reason-for-stopping-material-mold-shortage";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createReasonForStoppingMaterialMoldShortage = async (
  data: ReasonForStoppingMaterialMoldShortageBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.reasonForStoppingMaterialMoldShortage.create,
    data: data,
  });

  return response.data;
};

const getReasonForStoppingMaterialMoldShortageId = async (
  ReasonForStoppingMaterialMoldShortageId: String
): Promise<ReasonForStoppingMaterialMoldShortageResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingMaterialMoldShortageResponse>({
      url: `${apiLinks.reasonForStoppingMaterialMoldShortage.getReasonForStoppingMaterialMoldShortageById}/${ReasonForStoppingMaterialMoldShortageId}`,
    });

  return response.data;
};

const updateReasonForStoppingMaterialMoldShortageRemark = async (
  ReasonForStoppingMaterialMoldShortageId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingMaterialMoldShortage
      .updateReasonForStoppingMaterialMoldShortageRemark,
    data: {
      id: ReasonForStoppingMaterialMoldShortageId,
      remark: remark,
    },
  });

  return response.data;
};

const completeReasonForStoppingMaterialMoldShortage = async (
  completeBody: CompleteReasonForStoppingMaterialMoldShortage
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingMaterialMoldShortage
      .completeReasonForStoppingMaterialMoldShortage,
    data: completeBody,
  });

  return response.data;
};

const getReasonForStoppingMaterialMoldShortageByWsId = async (
  workSessionId: String
): Promise<ReasonForStoppingMaterialMoldShortageListResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingMaterialMoldShortageListResponse>({
      url: `${apiLinks.reasonForStoppingMaterialMoldShortage.getReasonForStoppingMaterialMoldShortageByWsId}/${workSessionId}`,
    });

  return response.data;
};

const reasonForStoppingMaterialMoldShortageServies = {
  createReasonForStoppingMaterialMoldShortage,
  getReasonForStoppingMaterialMoldShortageId,
  updateReasonForStoppingMaterialMoldShortageRemark,
  completeReasonForStoppingMaterialMoldShortage,
  getReasonForStoppingMaterialMoldShortageByWsId,
};

export default reasonForStoppingMaterialMoldShortageServies;
