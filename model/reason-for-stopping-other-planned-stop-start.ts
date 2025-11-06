export interface ReasonForStoppingOtherPlannedStopStartBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface ReasonForStoppingOtherPlannedStopStart {
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

export interface ReasonForStoppingOtherPlannedStopStartResponse {
  reasonForStoppingOtherPlannedStopStart: ReasonForStoppingOtherPlannedStopStart;
}

export interface CompleteReasonForStoppingOtherPlannedStopStart {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface ReasonForStoppingOtherPlannedStopStartByWsId {
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

export interface ReasonForStoppingOtherPlannedStopStartListResponse {
  reasonForStoppingOtherPlannedStopStarts: ReasonForStoppingOtherPlannedStopStartByWsId[];
}
