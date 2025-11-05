export interface WorkSessionOtherStopBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionOtherStop {
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

export interface WorkSessionOtherStopResponse {
  workSessionOtherStop: WorkSessionOtherStop;
}

export interface CompleteWorkSessionOtherStop {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface WorkSessionOtherStopByWsId {
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

export interface WorkSessionOtherStopListResponse {
  workSessionOtherStops: WorkSessionOtherStopByWsId[];
}
