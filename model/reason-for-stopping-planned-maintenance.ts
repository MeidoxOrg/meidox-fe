export interface ReasonForStoppingPlannedMaintenanceBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface ReasonForStoppingPlannedMaintenance {
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

export interface ReasonForStoppingPlannedMaintenanceResponse {
  reasonForStoppingPlannedMaintenance: ReasonForStoppingPlannedMaintenance;
}

export interface CompleteReasonForStoppingPlannedMaintenance {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface ReasonForStoppingPlannedMaintenanceByWsId {
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

export interface ReasonForStoppingPlannedMaintenanceListResponse {
  reasonForStoppingPlannedMaintenances: ReasonForStoppingPlannedMaintenanceByWsId[];
}
