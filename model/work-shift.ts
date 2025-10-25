export interface WorkShift {
  id: string;
  name: string;
  code: string;
}

export interface WorkShifts {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: WorkShift[];
}

export interface WorkShiftResponse {
  workShifts: WorkShifts;
}
