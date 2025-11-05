import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSessionEquipmentRepair,
  WorkSessionEquipmentRepairBody,
  WorkSessionEquipmentRepairListResponse,
  WorkSessionEquipmentRepairResponse,
} from "@/model/work-session-equipment-repair​";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionEquipmentRepair = async (
  data: WorkSessionEquipmentRepairBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionEquipmentRepair.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionEquipmentRepairId = async (
  workSessionEquipmentRepairId: String
): Promise<WorkSessionEquipmentRepairResponse> => {
  const response = await httpClient.get<WorkSessionEquipmentRepairResponse>({
    url: `${apiLinks.workSessionEquipmentRepair.getWorkSessionEquipmentRepairById}/${workSessionEquipmentRepairId}`,
  });

  return response.data;
};

const updateWorkSessionEquipmentRepairRemark = async (
  workSessionEquipmentRepairId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionEquipmentRepair
      .updateWorkSessionEquipmentRepairRemark,
    data: {
      id: workSessionEquipmentRepairId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionEquipmentRepair = async (
  completeBody: CompleteWorkSessionEquipmentRepair
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionEquipmentRepair.completeWorkSessionEquipmentRepair,
    data: completeBody,
  });

  return response.data;
};

const getWorkSessionEquipmentRepairByWsId = async (
  workSessionId: String
): Promise<WorkSessionEquipmentRepairListResponse> => {
  const response = await httpClient.get<WorkSessionEquipmentRepairListResponse>(
    {
      url: `${apiLinks.workSessionEquipmentRepair.getWorkSessionEquipmentRepairByWsId}/${workSessionId}`,
    }
  );

  return response.data;
};

const workSessionEquipmentRepairServies = {
  createWorkSessionEquipmentRepair,
  getWorkSessionEquipmentRepairId,
  updateWorkSessionEquipmentRepairRemark,
  completeWorkSessionEquipmentRepair,
  getWorkSessionEquipmentRepairByWsId,
};

export default workSessionEquipmentRepairServies;
