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
import workSessionAbnormalHandlingServies from "@/services/abnormal-handling​"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ABNORMAL_HANDLING_ID } from "@/utils/constants"
import { WorkSessionAbnormalHandling } from "@/model/abnormal-handling​"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"

export default function AbnormalHandlingProgress() {
    const router = useRouter()

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
        abnormalProductPieces: "",
        abnormalProductKg: "",
        remark: "",
    })

    const now = new Date()
    const currentDate = now.toISOString().split("T")[0]
    const currentTime = now.toTimeString().slice(0, 5)
    const workSessionAbnormalHandlingId = localStorageService.get<string>(WORKSESSION_ABNORMAL_HANDLING_ID, '');

    const [errors, setErrors] = useState({
        abnormalProductPieces: "",
        abnormalProductKg: "",
    })

    const [numpadTarget, setNumpadTarget] = useState<null | "abnormalProductPieces" | "abnormalProductKg">(null)

    const getWorkSessionAbnormalHandlingId = useCallback(async () => {

        await workSessionAbnormalHandlingServies.getWorkSessionAbnormalHandlingId(workSessionAbnormalHandlingId).then((res) => {
            handleSetValueDefault(res.abnormalHandling)

        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionAbnormalHandling) => {
        setFormData((prev) => ({ ...prev, productNumber: data?.productNumber }))
        setFormData((prev) => ({ ...prev, lotNumber: data?.lotNumber }))
        setFormData((prev) => ({ ...prev, materialNumber: data?.materialNumber }))
        setFormData((prev) => ({ ...prev, startDate: data?.dateStart }))
        setFormData((prev) => ({ ...prev, startHour: data?.timeStart.split(":")[0] }))
        setFormData((prev) => ({ ...prev, startMinute: data?.timeStart.split(":")[1] }))
        setFormData((prev) => ({ ...prev, endDate: data?.dateStart }))
        setFormData((prev) => ({ ...prev, endHour: getEndTimeFromStart(currentTime).endHour }))
        setFormData((prev) => ({ ...prev, endMinute: getEndTimeFromStart(currentTime).endMinute }))
    }

    const handleUpdateAbnormalProductPiecesUnit = async (unitValue: string) => {
        try {
            const response = await workSessionAbnormalHandlingServies.updateAbnormalProductPiecesHandling(workSessionAbnormalHandlingId, parseInt(unitValue));
            if (response.id) {
                setErrors((prev) => ({ ...prev, abnormalProductPieces: "" }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateAbnormalProductKg = async (kgValue: string) => {
        try {
            const response = await workSessionAbnormalHandlingServies.updateAbnormalProductKgHandling(workSessionAbnormalHandlingId, parseInt(kgValue));
            if (response.id) {
                setErrors((prev) => ({ ...prev, abnormalProductKg: "" }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleAbnormalHandlingCompleted = async () => {
        let newErrors = { abnormalProductPieces: "", abnormalProductKg: "" }
        let hasError = false

        if (!formData.abnormalProductPieces) {
            newErrors.abnormalProductPieces = "異常品（個）を入力してください。"
            hasError = true
        }

        if (!formData.abnormalProductKg) {
            newErrors.abnormalProductKg = "異常品（kg）を入力してください。"
            hasError = true
        }

        setErrors(newErrors)

        if (hasError) return

        if (formData.remark) {
            await workSessionAbnormalHandlingServies.updateWorkSessionAbnormalHandlingRemark(workSessionAbnormalHandlingId, formData.remark);
        }

        await workSessionAbnormalHandlingServies.completeWorkSessionAbnormalHandling({
            id: workSessionAbnormalHandlingId,
            dateComplete: currentDate,
            timeComplete: currentTime
        })

        // SAVE TIME COMPLETED TO GLOBAL
        handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

        router.push("/home")
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

    useEffect(() => {
        getWorkSessionAbnormalHandlingId()
    }, [getWorkSessionAbnormalHandlingId])


    return (
        <PageLayout
            title="異常処置中"
            rightContent={<span className="bg-green-200 px-4 py-1 rounded-md">18:13:46</span>}
        >
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md">
                {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Left column */}
                    <div className="flex flex-col space-y-6">
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

                        {/* 缶№ */}
                        <div>
                            <label className="block mb-2 font-medium">異常品（個）</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 bg-green-100 border rounded-md px-3 py-2 text-center">
                                    {formData.abnormalProductPieces}個
                                </div>
                                <Button
                                    className="bg-amber-800 text-white w-full sm:w-auto"
                                    onClick={() => setNumpadTarget("abnormalProductPieces")}
                                >
                                    ⌨️
                                </Button>
                            </div>
                            {errors.abnormalProductPieces && (
                                <p className="text-red-600 text-sm mt-1">{errors.abnormalProductPieces}</p>
                            )}
                        </div>

                        {/* 無人時間 */}
                        <div>
                            <label className="block mb-2 font-medium">異常品（kg）</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 bg-green-100 border rounded-md px-3 py-2 text-center">
                                    {formData.abnormalProductKg}kg
                                </div>
                                <Button
                                    className="bg-amber-800 text-white w-full sm:w-auto"
                                    onClick={() => setNumpadTarget("abnormalProductKg")}
                                >
                                    ⌨️
                                </Button>
                            </div>
                            {errors.abnormalProductKg && (
                                <p className="text-red-600 text-sm mt-1">{errors.abnormalProductKg}</p>
                            )}
                        </div>
                    </div>

                    {/* Middle column */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <label className="block font-medium mb-2">異常処置開始時間</label>
                            <TimePicker
                                date={formData.startDate}
                                hour={formData.startHour}
                                minute={formData.startMinute}
                                onDateChange={(date) => setFormData((p) => ({ ...p, startDate: date }))}
                                onHourChange={(hour) => setFormData((p) => ({ ...p, startHour: hour }))}
                                onMinuteChange={(minute) => setFormData((p) => ({ ...p, startMinute: minute }))}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">異常処置終了時間</label>
                            <TimePicker
                                date={formData.endDate}
                                hour={formData.endHour}
                                minute={formData.endMinute}
                                onDateChange={(date) => setFormData((p) => ({ ...p, endDate: date }))}
                                onHourChange={(hour) => setFormData((p) => ({ ...p, endHour: hour }))}
                                onMinuteChange={(minute) => setFormData((p) => ({ ...p, endMinute: minute }))}
                                className="w-full"
                            />
                        </div>

                        {/* 備考 */}
                        <div>
                            <label className="block font-medium mb-2">備考</label>
                            <Textarea
                                value={formData.remark}
                                onChange={(e) => setFormData((p) => ({ ...p, remark: e.target.value }))}
                                placeholder="備考入力　入力の際は↓の□を押す"
                                className="h-24 border-2 border-gray-300 rounded-md w-full"
                            />
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col space-y-6 mt-[50%]">
                        <TimerDisplay
                            timerId="abnormal-timer"
                            autoStart={true}
                            onMinuteChange={handleMinuteChange}
                        />
                        <Button
                            className="bg-amber-900 text-white p-4 rounded-lg text-center text-xl font-bold w-full"
                            onClick={handleAbnormalHandlingCompleted}
                        >
                            異常処置終了
                        </Button>
                    </div>
                </div>
            </div>

            {/* Numpad Modal */}
            <NumpadModal
                open={!!numpadTarget}
                onClose={() => setNumpadTarget(null)}
                title={
                    numpadTarget === "abnormalProductPieces"
                        ? "異常品（個）入力"
                        : numpadTarget === "abnormalProductKg"
                            ? "異常品（kg）入力"
                            : "数字入力"
                }
                initialValue={
                    numpadTarget === "abnormalProductPieces"
                        ? formData.abnormalProductPieces
                        : numpadTarget === "abnormalProductKg"
                            ? formData.abnormalProductKg
                            : ""
                }
                onConfirm={(val) => {
                    if (numpadTarget === "abnormalProductPieces") {
                        setFormData((prev) => ({ ...prev, abnormalProductPieces: val }))
                        handleUpdateAbnormalProductPiecesUnit(val)
                    } else if (numpadTarget === "abnormalProductKg") {
                        setFormData((prev) => ({ ...prev, abnormalProductKg: val }))
                        handleUpdateAbnormalProductKg(val)
                    }
                }}
                keys={
                    numpadTarget === "abnormalProductKg"
                        ? ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."]
                        : undefined
                }
            />

        </PageLayout>
    )
}
