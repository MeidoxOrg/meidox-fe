import { PostAPIResponse } from "@/model/work-session";
import {
  CompleteWorkSessionOtherMachineSupport,
  WorkSessionOtherMachineSupportBody,
  WorkSessionOtherMachineSupportListResponse,
  WorkSessionOtherMachineSupportResponse,
} from "@/model/work-session-other-machine-support";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createWorkSessionOtherMachineSupport = async (
  data: WorkSessionOtherMachineSupportBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.workSessionOtherMachineSupport.create,
    data: data,
  });

  return response.data;
};

const getWorkSessionOtherMachineSupportId = async (
  workSessionOtherMachineSupportId: String
): Promise<WorkSessionOtherMachineSupportResponse> => {
  const response = await httpClient.get<WorkSessionOtherMachineSupportResponse>(
    {
      url: `${apiLinks.workSessionOtherMachineSupport.getWorkSessionOtherMachineSupportById}/${workSessionOtherMachineSupportId}`,
    }
  );

  return response.data;
};

const updateWorkSessionOtherMachineSupportRemark = async (
  workSessionOtherMachineSupportId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionOtherMachineSupport
      .updateWorkSessionOtherMachineSupportRemark,
    data: {
      id: workSessionOtherMachineSupportId,
      remark: remark,
    },
  });

  return response.data;
};

const completeWorkSessionOtherMachineSupport = async (
  completeBody: CompleteWorkSessionOtherMachineSupport
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.workSessionOtherMachineSupport
      .completeWorkSessionOtherMachineSupport,
    data: completeBody,
  });

  return response.data;
};

const getWorkSessionOtherMachineSupportByWsId = async (
  workSessionId: String
): Promise<WorkSessionOtherMachineSupportListResponse> => {
  const response =
    await httpClient.get<WorkSessionOtherMachineSupportListResponse>({
      url: `${apiLinks.workSessionOtherMachineSupport.getWorkSessionOtherMachineSupportByWsId}/${workSessionId}`,
    });

  return response.data;
};

const workSessionOtherMachineSupportServies = {
  createWorkSessionOtherMachineSupport,
  getWorkSessionOtherMachineSupportId,
  updateWorkSessionOtherMachineSupportRemark,
  completeWorkSessionOtherMachineSupport,
  getWorkSessionOtherMachineSupportByWsId,
};

export default workSessionOtherMachineSupportServies;
