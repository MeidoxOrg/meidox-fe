// Service for managing work sessions
import type { WorkSession, SetupData, UnmannedOperationData, OperatorInfo } from "@/types"

export class WorkSessionService {
  private static instance: WorkSessionService
  private currentSession: WorkSession | null = null

  static getInstance(): WorkSessionService {
    if (!WorkSessionService.instance) {
      WorkSessionService.instance = new WorkSessionService()
    }
    return WorkSessionService.instance
  }

  startSetup(data: Partial<SetupData>): WorkSession {
    this.currentSession = {
      id: Date.now().toString(),
      productCode: data.productCode || "",
      lotNumber: data.lotNumber || "",
      materialNumber: data.materialNumber || "",
      startTime: new Date(),
      status: "setup",
    }
    return this.currentSession
  }

  startUnmannedOperation(data: Partial<UnmannedOperationData>): WorkSession {
    if (this.currentSession) {
      this.currentSession.status = "unmanned"
      this.currentSession.startTime = new Date()
    } else {
      this.currentSession = {
        id: Date.now().toString(),
        productCode: data.productCode || "",
        lotNumber: data.lotNumber || "",
        materialNumber: data.materialNumber || "",
        startTime: new Date(),
        status: "unmanned",
      }
    }
    return this.currentSession
  }

  pauseSession(): void {
    if (this.currentSession) {
      this.currentSession.status = "paused"
    }
  }

  resumeSession(): void {
    if (this.currentSession) {
      this.currentSession.status = "in-progress"
    }
  }

  endSession(): WorkSession | null {
    if (this.currentSession) {
      this.currentSession.endTime = new Date()
      this.currentSession.status = "completed"
      const session = this.currentSession
      this.currentSession = null
      return session
    }
    return null
  }

  getCurrentSession(): WorkSession | null {
    return this.currentSession
  }

  setOperatorInfo(operatorInfo: OperatorInfo): void {
    if (this.currentSession) {
      this.currentSession.operatorId = operatorInfo.employeeId
      this.currentSession.operatorName = operatorInfo.name
      this.currentSession.machineNumber = operatorInfo.machineNumber
    }
  }
}
