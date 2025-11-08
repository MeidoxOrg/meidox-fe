export interface OperationEndBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface OperationEnd {
  id: string;
  workSessionId: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
  dateStart: string;
  timeStart: string;
  remark: string | null;
  disposableItemsPieces: number | null;
  disposableItemsKg: number | null;
  fallenItemsPieces: number | null;
  fallenItemsKg: number | null;
  dateComplete: string | null;
  timeComplete: string | null;
  status: number;
}

export interface OperationEndResponse {
  operationEnd: OperationEnd;
}

export interface CompleteOperationEnd {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface OperationEndByWsId {
  id: string;
  workSessionId: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
  dateStart: string;
  timeStart: string;
  remark: string | null;
  disposableItemsPieces: number | null;
  disposableItemsKg: number | null;
  fallenItemsPieces: number | null;
  fallenItemsKg: number | null;
  dateComplete: string | null;
  timeComplete: string | null;
  status: number;
}

export interface OperationEndListResponse {
  OperationEnds: OperationEndByWsId[];
}
