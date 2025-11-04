export interface WorkSessionProductionPrepCheckBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionProductionPrepCheck {
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

export interface WorkSessionProductionPrepCheckResponse {
  workSessionProductionPrepCheck: WorkSessionProductionPrepCheck;
}

export interface CompleteWorkSessionProductionPrepCheck {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface WorkSessionProductionPrepCheckByWsId {
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

export interface WorkSessionProductionPrepCheckListResponse {
  workSessionProductionPrepChecks: WorkSessionProductionPrepCheckByWsId[];
}
