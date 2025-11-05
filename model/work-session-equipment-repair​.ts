export interface WorkSessionEquipmentRepairBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionEquipmentRepair {
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

export interface WorkSessionEquipmentRepairResponse {
  workSessionEquipmentRepair: WorkSessionEquipmentRepair;
}

export interface CompleteWorkSessionEquipmentRepair {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface WorkSessionEquipmentRepairByWsId {
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

export interface WorkSessionEquipmentRepairListResponse {
  workSessionEquipmentRepairs: WorkSessionEquipmentRepairByWsId[];
}
