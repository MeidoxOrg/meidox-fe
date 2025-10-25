import { MachineResponse } from "@/model/machines";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const getMachinesData = async (): Promise<MachineResponse> => {
  const response = await httpClient.get<MachineResponse>({
    url: apiLinks.machines.getMachines,
  });

  return response.data;
};

const machinesServices = {
  getMachinesData,
};

export default machinesServices;
