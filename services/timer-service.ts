// Timer service for managing time tracking
export class TimerService {
  private static instance: TimerService
  private timers: Map<string, { startTime: Date; callback?: (elapsed: number) => void }> = new Map()
  private intervals: Map<string, NodeJS.Timeout> = new Map()

  static getInstance(): TimerService {
    if (!TimerService.instance) {
      TimerService.instance = new TimerService()
    }
    return TimerService.instance
  }

  startTimer(id: string, callback?: (elapsed: number) => void): void {
    this.stopTimer(id) // Stop existing timer if any

    const startTime = new Date()
    this.timers.set(id, { startTime, callback })

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime.getTime()
      callback?.(elapsed)
    }, 1000)

    this.intervals.set(id, interval)
  }

  stopTimer(id: string): number {
    const timer = this.timers.get(id)
    const interval = this.intervals.get(id)

    if (interval) {
      clearInterval(interval)
      this.intervals.delete(id)
    }

    if (timer) {
      const elapsed = Date.now() - timer.startTime.getTime()
      this.timers.delete(id)
      return elapsed
    }

    return 0
  }

  getElapsedTime(id: string): number {
    const timer = this.timers.get(id)
    if (timer) {
      return Date.now() - timer.startTime.getTime()
    }
    return 0
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }
}
