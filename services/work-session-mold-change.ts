import { PostAPIResponse } from "@/model/work-session";
import { WorkSessionMoldChangeBody } from "@/model/work-session-mold-change";
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

const workSessionMoldChangeServies = {
  createWorkSessionMoldChange,
};

export default workSessionMoldChangeServies;
