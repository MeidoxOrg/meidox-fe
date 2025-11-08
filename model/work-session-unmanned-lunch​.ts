export interface WorkSessionUnmannedLunchBody {
  workSessionId: string;
  unattendedDateStart: string;
  unattendedTimeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionUnmannedLunch {
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

export interface WorkSessionUnmannedLunchResponse {
  unmannedLunch: WorkSessionUnmannedLunch;
}

export interface EndWorkSessionUnmannedLunch {
  id: string;
  dateBreakEnd: string;
  timeBreakEnd: string;
}

export interface WorkSessionUnmannedLunchByWsId {
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

export interface WorkSessionUnmannedLunchListResponse {
  unmannedLunchs: WorkSessionUnmannedLunchByWsId[];
}
