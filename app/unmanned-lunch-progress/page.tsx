"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { NumpadModal } from "@/components/ui/numpad-modal"
import workSessionUnmannedLunchServies from "@/services/work-session-unmanned-lunch​"
import { WORKSESSION_UNMANNED_LUNCH_ID } from "@/utils/constants"
import { localStorageService } from "@/helper/localstorage"
import { WorkSessionUnmannedLunch } from "@/model/work-session-unmanned-lunch​"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"

export default function UnmannedLunchProgress() {
    const router = useRouter()

    const workSessionUnmannedLunchId = localStorageService.get<string>(WORKSESSION_UNMANNED_LUNCH_ID, '');

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
        numberOfGoodProducts: "",
        canNo: "",
        remark: "",
        unmannedTime: "",
        lotEnd: false
    })

    const now = new Date()
    const currentDate = now.toISOString().split("T")[0]
    const currentTime = now.toTimeString().slice(0, 5)

    const [numpadTarget, setNumpadTarget] = useState<null | "numberOfGoodProducts" | "canNo" | "unmannedTime">(null)

    const [errors, setErrors] = useState({
        numberOfGoodProducts: "",
        canNo: "",
        unmannedTime: ""
    })


    const getWorkSessionUnmannedLunchId = useCallback(async () => {

        await workSessionUnmannedLunchServies.getWorkSessionUnmannedLunchId(workSessionUnmannedLunchId).then((res) => {
            handleSetValueDefault(res.unmannedLunch)

        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionUnmannedLunch) => {
        setFormData((prev) => ({ ...prev, productNumber: data?.productNumber }))
        setFormData((prev) => ({ ...prev, lotNumber: data?.lotNumber }))
        setFormData((prev) => ({ ...prev, materialNumber: data?.materialNumber }))
        setFormData((prev) => ({ ...prev, startDate: data?.unattendedDateStart }))
        setFormData((prev) => ({ ...prev, startHour: data?.unattendedTimeStart.split(":")[0] }))
        setFormData((prev) => ({ ...prev, startMinute: data?.unattendedTimeStart.split(":")[1] }))
        setFormData((prev) => ({ ...prev, endDate: data?.unattendedDateStart }))
        setFormData((prev) => ({ ...prev, endHour: getEndTimeFromStart(currentTime).endHour }))
        setFormData((prev) => ({ ...prev, endMinute: getEndTimeFromStart(currentTime).endMinute }))
    }

    const handleEndUnmanned = async () => {
        let newErrors = { numberOfGoodProducts: "", canNo: "", unmannedTime: "" }
        let hasError = false

        if (!formData.numberOfGoodProducts) {
            newErrors.numberOfGoodProducts = "良品数を入力してください。"
            hasError = true
        }

        if (!formData.canNo) {
            newErrors.canNo = "J缶№を入力してください。"
            hasError = true
        }

        if (!formData.unmannedTime) {
            newErrors.unmannedTime = "無人時間（分）を入力してください。"
            hasError = true
        }

        setErrors(newErrors)

        if (hasError) return

        if (formData.remark) {
            await workSessionUnmannedLunchServies.updateWorkSessionUnmannedLunchRemark(workSessionUnmannedLunchId, formData.remark);
        }

        await workSessionUnmannedLunchServies.updateLotEnd(workSessionUnmannedLunchId, formData.lotEnd);

        await workSessionUnmannedLunchServies.endWorkSessionUnmannedLunch({
            id: workSessionUnmannedLunchId,
            dateBreakEnd: currentDate,
            timeBreakEnd: currentTime
        })

        // SAVE TIME COMPLETED TO GLOBAL
        handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

        router.push("/home")
    }

    const handleUpdateNumberOfGoodProducts = async (value: string) => {
        try {
            const response = await workSessionUnmannedLunchServies.updateNumberOfGoodProducts(workSessionUnmannedLunchId, parseInt(value));
            if (response.id) {
                setErrors((prev) => ({ ...prev, numberOfGoodProducts: "" }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateCanNo = async (value: string) => {
        try {
            const response = await workSessionUnmannedLunchServies.updateCanNo(workSessionUnmannedLunchId, parseInt(value));
            if (response.id) {
                setErrors((prev) => ({ ...prev, canNo: "" }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateUnmannedTime = async (value: string) => {
        try {
            const response = await workSessionUnmannedLunchServies.updateUnmannedTime(workSessionUnmannedLunchId, parseInt(value));
            if (response.id) {
                setErrors((prev) => ({ ...prev, unmannedTime: "" }))
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

    useEffect(() => { getWorkSessionUnmannedLunchId() }, [getWorkSessionUnmannedLunchId])

    return (
        <PageLayout
            title="無人運転中"
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

                        {/* 良品数 */}
                        <div>
                            <label className="block mb-2 font-medium">良品数</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 bg-green-100 border rounded-md px-3 py-2 text-center">
                                    {formData.numberOfGoodProducts ? `${formData.numberOfGoodProducts} 個` : "入力はこちら→"}
                                </div>
                                <Button
                                    className="bg-amber-800 text-white w-full sm:w-auto"
                                    onClick={() => setNumpadTarget("numberOfGoodProducts")}
                                >
                                    ⌨️
                                </Button>
                            </div>
                            {errors.numberOfGoodProducts && (
                                <p className="text-red-600 text-sm mt-1">{errors.numberOfGoodProducts}</p>
                            )}
                        </div>

                        {/* 缶№ */}
                        <div>
                            <label className="block mb-2 font-medium">缶№</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 bg-green-100 border rounded-md px-3 py-2 text-center">
                                    {formData.canNo ? `${formData.canNo} ` : "入力はこちら→"}
                                </div>
                                <Button
                                    className="bg-amber-800 text-white w-full sm:w-auto"
                                    onClick={() => setNumpadTarget("canNo")}
                                >
                                    ⌨️
                                </Button>
                            </div>
                            {errors.canNo && (
                                <p className="text-red-600 text-sm mt-1">{errors.canNo}</p>
                            )}
                        </div>

                        {/* 無人時間 */}
                        <div>
                            <label className="block mb-2 font-medium">無人時間　詳細は→ (?)</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 bg-green-100 border rounded-md px-3 py-2 text-center">
                                    {formData.unmannedTime ? `${formData.unmannedTime}分` : "入力はこちら→"}
                                </div>
                                <Button
                                    className="bg-amber-800 text-white w-full sm:w-auto"
                                    onClick={() => setNumpadTarget("unmannedTime")}
                                >
                                    ⌨️
                                </Button>
                            </div>
                            {errors.unmannedTime && (
                                <p className="text-red-600 text-sm mt-1">{errors.unmannedTime}</p>
                            )}
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
                                className="w-full"
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
                                className="w-full"
                            />
                        </div>

                        {/* ロット終了 */}
                        <div className="flex items-start gap-2 p-3 border rounded-md bg-white">
                            <Checkbox
                                id="lot-completed"
                                checked={formData.lotEnd}
                                onCheckedChange={(checked) =>
                                    setFormData((p) => ({ ...p, lotEnd: checked as boolean }))
                                }
                            />
                            <label htmlFor="lot-completed" className="text-sm">
                                ロット終了
                                <br />
                                <span className="text-xs text-gray-500">
                                    ロットが終了する場合にチェックを入れてください
                                </span>
                            </label>
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
                            timerId="unmanned-lunch-timer"
                            autoStart={true}
                            onMinuteChange={handleMinuteChange}
                        />                        <Button
                            className="bg-amber-900 text-white p-4 rounded-lg text-center text-xl font-bold w-full"
                            onClick={handleEndUnmanned}
                        >
                            無人運転（昼休憩） 終了
                        </Button>
                    </div>
                </div>
            </div>

            <NumpadModal
                open={!!numpadTarget}
                onClose={() => setNumpadTarget(null)}
                title={
                    numpadTarget === "numberOfGoodProducts"
                        ? "良品数（個）入力"
                        : numpadTarget === "canNo"
                            ? "J缶№入力"
                            : numpadTarget === "unmannedTime"
                                ? "無人時間（分）入力"
                                : "数字入力"
                }
                initialValue={
                    numpadTarget === "numberOfGoodProducts"
                        ? formData.numberOfGoodProducts
                        : numpadTarget === "canNo"
                            ? formData.canNo
                            : numpadTarget === "unmannedTime"
                                ? formData.unmannedTime
                                : ""
                }
                onConfirm={(val) => {
                    if (numpadTarget === "numberOfGoodProducts") {
                        setFormData((prev) => ({ ...prev, numberOfGoodProducts: val }))
                        handleUpdateNumberOfGoodProducts(val)
                    } else if (numpadTarget === "canNo") {
                        setFormData((prev) => ({ ...prev, canNo: val }))
                        handleUpdateCanNo(val)
                    } else if (numpadTarget === "unmannedTime") {
                        setFormData((prev) => ({ ...prev, unmannedTime: val }))
                        handleUpdateUnmannedTime(val)
                    }
                }}
                keys={
                    numpadTarget === "unmannedTime"
                        ? ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "MAX"]
                        : numpadTarget === "canNo" ? ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "M"]
                            : undefined
                }
            />

        </PageLayout>
    )
}
