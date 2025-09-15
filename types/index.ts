// Core types for the manufacturing application
export interface WorkSession {
  id: string
  productCode: string
  lotNumber: string
  materialNumber: string
  startTime: Date
  endTime?: Date
  status: "setup" | "in-progress" | "unmanned" | "completed" | "paused"
  operatorId?: string
  operatorName?: string
  machineNumber?: string
  shift?: string
}

export interface SetupData {
  productCode: string
  lotNumber: string
  materialNumber: string
  startTime: Date
  endTime?: Date
  adjustmentItems: number
  adjustmentWeight: number
}

export interface UnmannedOperationData {
  productCode: string
  lotNumber: string
  materialNumber: string
  goodCount: number
  canNumber: number
  unmannedTime: number
  startTime: Date
  endTime?: Date
}

export interface OperatorInfo {
  employeeId: string
  name: string
  machineNumber: string
  shift: string
  date: Date
  startTime: Date
}

export interface TimerState {
  hours: number
  minutes: number
  seconds: number
  isRunning: boolean
}
