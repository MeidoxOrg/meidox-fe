export interface ReasonForStoppingBreakStartBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface ReasonForStoppingBreakStart {
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

export interface ReasonForStoppingBreakStartResponse {
  reasonForStoppingBreakStart: ReasonForStoppingBreakStart;
}

export interface CompleteReasonForStoppingBreakStart {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface ReasonForStoppingBreakStartByWsId {
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

export interface ReasonForStoppingBreakStartListResponse {
  reasonForStoppingBreakStarts: ReasonForStoppingBreakStartByWsId[];
}
