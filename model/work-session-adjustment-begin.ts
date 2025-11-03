export interface WorkSessionAdjustmentBeginBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionAdjustmentBegin {
  id: string;
  workSessionId: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
  dateStart: string;
  timeStart: string;
  remark: string | null;
  dateComplete: string | null;
  timeComplete: string | null;
  status: number;
}

export interface WorkSessionAdjustmentBeginResponse {
  workSessionAdjustmentBegin: WorkSessionAdjustmentBegin;
}

export interface CompleteWorkSessionAdjustmentBegin {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface WorkSessionAdjustmentBeginByWsId {
  id: string;
  workSessionId: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
  dateStart: string;
  timeStart: string;
  remark: string | null;
  dateComplete: string | null;
  timeComplete: string | null;
  status: number;
}

export interface WorkSessionAdjustmentBeginListResponse {
  workSessionAdjustmentBegins: WorkSessionAdjustmentBeginByWsId[];
}
