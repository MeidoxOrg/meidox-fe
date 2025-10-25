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
