"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface TimeOnlyPickerProps {
    hour: string
    minute: string
    onHourChange: (hour: string) => void
    onMinuteChange: (minute: string) => void
    className?: string
}

export function TimeOnlyPicker({
    hour,
    minute,
    onHourChange,
    onMinuteChange,
    className = "",
}: TimeOnlyPickerProps) {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"))

    return (
        <div className={`flex items-center gap-2 w-full sm:w-auto ${className}`}>
            {/* Hour select */}
            <Select value={hour} onValueChange={onHourChange}>
                <SelectTrigger className="w-full sm:w-20 border-2 border-amber-800 bg-white">
                    <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#ffe097] text-black">
                    {hours.map((h) => (
                        <SelectItem
                            key={h}
                            value={h}
                            className="data-[state=checked]:bg-[#ffe097] hover:bg-[#ffe097] hover:text-black focus:bg-[#ffe097] focus:text-black text-black"
                        >
                            {h}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <span className="text-lg font-bold">:</span>

            {/* Minute select */}
            <Select value={minute} onValueChange={onMinuteChange}>
                <SelectTrigger className="w-full sm:w-20 border-2 border-amber-800 bg-white">
                    <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-[#ffe097] text-black">
                    {minutes.map((m) => (
                        <SelectItem
                            key={m}
                            value={m}
                            className="data-[state=checked]:bg-[#ffe097] hover:bg-[#ffe097] hover:text-black focus:bg-[#ffe097] focus:text-black text-black"
                        >
                            {m}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
