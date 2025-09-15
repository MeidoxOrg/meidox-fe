"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent } from "@/components/ui/dialog"

function NumpadModal({
  open,
  onClose,
  onConfirm,
  initialValue = "",
}: {
  open: boolean
  onClose: () => void
  onConfirm: (value: string) => void
  initialValue?: string
}) {
  const [inputValue, setInputValue] = useState(initialValue)

  const handleInput = (num: string) => setInputValue((prev) => prev + num)
  const handleClear = () => setInputValue("")

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xs">
        <div className="text-center font-bold text-lg mb-4">数字入力</div>

        {/* Display */}
        <div className="border rounded-md p-2 text-xl text-center bg-gray-100 mb-4 h-12 flex items-center justify-center">
          {inputValue || "0"}
        </div>

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-4 mb-4 justify-items-center">
          {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"].map((num) => (
            <button
              key={num}
              onClick={() => handleInput(num)}
              className="w-16 h-16 rounded-full bg-amber-900 text-white text-2xl font-bold flex items-center justify-center"
            >
              {num}
            </button>
          ))}
        </div>

        {/* Clear */}
        <button
          onClick={handleClear}
          className="w-full bg-green-400 text-black py-2 rounded-md font-bold"
        >
          クリア
        </button>

        {/* Action */}
        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>キャンセル</Button>
          <Button
            className="bg-amber-800 text-white"
            onClick={() => {
              onConfirm(inputValue || "0")
              onClose()
            }}
          >
            OK
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function UnmannedLunchPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    productCode: "90105-12365",
    lotNumber: "250807-1575",
    materialNumber: "MGH240807035",
    goodCount: "44",
    canNumber: "1236",
    unmannedTime: "10",
    startDate: "2025年8月28日",
    startHour: "18",
    startMinute: "13",
    endDate: "2025年8月28日",
    endHour: "18",
    endMinute: "13",
    notes: "",
    lotCompleted: false,
  })

  const [numpadTarget, setNumpadTarget] = useState<null | "goodCount" | "canNumber" | "unmannedTime">(null)

  const handleEndUnmanned = () => router.push("/")

  return (
    <PageLayout title="無人運転中" rightContent={<span className="bg-green-200 px-4 py-1 rounded-md">18:13:46</span>}>
      <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="flex flex-col space-y-6">
            <FormField label="品番" value={formData.productCode} onChange={(value) => setFormData((p) => ({ ...p, productCode: value }))} />
            <FormField label="ロット№" value={formData.lotNumber} onChange={(value) => setFormData((p) => ({ ...p, lotNumber: value }))} />
            <FormField label="材料№" value={formData.materialNumber} onChange={(value) => setFormData((p) => ({ ...p, materialNumber: value }))} />

            {/* 良品数 */}
            <div>
              <label className="block mb-2 font-medium">良品数</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-green-100 border rounded-md px-3 py-2">{formData.goodCount}個</div>
                <Button className="bg-amber-800 text-white" onClick={() => setNumpadTarget("goodCount")}>⌨️</Button>
              </div>
            </div>

            {/* 缶№ */}
            <div>
              <label className="block mb-2 font-medium">缶№</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-green-100 border rounded-md px-3 py-2">{formData.canNumber}</div>
                <Button className="bg-amber-800 text-white" onClick={() => setNumpadTarget("canNumber")}>⌨️</Button>
              </div>
            </div>

            {/* 無人時間 */}
            <div>
              <label className="block mb-2 font-medium">無人時間　詳細は→ (?)</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-green-100 border rounded-md px-3 py-2">{formData.unmannedTime}分</div>
                <Button className="bg-amber-800 text-white" onClick={() => setNumpadTarget("unmannedTime")}>⌨️</Button>
              </div>
            </div>
          </div>

          {/* Middle column */}
          <div className="flex flex-col space-y-6">
            <div>
              <label className="block font-medium mb-2">無人開始時間</label>
              <TimePicker
                date={formData.startDate}
                hour={formData.startHour}
                minute={formData.startMinute}
                onDateChange={(date) => setFormData((p) => ({ ...p, startDate: date }))}
                onHourChange={(hour) => setFormData((p) => ({ ...p, startHour: hour }))}
                onMinuteChange={(minute) => setFormData((p) => ({ ...p, startMinute: minute }))}
              />
            </div>

            <div>
              <label className="block font-medium mb-2">休憩終了時間</label>
              <TimePicker
                date={formData.endDate}
                hour={formData.endHour}
                minute={formData.endMinute}
                onDateChange={(date) => setFormData((p) => ({ ...p, endDate: date }))}
                onHourChange={(hour) => setFormData((p) => ({ ...p, endHour: hour }))}
                onMinuteChange={(minute) => setFormData((p) => ({ ...p, endMinute: minute }))}
              />
            </div>

            {/* ロット終了 */}
            <div className="flex items-start gap-2 p-3 border rounded-md bg-white">
              <Checkbox
                id="lot-completed"
                checked={formData.lotCompleted}
                onCheckedChange={(checked) => setFormData((p) => ({ ...p, lotCompleted: checked as boolean }))}
              />
              <label htmlFor="lot-completed" className="text-sm">
                ロット終了
                <br />
                <span className="text-xs text-gray-500">ロットが終了する場合にチェックを入れてください</span>
              </label>
            </div>

            {/* 備考 */}
            <div>
              <label className="block font-medium mb-2">備考</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                placeholder="備考入力　入力の際は↓の□を押す"
                className="h-24 border-2 border-gray-300 rounded-md"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col space-y-6">
            <TimerDisplay timerId="unmanned-timer" autoStart={true} />
            <div className="bg-amber-900 text-white p-4 rounded-lg text-center" onClick={() => router.push("/home")}>
              <p className="text-lg font-bold">無人運転（昼休憩）</p>
              <p className="text-xl font-bold">終了</p>
            </div>
          </div>
        </div>
      </div>

      {/* Numpad Modal */}
      <NumpadModal
        open={!!numpadTarget}
        onClose={() => setNumpadTarget(null)}
        initialValue={
          numpadTarget ? formData[numpadTarget].replace(/[^0-9]/g, "") : ""
        }
        onConfirm={(val) => {
          if (numpadTarget) {
            setFormData((p) => ({ ...p, [numpadTarget]: val }))
          }
        }}
      />
    </PageLayout>
  )
}
