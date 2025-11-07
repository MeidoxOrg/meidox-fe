export interface WorkSessionAbnormalHandlingBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionAbnormalHandling {
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
  fuelAmount: string;
}

export interface WorkSessionAbnormalHandlingResponse {
  workSessionAbnormalHandling: WorkSessionAbnormalHandling;
}

export interface CompleteWorkSessionAbnormalHandling {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface WorkSessionAbnormalHandlingByWsId {
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
  fuelAmount: string;
}

export interface WorkSessionAbnormalHandlingListResponse {
  workSessionAbnormalHandlings: WorkSessionAbnormalHandlingByWsId[];
}
