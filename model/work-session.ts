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
