// Timer display component
"use client"

import { useEffect, useState } from "react"
import { TimerService } from "@/services/timer-service"

interface TimerDisplayProps {
  timerId: string
  autoStart?: boolean
  className?: string
}

export function TimerDisplay({ timerId, autoStart = false, className = "" }: TimerDisplayProps) {
  const [displayTime, setDisplayTime] = useState("00:00:00")
  const timerService = TimerService.getInstance()

  useEffect(() => {
    if (autoStart) {
      timerService.startTimer(timerId, (elapsed) => {
        setDisplayTime(timerService.formatTime(elapsed))
      })
    }

    return () => {
      timerService.stopTimer(timerId)
    }
  }, [timerId, autoStart, timerService])

  return (
    <div
      className={`bg-amber-900 text-white text-center py-4 px-6 rounded-lg font-mono text-2xl font-bold ${className}`}
    >
      {displayTime}
    </div>
  )
}
