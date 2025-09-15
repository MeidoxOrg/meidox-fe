// Reusable form field component
"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function FormField({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
}: FormFieldProps) {
  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      {/* Label chỉ là text, không border */}
      <Label className="text-gray-800 text-sm font-medium">{label}</Label>

      {/* Input có border nâu, bo góc */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="border-2 border-amber-800 rounded-md px-3 py-2 text-base bg-white focus:outline-none focus:ring-2 focus:ring-amber-600"
      />
    </div>
  )
}
