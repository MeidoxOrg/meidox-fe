// Numpad component for numeric input
"use client"

import { Button } from "@/components/ui/button"

interface NumpadProps {
  onNumberClick: (number: string) => void
  onClear: () => void
  className?: string
}

export function Numpad({ onNumberClick, onClear, className = "" }: NumpadProps) {
  const numbers = [["7", "8", "9"], ["4", "5", "6"], ["1", "2", "3"], ["0"]]

  return (
    <div className={`grid gap-3 ${className}`}>
      {numbers.map((row, rowIndex) => (
        <div key={rowIndex} className={`flex gap-3 ${row.length === 1 ? "justify-center" : ""}`}>
          {row.map((number) => (
            <Button
              key={number}
              onClick={() => onNumberClick(number)}
              className="w-16 h-16 text-2xl font-bold bg-amber-900 hover:bg-amber-800 text-white rounded-full"
            >
              {number}
            </Button>
          ))}
        </div>
      ))}
      <div className="flex justify-center">
        <Button onClick={onClear} className="px-6 py-3 bg-green-400 hover:bg-green-500 text-black font-bold rounded-lg">
          クリア
        </Button>
      </div>
    </div>
  )
}
