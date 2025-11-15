export interface Machine {
  id: string;
  machineNumber: string;
  standardCapacityQuantity: number;
}

export interface Machines {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Machine[];
}

export interface MachineResponse {
  machines: Machines;
}

export interface CreateMachine {
  machineNumber: string;
}

export interface UpdateMachineNumber {
  id: string;
  machineNumber: string;
}

export interface UpdateStandardCapacityQuantity {
  id: string;
  machineNstandardCapacityQuantityumber: number;
}

export interface MachinePagination {
  PageIndex: number;
  PageSize: number;
}
