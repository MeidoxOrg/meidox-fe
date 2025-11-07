export interface WorkSessionRefuelingBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionRefueling {
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

export interface WorkSessionRefuelingResponse {
  workSessionRefueling: WorkSessionRefueling;
}

export interface CompleteWorkSessionRefueling {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface WorkSessionRefuelingByWsId {
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

export interface WorkSessionRefuelingListResponse {
  workSessionRefuelings: WorkSessionRefuelingByWsId[];
}
