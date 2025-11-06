export interface ReasonForStoppingFourSAfterLunchStartBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface ReasonForStoppingFourSAfterLunchStart {
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

export interface ReasonForStoppingFourSAfterLunchStartResponse {
  reasonForStoppingFourSAfterLunchStart: ReasonForStoppingFourSAfterLunchStart;
}

export interface CompleteReasonForStoppingFourSAfterLunchStart {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface ReasonForStoppingFourSAfterLunchStartByWsId {
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

export interface ReasonForStoppingFourSAfterLunchStartListResponse {
  reasonForStoppingFourSAfterLunchStarts: ReasonForStoppingFourSAfterLunchStartByWsId[];
}
