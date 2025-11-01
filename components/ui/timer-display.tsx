"use client"

import { useEffect, useRef, useState } from "react"
import { TimerService } from "@/services/timer-service"

interface TimerDisplayProps {
  timerId: string
  autoStart?: boolean
  className?: string
  onMinuteChange?: (minute: number, hour: number) => void
}

export function TimerDisplay({
  timerId,
  autoStart = false,
  className = "",
  onMinuteChange,
}: TimerDisplayProps) {
  const [displayTime, setDisplayTime] = useState("00:00:00")
  const timerService = useRef(TimerService.getInstance()).current // ✅ giữ instance ổn định
  const lastMinuteRef = useRef<number>(-1)

  useEffect(() => {
    if (autoStart) {
      timerService.startTimer(timerId, (elapsed) => {
        setDisplayTime(timerService.formatTime(elapsed))
        const totalSeconds = Math.floor(elapsed / 1000)
        const minute = Math.floor((totalSeconds / 60) % 60)
        const hour = Math.floor(totalSeconds / 3600)

        if (elapsed >= 60000 && minute !== lastMinuteRef.current) {
          lastMinuteRef.current = minute
          onMinuteChange?.(minute, hour)
        }
      })
    }

    return () => {
      timerService.stopTimer(timerId)
    }
  }, [timerId, autoStart, onMinuteChange])


  return (
    <div
      className={`bg-amber-900 text-white text-center py-4 px-6 rounded-lg font-mono text-2xl font-bold ${className}`}
    >
      {displayTime}
    </div>
  )
}
