"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { NumpadModal } from "@/components/ui/numpad-modal"

export default function SetupProgressPage() {
  const router = useRouter()
  const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD

  const [formData, setFormData] = useState({
    productCode: "",
    lotNumber: "",
    materialNumber: "",
    startDate: today,
    startHour: "19",
    startMinute: "13",
    endDate: today,
    endHour: "19",
    endMinute: "14",
    adjustmentItems: "",
    adjustmentWeight: "",
    notes: "",
  })

  const [numpadTarget, setNumpadTarget] = useState<null | "items" | "weight">(null)

  const handlePauseSetup = () => console.log("Setup paused")
  const handleCompleteSetup = () => router.push("/home")

  return (
    <PageLayout title="段取り中" rightContent="19:14:03">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="space-y-6">
            <FormField
              label="品番"
              value={formData.productCode}
              onChange={(value) => setFormData((prev) => ({ ...prev, productCode: value }))}
              className="w-full"
            />

            <FormField
              label="ロット№"
              value={formData.lotNumber}
              onChange={(value) => setFormData((prev) => ({ ...prev, lotNumber: value }))}
              className="w-full"
            />

            <FormField
              label="材料№"
              value={formData.materialNumber}
              onChange={(value) => setFormData((prev) => ({ ...prev, materialNumber: value }))}
              className="w-full"
            />
            {/* 段取り調整品（個） */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">段取り調整品（個）</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-green-200 border-2 border-amber-800 rounded-md px-3 py-3 text-center font-medium">
                  {formData.adjustmentItems ? `${formData.adjustmentItems} 個` : "入力はこちら→"}
                </div>
                <Button
                  onClick={() => setNumpadTarget("items")}
                  className="bg-amber-800 hover:bg-amber-900 text-white p-3 rounded-md"
                >
                  ⌨
                </Button>
              </div>
            </div>

            {/* 段取り調整品（kg） */}
            <div>
              <label className="block text-sm font-medium text-black mb-2">段取り調整品（kg）</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-green-200 border-2 border-amber-800 rounded-md px-3 py-3 text-center font-medium">
                  {formData.adjustmentWeight ? `${formData.adjustmentWeight} kg` : "入力はこちら→"}
                </div>
                <Button
                  onClick={() => setNumpadTarget("weight")}
                  className="bg-amber-800 hover:bg-amber-900 text-white p-3 rounded-md"
                >
                  ⌨
                </Button>
              </div>
            </div>

          </div>

          {/* Middle column */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-black mb-2">段取り開始時間</label>
              <TimePicker
                date={formData.startDate}
                hour={formData.startHour}
                minute={formData.startMinute}
                onDateChange={(date) =>
                  setFormData((prev) => ({ ...prev, startDate: date }))
                }
                onHourChange={(hour) =>
                  setFormData((prev) => ({ ...prev, startHour: hour }))
                }
                onMinuteChange={(minute) =>
                  setFormData((prev) => ({ ...prev, startMinute: minute }))
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">段取り終了時間</label>
              <TimePicker
                date={formData.endDate}
                hour={formData.endHour}
                minute={formData.endMinute}
                onDateChange={(date) =>
                  setFormData((prev) => ({ ...prev, endDate: date }))
                }
                onHourChange={(hour) =>
                  setFormData((prev) => ({ ...prev, endHour: hour }))
                }
                onMinuteChange={(minute) =>
                  setFormData((prev) => ({ ...prev, endMinute: minute }))
                }
              />
            </div>

            {/* 備考 */}
            <div className="mt-12">
              <label className="block text-sm font-medium text-black mb-2">備考</label>
              <Textarea
                value={formData.notes}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                placeholder="備考入力　入力の際は↓の□を押す"
                className="border-2 border-gray-400 rounded-md resize-none h-20 bg-gray-100"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6 flex flex-col">
            <div className="flex justify-center">
              <TimerDisplay timerId="setup-timer" autoStart={true} />
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-center">
              <Button
                onClick={handlePauseSetup}
                className="w-full bg-amber-900 hover:bg-amber-800 text-white py-6 text-lg font-bold rounded-md"
              >
                段取り一時停止
              </Button>

              <Button
                onClick={handleCompleteSetup}
                className="w-full bg-amber-900 hover:bg-amber-800 text-white py-6 text-lg font-bold rounded-md"
              >
                段取り終了
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Numpad Modal */}
      <NumpadModal
        open={!!numpadTarget}
        onClose={() => setNumpadTarget(null)}
        title={
          numpadTarget === "items" ? "段取り調整品（個）入力" :
            numpadTarget === "weight" ? "段取り調整品（kg）入力" :
              "数字入力"
        }
        initialValue={
          numpadTarget === "items"
            ? formData.adjustmentItems
            : numpadTarget === "weight"
              ? formData.adjustmentWeight
              : ""
        }
        onConfirm={(val) => {
          if (numpadTarget === "items") {
            setFormData((prev) => ({ ...prev, adjustmentItems: val }))
          } else if (numpadTarget === "weight") {
            setFormData((prev) => ({ ...prev, adjustmentWeight: val }))
          }
        }}
      />


    </PageLayout>
  )
}
