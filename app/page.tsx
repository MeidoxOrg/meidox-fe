"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { Numpad } from "@/components/ui/numpad"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home } from "lucide-react"

// Header riêng cho trang này
function WorkStartHeader() {
  const router = useRouter()
  return (
    <header className="flex items-center justify-between h-14 px-4 border-b border-gray-300 bg-white">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => router.push("/")}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <Home className="h-6 w-6 text-amber-800" />
      </Button>
    </header>
  )
}

export default function WorkStartPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    date: "2025-08-28", // ISO format
    hour: "17",
    minute: "21",
    shift: "黄",
    machineNumber: "CHT11",
    employeeId: "7619",
    employeeName: "酒井 利彰",
  })

  const [activeInput, setActiveInput] = useState<string | null>(null)

  const handleNumberClick = (number: string) => {
    if (activeInput === "employeeId") {
      setFormData((prev) => ({
        ...prev,
        employeeId: prev.employeeId + number,
      }))
    }
  }

  const handleClear = () => {
    if (activeInput === "employeeId") {
      setFormData((prev) => ({
        ...prev,
        employeeId: "",
      }))
    }
  }

  const handleStartWork = () => {
    router.push("/home")
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header riêng */}
      <WorkStartHeader />

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left side - Form (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Date + time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📅 日時</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                className="border-2 border-amber-800 rounded-md px-3 py-2 w-full bg-white"
              />
              <div className="flex gap-2 mt-2">
                <select
                  value={formData.hour}
                  onChange={(e) => setFormData((prev) => ({ ...prev, hour: e.target.value }))}
                  className="border-2 border-amber-800 rounded-md px-2 py-1 bg-white"
                >
                  {Array.from({ length: 24 }).map((_, i) => (
                    <option key={i} value={i.toString().padStart(2, "0")}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <span>:</span>
                <select
                  value={formData.minute}
                  onChange={(e) => setFormData((prev) => ({ ...prev, minute: e.target.value }))}
                  className="border-2 border-amber-800 rounded-md px-2 py-1 bg-white"
                >
                  {Array.from({ length: 60 }).map((_, i) => (
                    <option key={i} value={i.toString().padStart(2, "0")}>
                      {i.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* Shift */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🔧 直</label>
              <Select
                value={formData.shift}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, shift: value }))}
              >
                <SelectTrigger className="w-full border-2 border-amber-800 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-amber-800 text-white">
                  <SelectItem value="黄" className="hover:bg-amber-700">黄</SelectItem>
                  <SelectItem value="青" className="hover:bg-amber-700">青</SelectItem>
                  <SelectItem value="赤" className="hover:bg-amber-700">赤</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Machine number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">🔧 機械番号</label>
              <Select
                value={formData.machineNumber}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, machineNumber: value }))}
              >
                <SelectTrigger className="w-full border-2 border-amber-800 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-amber-800 text-white">
                  <SelectItem value="CHT11" className="hover:bg-amber-700">CHT11</SelectItem>
                  <SelectItem value="CHT12" className="hover:bg-amber-700">CHT12</SelectItem>
                  <SelectItem value="CHT13" className="hover:bg-amber-700">CHT13</SelectItem>
                </SelectContent>
              </Select>
            </div>


            {/* Employee ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">👥 社員番号</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData((prev) => ({ ...prev, employeeId: e.target.value }))}
                  onFocus={() => setActiveInput("employeeId")}
                  className="flex-1 border-2 border-amber-800 rounded-md px-3 py-2 bg-white"
                />
                <Button className="bg-amber-800 hover:bg-amber-900 text-white p-2">
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="w-1 h-1 bg-white rounded-full" />
                    ))}
                  </div>
                </Button>
              </div>
            </div>

            {/* Employee name */}
            <FormField
              label="👤 名前（自動入力）"
              value={formData.employeeName}
              onChange={(value) => setFormData((prev) => ({ ...prev, employeeName: value }))}
              disabled
            />

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                onClick={handleStartWork}
                className="flex-1 bg-amber-900 hover:bg-amber-800 text-white py-6 text-lg font-bold"
              >
                作業開始
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push("/#")}
                className="px-6 py-6 border-2 border-amber-800 text-amber-800 hover:bg-amber-50"
              >
                社員登録アプリへ
              </Button>
            </div>
          </div>

          {/* Right side - Numpad (2/5) */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center">
            <div className="bg-blue-500 text-white px-6 py-3 rounded-t-lg text-center font-bold mb-4 relative">
              作業開始時間を入力
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-blue-500" />
            </div>
            <Numpad onNumberClick={handleNumberClick} onClear={handleClear} />
          </div>
        </div>
      </main>
    </div>
  )
}
