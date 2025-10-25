export interface Machine {
  id: string;
  machineNumber: string;
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
