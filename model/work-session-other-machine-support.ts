export interface WorkSessionOtherMachineSupportBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionOtherMachineSupport {
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

export interface WorkSessionOtherMachineSupportResponse {
  workSessionOtherMachineSupport: WorkSessionOtherMachineSupport;
}

export interface CompleteWorkSessionOtherMachineSupport {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface WorkSessionOtherMachineSupportByWsId {
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

export interface WorkSessionOtherMachineSupportListResponse {
  workSessionOtherMachineSupports: WorkSessionOtherMachineSupportByWsId[];
}
