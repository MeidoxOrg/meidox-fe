"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NumpadModal } from "@/components/ui/numpad-modal"
import workSessionRefuelingServies from "@/services/work-session-refueling"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_REFUELING_ID } from "@/utils/constants"
import { WorkSessionRefueling } from "@/model/work-session-refueling"
import { getEndTimeFromStart } from "@/utils/time-utils"

export default function RefuelProgress() {
    const router = useRouter()
    const workSessionRefuelId = localStorageService.get<string>(WORKSESSION_REFUELING_ID, '');

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
        fuelAmount: "",
        fuelType: "",
        remark: "",
    })

    const [numpadTarget, setNumpadTarget] = useState<null | "fuelAmount">(null)

    const [errors, setErrors] = useState({
        fuelAmount: "",
    })

    const getWorkSessionRefuelById = useCallback(async () => {

        await workSessionRefuelingServies.getWorkSessionRefuelingId(workSessionRefuelId).then((res) => {
            handleSetValueDefault(res.workSessionRefueling)

        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionRefueling) => {
        setFormData((prev) => ({ ...prev, productNumber: data.productNumber }))
        setFormData((prev) => ({ ...prev, lotNumber: data.lotNumber }))
        setFormData((prev) => ({ ...prev, materialNumber: data.materialNumber }))
        setFormData((prev) => ({ ...prev, startDate: data.dateStart }))
        setFormData((prev) => ({ ...prev, startHour: data.timeStart.split(":")[0] }))
        setFormData((prev) => ({ ...prev, startMinute: data.timeStart.split(":")[1] }))
        setFormData((prev) => ({ ...prev, endDate: data.dateStart }))
        setFormData((prev) => ({ ...prev, endHour: getEndTimeFromStart(currentTime).endHour }))
        setFormData((prev) => ({ ...prev, endMinute: getEndTimeFromStart(currentTime).endMinute }))
    }

    const handleRefuelingCompleted = async () => {
        let newErrors = { fuelAmount: "" }
        let hasError = false


        if (!formData.fuelAmount) {
            newErrors.fuelAmount = "給油量を入力してください。"
            hasError = true
        }

        setErrors(newErrors)

        if (hasError) return

        if (formData.remark) {
            await workSessionRefuelingServies.updateWorkSessionRefuelingRemark(workSessionRefuelId, formData.remark);
        }

        await workSessionRefuelingServies.completeWorkSessionRefueling({
            id: workSessionRefuelId,
            dateComplete: currentDate,
            timeComplete: currentTime
        })

        router.push("/home")
    }

    const handleUpdateRefuelingAmount = async (value: string) => {
        try {
            const response = await workSessionRefuelingServies.updateFuelAmount(workSessionRefuelId, parseInt(value));
            if (response.id) {
                setErrors((prev) => ({ ...prev, fuelAmount: "" }))
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


    useEffect(() => {
        getWorkSessionRefuelById()
    }, [getWorkSessionRefuelById])

    return (
        <PageLayout
            title="給油中"
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
                            disabled
                            onChange={(value) => setFormData((p) => ({ ...p, productCode: value }))}
                        />
                        <FormField
                            label="ロット№"
                            value={formData.lotNumber}
                            disabled
                            onChange={(value) => setFormData((p) => ({ ...p, lotNumber: value }))}
                        />
                        <FormField
                            label="材料№"
                            value={formData.materialNumber}
                            disabled
                            onChange={(value) => setFormData((p) => ({ ...p, materialNumber: value }))}
                        />

                        {/* 油種 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">油種</label>
                            <Select
                                value={formData.fuelType}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, shift: value }))}
                            >
                                <SelectTrigger className="w-full border-2 border-amber-800 bg-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-amber-800 text-white">
                                    <SelectItem value="1" className="hover:bg-amber-700">1</SelectItem>

                                </SelectContent>
                            </Select>
                        </div>

                        {/* 無人時間 */}
                        <div>
                            <label className="block mb-2 font-medium">給油量</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 bg-green-100 border rounded-md px-3 py-2 text-center">
                                    {formData.fuelAmount != "" ? `${formData.fuelAmount}ℓ` : "入力はこちら→"}
                                </div>
                                <Button
                                    className="bg-amber-800 text-white w-full sm:w-auto"
                                    onClick={() => setNumpadTarget("fuelAmount")}
                                >
                                    ⌨️
                                </Button>
                            </div>
                            {errors.fuelAmount && (
                                <p className="text-red-600 text-sm mt-1">{errors.fuelAmount}</p>
                            )}
                        </div>
                    </div>

                    {/* Middle column */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <label className="block font-medium mb-2">給油開始時間</label>
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
                            <label className="block font-medium mb-2">給油終了時間</label>
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
                    <div className="flex flex-col space-y-6 md:mt-[60%]">
                        <TimerDisplay
                            timerId="refuel-timer"
                            autoStart={true}
                            onMinuteChange={handleMinuteChange}
                        />
                        <Button
                            className="bg-amber-900 text-white p-4 rounded-lg text-center text-xl font-bold w-full"
                            onClick={handleRefuelingCompleted}
                        >
                            給油終了
                        </Button>
                    </div>
                </div>
            </div>

            <NumpadModal
                open={!!numpadTarget}
                onClose={() => setNumpadTarget(null)}
                title="給油量（L）入力"
                initialValue={formData.fuelAmount}
                onConfirm={(val) => {
                    setFormData((prev) => ({ ...prev, fuelAmount: val }))
                    handleUpdateRefuelingAmount(val)
                }}
            />

        </PageLayout>
    )
}
