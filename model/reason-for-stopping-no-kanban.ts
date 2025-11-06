export interface ReasonForStoppingNoKanbanStartBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface ReasonForStoppingNoKanbanStart {
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

export interface ReasonForStoppingNoKanbanStartResponse {
  reasonForStoppingNoKanbanStart: ReasonForStoppingNoKanbanStart;
}

export interface CompleteReasonForStoppingNoKanbanStart {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface ReasonForStoppingNoKanbanStartByWsId {
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

export interface ReasonForStoppingNoKanbanStartListResponse {
  reasonForStoppingNoKanbanStarts: ReasonForStoppingNoKanbanStartByWsId[];
}
