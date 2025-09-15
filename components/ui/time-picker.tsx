"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface TimePickerProps {
  date: string
  hour: string
  minute: string
  onDateChange: (date: string) => void
  onHourChange: (hour: string) => void
  onMinuteChange: (minute: string) => void
  className?: string
}

export function TimePicker({
  date,
  hour,
  minute,
  onDateChange,
  onHourChange,
  onMinuteChange,
  className = "",
}: TimePickerProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

  const [open, setOpen] = useState(false)

  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full ${className}`}>
      {/* Date picker */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex items-center justify-between w-full sm:w-auto gap-1 bg-white border-2 border-amber-800 rounded-md px-3 py-2 cursor-pointer">
            <input
              type="text"
              value={date}
              readOnly
              className="bg-transparent outline-none text-sm w-full sm:w-auto cursor-pointer"
              placeholder="YYYY-MM-DD"
            />
            <Button variant="ghost" size="sm" className="p-1 h-auto bg-amber-800 text-white">
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-0 bg-white">
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={(d) => {
              if (d) {
                onDateChange(d.toISOString().split("T")[0])
                setOpen(false)
              }
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Time select */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Select value={hour} onValueChange={onHourChange}>
          <SelectTrigger className="w-full sm:w-20 border-2 border-amber-800 bg-white">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent className="bg-amber-800 text-white">
            {hours.map((h) => (
              <SelectItem key={h} value={h} className="hover:bg-amber-700">
                {h}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-lg font-bold">:</span>

        <Select value={minute} onValueChange={onMinuteChange}>
          <SelectTrigger className="w-full sm:w-20 border-2 border-amber-800 bg-white">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent className="bg-amber-800 text-white">
            {minutes.map((m) => (
              <SelectItem key={m} value={m} className="hover:bg-amber-700">
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
