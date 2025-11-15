import {
  CreateMachine,
  MachinePagination,
  MachineResponse,
  UpdateMachineNumber,
  UpdateStandardCapacityQuantity,
} from "@/model/machines";
import { PostAPIResponse } from "@/model/work-session";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const getMachinesData = async (): Promise<MachineResponse> => {
  const response = await httpClient.get<MachineResponse>({
    url: apiLinks.machines.getMachines,
  });

  return response.data;
};

const getMachinesPaginationData = async (
  pagination: MachinePagination
): Promise<MachineResponse> => {
  const response = await httpClient.get<MachineResponse>({
    url: apiLinks.machines.getMachines,
    params: pagination,
  });

  return response.data;
};

const createMachine = async (body: CreateMachine): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: `${apiLinks.machines.createMachines}`,
    data: body,
  });

  return response.data;
};

const updateMachineNumber = async (
  body: UpdateMachineNumber
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: `${apiLinks.machines.updateMachineNumber}`,
    data: body,
  });

  return response.data;
};

const updateStandardCapacityQuantity = async (
  body: UpdateStandardCapacityQuantity
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: `${apiLinks.machines.updateStandardCapacityQuantity}`,
    data: body,
  });

  return response.data;
};

const deleteMachine = async (id: string): Promise<PostAPIResponse> => {
  const response = await httpClient.delete<PostAPIResponse>({
    url: `${apiLinks.machines.deleteMachine}/${id}`,
  });

  return response.data;
};

const machinesServices = {
  getMachinesData,
  getMachinesPaginationData,
  createMachine,
  updateMachineNumber,
  updateStandardCapacityQuantity,
  deleteMachine,
};

export default machinesServices;
