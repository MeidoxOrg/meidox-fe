export interface UnmannedOperationOvertimeBody {
  workSessionId: string;
  unattendedDateStart: string;
  unattendedTimeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface UnmannedOperationOvertime {
  id: string;
  workSessionId: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
  unattendedDateStart: string;
  unattendedTimeStart: string;
  remark: string | null;
  numberOfGoodProducts: number | null;
  canNo: string | null;
  unmannedTime: string | null;
  lotEnd: boolean;
  dateBreakEnd: string | null;
  timeBreakEnd: string | null;
  status: number;
}

export interface UnmannedOperationOvertimeResponse {
  unmannedLunch: UnmannedOperationOvertime;
}

export interface EndUnmannedOperationOvertime {
  id: string;
  dateBreakEnd: string;
  timeBreakEnd: string;
}

export interface UnmannedOperationOvertimeByWsId {
  id: string;
  workSessionId: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
  unattendedDateStart: string;
  unattendedTimeStart: string;
  remark: string | null;
  numberOfGoodProducts: number | null;
  canNo: string | null;
  unmannedTime: string | null;
  lotEnd: boolean;
  dateBreakEnd: string | null;
  timeBreakEnd: string | null;
  status: number;
}

export interface UnmannedOperationOvertimeListResponse {
  unmannedLunchs: UnmannedOperationOvertimeByWsId[];
}
