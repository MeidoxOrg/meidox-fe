import {
  CompleteOperationEnd,
  OperationEndBody,
  OperationEndListResponse,
  OperationEndResponse,
} from "@/model/operation-end";
import { PostAPIResponse } from "@/model/work-session";

import apiLinks from "@/utils/api-links";
import httpClient from "@/utils/http-client";

const createOperationEnd = async (
  data: OperationEndBody
): Promise<PostAPIResponse> => {
  const response = await httpClient.post<PostAPIResponse>({
    url: apiLinks.OperationEnd.operationEnd,
    data: data,
  });

  return response.data;
};

const getOperationEndId = async (
  operationEndId: String
): Promise<OperationEndResponse> => {
  const response = await httpClient.get<OperationEndResponse>({
    url: `${apiLinks.OperationEnd.operationEnd}/${operationEndId}`,
  });

  return response.data;
};

const updateOperationEndRemark = async (
  operationEndId: String,
  remark: string
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.OperationEnd.setRemarkOperationEnd,
    data: {
      id: operationEndId,
      remark: remark,
    },
  });

  return response.data;
};

const completeOperationEnd = async (
  endBody: CompleteOperationEnd
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.OperationEnd.completeOperationEnd,
    data: endBody,
  });

  return response.data;
};

const getOperationEndByWsId = async (
  workSessionId: String
): Promise<OperationEndListResponse> => {
  const response = await httpClient.get<OperationEndListResponse>({
    url: `${apiLinks.OperationEnd.getOperationEndsByWsId}/${workSessionId}`,
  });

  return response.data;
};

const updateDisposableItemsPieces = async (
  operationEndId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.OperationEnd.setDisposableItemsPieces,
    data: {
      id: operationEndId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const updateDisposableItemsKg = async (
  operationEndId: String,
  quantity: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.OperationEnd.setDisposableItemsKg,
    data: {
      id: operationEndId,
      quantity: quantity,
    },
  });

  return response.data;
};

const updateFallenItemsKg = async (
  operationEndId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.OperationEnd.setFallenItemsKg,
    data: {
      id: operationEndId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const updateFallenItemsPieces = async (
  operationEndId: String,
  quantiy: Number
): Promise<PostAPIResponse> => {
  const response = await httpClient.put<PostAPIResponse>({
    url: apiLinks.OperationEnd.setFallenItemsPieces,
    data: {
      id: operationEndId,
      quantity: quantiy,
    },
  });

  return response.data;
};

const operationEndServies = {
  createOperationEnd,
  getOperationEndId,
  updateOperationEndRemark,
  getOperationEndByWsId,
  completeOperationEnd,
  updateDisposableItemsPieces,
  updateDisposableItemsKg,
  updateFallenItemsKg,
  updateFallenItemsPieces,
};

export default operationEndServies;
