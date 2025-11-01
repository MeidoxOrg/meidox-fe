import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSessionMoldChange,
  WorkSessionMoldChangeBody,
  WorkSessionMoldChangeResponse,
} from "@/model/work-session-mold-change";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionMoldChange = async (
  data: WorkSessionMoldChangeBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionMoldChange.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionMoldChangeId = async (
  workSessionMoldChnageId: String
): Promise<WorkSessionMoldChangeResponse> => {
  const response = await httpClient.get<WorkSessionMoldChangeResponse>({
    url: `${apiLinks.workSessionMoldChange.getWorkSessionMoldChangeById}/${workSessionMoldChnageId}`,
  });

  return response.data;
};

const updateWorkSessionMoldChangeRemark = async (
  workSessionMoldChangeId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionMoldChange.updateWorkSessionMoldChange,
    data: {
      id: workSessionMoldChangeId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionSetup = async (
  completeBody: CompleteWorkSessionMoldChange
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionMoldChange.completeWorkSessionMoldChange,
    data: completeBody,
  });

  return response.data;
};

const workSessionMoldChangeServies = {
  createWorkSessionMoldChange,
  getWorkSessionMoldChangeId,
  updateWorkSessionMoldChangeRemark,
  completeWorkSessionSetup,
};

export default workSessionMoldChangeServies;
