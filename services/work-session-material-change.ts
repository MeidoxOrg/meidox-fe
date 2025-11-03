import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSessionMaterialChange,
  WorkSessionMaterialChangeBody,
  WorkSessionMaterialChangeListResponse,
  WorkSessionMaterialChangeResponse,
} from "@/model/work-session-material-change";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionMaterialChange = async (
  data: WorkSessionMaterialChangeBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionMaterialChange.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionMaterialChangeId = async (
  workSessionMaterialChangeId: String
): Promise<WorkSessionMaterialChangeResponse> => {
  const response = await httpClient.get<WorkSessionMaterialChangeResponse>({
    url: `${apiLinks.workSessionMaterialChange.getWorkSessionMatertialChangeById}/${workSessionMaterialChangeId}`,
  });

  return response.data;
};

const updateWorkSessionMaterialChangeRemark = async (
  workSessionMaterialChangeId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionMaterialChange
      .updateWorkSessionMatertialChangeRemark,
    data: {
      id: workSessionMaterialChangeId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionMaterial = async (
  completeBody: CompleteWorkSessionMaterialChange
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionMaterialChange.completeWorkSessionMatertialChange,
    data: completeBody,
  });

  return response.data;
};

const getWorkSessionMaterialChangeByWsId = async (
  workSessionId: String
): Promise<WorkSessionMaterialChangeListResponse> => {
  const response = await httpClient.get<WorkSessionMaterialChangeListResponse>({
    url: `${apiLinks.workSessionMaterialChange.getWorkSessionMatertialChangeByWsId}/${workSessionId}`,
  });

  return response.data;
};

const workSessionMaterialChangeServies = {
  createWorkSessionMaterialChange,
  getWorkSessionMaterialChangeId,
  updateWorkSessionMaterialChangeRemark,
  completeWorkSessionMaterial,
  getWorkSessionMaterialChangeByWsId,
};

export default workSessionMaterialChangeServies;
