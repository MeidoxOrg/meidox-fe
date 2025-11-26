"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { NumpadModal } from "@/components/ui/numpad-modal"
import workSessionServices from "@/services/work-session"
import { WorkSessionSetup } from "@/model/work-session"
import { localStorageService } from "@/helper/localstorage"
import { PREVIOS_SESSION_CONTEXT, WORKSESSION_SETUP_ID } from "@/utils/constants"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { PreviousSessionContext } from "@/model/custom"

export default function SetupProgressPage() {
  const router = useRouter()
  const workSessionSetupId = localStorageService.get<string>(WORKSESSION_SETUP_ID, '');

  const now = new Date()
  const currentDate = now.toISOString().split("T")[0]
  const currentTime = now.toTimeString().slice(0, 5)

  const [formData, setFormData] = useState({
    productNumber: "",
    lotNumber: "",
    materialNumber: "",
    startDate: "",
    startHour: "",
    startMinute: "",
    endDate: "",
    endHour: "",
    endMinute: "",
    adjustmentItems: "",
    adjustmentWeight: "",
    remark: "",
  })

  const [errors, setErrors] = useState({
    adjustmentItems: "",
    adjustmentWeight: "",
  })

  const [numpadTarget, setNumpadTarget] = useState<null | "items" | "weight">(null)

  const getWorkSessionSetupById = useCallback(async () => {

    await workSessionServices.getWorkSessionSetupId(workSessionSetupId).then((res) => {
      handleSetValueDefault(res.workSessionSetup)

    }).catch((error) => { })

  }, [])

  const handleSetValueDefault = (data: WorkSessionSetup) => {
    setFormData((prev) => ({ ...prev, productNumber: data.productNumber }))
    setFormData((prev) => ({ ...prev, lotNumber: `${data.lotNumber}${data.lotNumber2 ? ` / ${data.lotNumber2}` : ''}` }))
    setFormData((prev) => ({ ...prev, materialNumber: data.materialNumber }))
    setFormData((prev) => ({ ...prev, startDate: data.dateStart }))
    setFormData((prev) => ({ ...prev, startHour: data.timeStart.split(":")[0] }))
    setFormData((prev) => ({ ...prev, startMinute: data.timeStart.split(":")[1] }))
    setFormData((prev) => ({ ...prev, endDate: data.dateStart }))
    setFormData((prev) => ({ ...prev, endHour: getEndTimeFromStart(currentTime).endHour }))
    setFormData((prev) => ({ ...prev, endMinute: getEndTimeFromStart(currentTime).endMinute }))
  }

  const handlePauseSetup = async () => {
    try {
      await workSessionServices.pauseWorkSessionSetup(workSessionSetupId)
      router.push("/home")
    } catch (error) {
      console.log(error);
    }
  }

  const handleCompleteSetup = async () => {

    let newErrors = { adjustmentItems: "", adjustmentWeight: "" }
    let hasError = false

    if (!formData.adjustmentItems) {
      newErrors.adjustmentItems = "段取り調整品（個）を入力してください。"
      hasError = true
    }

    if (!formData.adjustmentWeight) {
      newErrors.adjustmentWeight = "段取り調整品（kg）を入力してください。"
      hasError = true
    }

    setErrors(newErrors)

    if (hasError) return

    if (formData.remark) {
      await workSessionServices.updateWorkSessionSetupRemark(workSessionSetupId, formData.remark);
    }

    await workSessionServices.completeWorkSessionSetup({
      id: workSessionSetupId,
      dateComplete: currentDate,
      timeComplete: currentTime
    })

    // SAVE TIME COMPLETED TO GLOBAL
    handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

    router.push("/home")
  }

  const handleUpdateAdjustmentItemUnit = async (unitValue: string) => {
    try {
      const response = await workSessionServices.updateAdjustmentItemUnit(workSessionSetupId, parseInt(unitValue));
      if (response.id) {
        setErrors((prev) => ({ ...prev, adjustmentItems: "" }))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateAdjustmentItemKg = async (kgValue: string) => {
    try {
      const response = await workSessionServices.updateAdjustmentItemKg(workSessionSetupId, parseInt(kgValue));
      if (response.id) {
        setErrors((prev) => ({ ...prev, adjustmentWeight: "" }))
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleMinuteChange = useCallback((minute: number, hour: number) => {
    setFormData((prev) => {
      let endHour = parseInt(prev.endHour || "0")
      let endMinute = parseInt(prev.endMinute || "0")

      // ➕ Mỗi khi callback, ta cộng thêm 1 phút
      endMinute += 1
      if (endMinute >= 60) {
        endMinute = 0
        endHour = (endHour + 1) % 24
      }

      return {
        ...prev,
        endHour: endHour.toString().padStart(2, "0"),
        endMinute: endMinute.toString().padStart(2, "0"),
      }
    })
  }, [])

  const handleUpdatePreviousSessionContextGlobal = async (value: PreviousSessionContext) => {
    await localStorageService.set<PreviousSessionContext>(PREVIOS_SESSION_CONTEXT, value)
  }

  useEffect(() => {
    getWorkSessionSetupById()
  }, [getWorkSessionSetupById])


  return (
    <PageLayout title="段取り中" rightContent="19:14:03">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="space-y-6">
            <FormField
              label="品番"
              value={formData.productNumber}
              onChange={(value) => setFormData((prev) => ({ ...prev, productNumber: value }))}
              className="w-full"
              disabled
            />

            <FormField
              label="ロット№"
              value={formData.lotNumber}
              onChange={(value) => setFormData((prev) => ({ ...prev, lotNumber: value }))}
              className="w-full"
              disabled
            />

            <FormField
              label="材料№"
              value={formData.materialNumber}
              onChange={(value) => setFormData((prev) => ({ ...prev, materialNumber: value }))}
              className="w-full"
              disabled
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
              {errors.adjustmentItems && (
                <p className="text-red-600 text-sm mt-1">{errors.adjustmentItems}</p>
              )}
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
              {errors.adjustmentWeight && (
                <p className="text-red-600 text-sm mt-1">{errors.adjustmentWeight}</p>
              )}
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
                value={formData.remark}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, remark: e.target.value }))
                }
                placeholder="備考入力　入力の際は↓の□を押す"
                className="border-2 border-gray-400 rounded-md resize-none h-20 bg-gray-100"
              />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6 flex flex-col">
            <div className="flex justify-center">
              <TimerDisplay
                timerId="setup-timer"
                autoStart={true}
                onMinuteChange={handleMinuteChange}
              />
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
            handleUpdateAdjustmentItemUnit(val)
          } else if (numpadTarget === "weight") {
            setFormData((prev) => ({ ...prev, adjustmentWeight: val }))
            handleUpdateAdjustmentItemKg(val)
          }
        }}
      />
    </PageLayout>
  )
}
