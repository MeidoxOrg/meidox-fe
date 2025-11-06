export interface ReasonForStoppingMeetingStartBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface ReasonForStoppingMeetingStart {
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

export interface ReasonForStoppingMeetingStartResponse {
  reasonForStoppingMeetingStart: ReasonForStoppingMeetingStart;
}

export interface CompleteReasonForStoppingMeetingStart {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface ReasonForStoppingMeetingStartByWsId {
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

export interface ReasonForStoppingMeetingStartListResponse {
  reasonForStoppingMeetingStarts: ReasonForStoppingMeetingStartByWsId[];
}
