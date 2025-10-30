import { WorkSessionModel } from "./work-session";

export interface WorkSessionProductionBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface WorkSessionProduction {
  id: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
  dateStart: string;
  timeStart: string;
  remark: string | null;
  numberOfGoodProduct: number | null;
  canNumber: number | null;
  dateComplete: string | null;
  timeComplete: string | null;
  status: number;
  workSession: WorkSessionModel;
}

export interface WorkSessionProductionResponse {
  workSessionProduction: WorkSessionProduction;
}

export interface CompleteWorkSessionProduction {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface WorkSessionProductionByWsId {
  id: string;
  workSessionId: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
  dateStart: string;
  timeStart: string;
  remark: string | null;
  numberOfGoodProduct: number;
  canNumber: string;
  dateComplete: string | null;
  timeComplete: string | null;
  status: number;
}

export interface WorkSessionProductionsByWsIdResponse {
  workSessionProductions: WorkSessionProductionByWsId[];
}
