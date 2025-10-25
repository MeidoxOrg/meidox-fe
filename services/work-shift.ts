import { WorkShiftResponse } from "@/model/work-shift";
import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const getWorkShiftData = async (): Promise<WorkShiftResponse> => {
  const response = await httpClient.get<WorkShiftResponse>({
    url: apiLinks.workShift.getWorkShift,
  });

  return response.data;
};

const workShiftServices = {
  getWorkShiftData,
};

export default workShiftServices;
