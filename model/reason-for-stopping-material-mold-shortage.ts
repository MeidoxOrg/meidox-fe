export interface ReasonForStoppingMaterialMoldShortageBody {
  workSessionId: string;
  dateStart: string;
  timeStart: string;
  productNumber: string;
  lotNumber: string;
  materialNumber: string;
}

export interface ReasonForStoppingMaterialMoldShortage {
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

export interface ReasonForStoppingMaterialMoldShortageResponse {
  reasonForStoppingMaterialMoldShortage: ReasonForStoppingMaterialMoldShortage;
}

export interface CompleteReasonForStoppingMaterialMoldShortage {
  id: string;
  dateComplete: string;
  timeComplete: string;
}

export interface ReasonForStoppingMaterialMoldShortageByWsId {
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

export interface ReasonForStoppingMaterialMoldShortageListResponse {
  reasonForStoppingMaterialMoldShortages: ReasonForStoppingMaterialMoldShortageByWsId[];
}
