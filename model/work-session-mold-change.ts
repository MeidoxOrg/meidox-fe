export interface WorkSessionMoldChangeBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionMoldChange {
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

export interface WorkSessionMoldChangeResponse {
  workSessionMoldChange: WorkSessionMoldChange;
}

export interface CompleteWorkSessionMoldChange {
  id: string;
  dateComplete: string;
  timeComplete: string;
}
