import { Machine } from "./machines";
import { WorkShift } from "./work-shift";

export interface WorkSessionParams {
  workDate: string;
  workTime: string;
  employeeId: string;
  employeeName: string;
  machineId: string;
  workShiftId: string;
}

export interface PostWorkSessionResponse {
  id: string;
}

export interface WorkSessionModel {
  id: string;
  workDate: string;
  workTime: string;
  employeeId: string;
  machine: Machine;
  workShift: WorkShift;
}

export interface WorkSessionByIdResponse {
  workSession: WorkSessionModel;
}

export interface WorkSessionSetupBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface PostAPIResponse {
  id: string;
}

export interface WorkSessionSetup {
  id: string;
  productNumber: string;
  lotNumber: string;
  lotNumber2: string;
  materialNumber: string;
  dateStart: string;
  timeStart: string;
  remark: string | null;
  adjustmentItemUnit: string | null;
  adjustmentItemKg: string | null;
  dateComplete: string | null;
  timeComplete: string | null;
  status: number;
  workSession: WorkSessionModel;
}

export interface WorkSessionSetupResponse {
  workSessionSetup: WorkSessionSetup;
}

export interface CompleteWorkSessionSetup {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface WorkSessionSetupByWs {
  id: string;
  workSessionId: string;
  productNumber: string;
  lotNumber: string;
  lotNumber2: string;
  materialNumber: string;
  dateStart: string;
  timeStart: string;
  remark: string | null;
  adjustmentItemUnit: number | null;
  adjustmentItemKg: number | null;
  dateComplete: string | null;
  timeComplete: string | null;
  status: number;
}

export interface WorkSessionSetupByWsIdResponse {
  workSessionSetups: WorkSessionSetupByWs[];
}
