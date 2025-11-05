export interface WorkSessionQualityCheckBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionQualityCheck {
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

export interface WorkSessionQualityCheckResponse {
  workSessionQualityCheck: WorkSessionQualityCheck;
}

export interface CompleteWorkSessionQualityCheck {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface WorkSessionQualityCheckByWsId {
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

export interface WorkSessionQualityCheckListResponse {
  workSessionQualityChecks: WorkSessionQualityCheckByWsId[];
}
