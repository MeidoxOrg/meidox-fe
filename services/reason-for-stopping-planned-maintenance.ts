import {
  CompleteReasonForStoppingPlannedMaintenance,
  ReasonForStoppingPlannedMaintenanceBody,
  ReasonForStoppingPlannedMaintenanceListResponse,
  ReasonForStoppingPlannedMaintenanceResponse,
} from "@/model/reason-for-stopping-planned-maintenance";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createReasonForStoppingPlannedMaintenance = async (
  data: ReasonForStoppingPlannedMaintenanceBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.reasonForStoppingPlannedMaintenance.create,
    data: data,
  });

  return response.data;
};

const getReasonForStoppingPlannedMaintenanceId = async (
  ReasonForStoppingPlannedMaintenanceId: String
): Promise<ReasonForStoppingPlannedMaintenanceResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingPlannedMaintenanceResponse>({
      url: `${apiLinks.reasonForStoppingPlannedMaintenance.getReasonForStoppingPlannedMaintenanceById}/${ReasonForStoppingPlannedMaintenanceId}`,
    });

  return response.data;
};

const updateReasonForStoppingPlannedMaintenanceRemark = async (
  ReasonForStoppingPlannedMaintenanceId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingPlannedMaintenance
      .updateReasonForStoppingPlannedMaintenanceRemark,
    data: {
      id: ReasonForStoppingPlannedMaintenanceId,
      remark: remark,
    },
  });

  return response.data;
};

const completeReasonForStoppingPlannedMaintenance = async (
  completeBody: CompleteReasonForStoppingPlannedMaintenance
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.reasonForStoppingPlannedMaintenance
      .completeReasonForStoppingPlannedMaintenance,
    data: completeBody,
  });

  return response.data;
};

const getReasonForStoppingPlannedMaintenanceByWsId = async (
  workSessionId: String
): Promise<ReasonForStoppingPlannedMaintenanceListResponse> => {
  const response =
    await httpClient.get<ReasonForStoppingPlannedMaintenanceListResponse>({
      url: `${apiLinks.reasonForStoppingPlannedMaintenance.getReasonForStoppingPlannedMaintenanceByWsId}/${workSessionId}`,
    });

  return response.data;
};

const reasonForStoppingPlannedMaintenanceServies = {
  createReasonForStoppingPlannedMaintenance,
  getReasonForStoppingPlannedMaintenanceId,
  updateReasonForStoppingPlannedMaintenanceRemark,
  completeReasonForStoppingPlannedMaintenance,
  getReasonForStoppingPlannedMaintenanceByWsId,
};

export default reasonForStoppingPlannedMaintenanceServies;
