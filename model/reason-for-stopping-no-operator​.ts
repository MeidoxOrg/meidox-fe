export interface ReasonForStoppingNoOperatorBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface ReasonForStoppingNoOperator {
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

export interface ReasonForStoppingNoOperatorResponse {
  reasonForStoppingNoOperator: ReasonForStoppingNoOperator;
}

export interface CompleteReasonForStoppingNoOperator {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface ReasonForStoppingNoOperatorByWsId {
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

export interface ReasonForStoppingNoOperatorListResponse {
  reasonForStoppingNoOperators: ReasonForStoppingNoOperatorByWsId[];
}
