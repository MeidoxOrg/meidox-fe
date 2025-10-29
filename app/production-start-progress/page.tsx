"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { NumpadModal } from "@/components/ui/numpad-modal"
import workSessionProduction from "@/services/work-session-production"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_PRODUCTION_ID } from "@/utils/constants"
import { WorkSessionProduction } from "@/model/work-session-production"
import { getEndTimeFromStart } from "@/utils/time-utils"


export default function ProductionStartProgress() {
    const router = useRouter()
    const workSessionProductionId = localStorageService.get<string>(WORKSESSION_PRODUCTION_ID, '');

    const today = new Date().toISOString().split("T")[0] // YYYY-MM-DD

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
        numberOfGoodProduct: "",
        canNumber: "",
        remark: "",
    })

    const [errors, setErrors] = useState({
        numberOfGoodProduct: "",
        canNumber: "",
    })

    const [numpadTarget, setNumpadTarget] = useState<null | "numberOfGoodProduct" | "canNumber">(null)

    const handlePauseSetup = () => router.push("/home")

    const getWorkSessionProductionById = useCallback(async () => {

        await workSessionProduction.getWorkSessionProductionId(workSessionProductionId).then((res) => {
            handleSetValueDefault(res.workSessionProduction)

        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionProduction) => {
        setFormData((prev) => ({ ...prev, productNumber: data.productNumber }))
        setFormData((prev) => ({ ...prev, lotNumber: data.lotNumber }))
        setFormData((prev) => ({ ...prev, materialNumber: data.materialNumber }))
        setFormData((prev) => ({ ...prev, startDate: data.dateStart }))
        setFormData((prev) => ({ ...prev, startHour: data.timeStart.split(":")[0] }))
        setFormData((prev) => ({ ...prev, startMinute: data.timeStart.split(":")[1] }))
        setFormData((prev) => ({ ...prev, endDate: data.dateStart }))
        setFormData((prev) => ({ ...prev, endHour: getEndTimeFromStart(data.timeStart).endHour }))
        setFormData((prev) => ({ ...prev, endMinute: getEndTimeFromStart(data.timeStart).endMinute }))
    }

    const handleCompleteSetup = async () => {
        const now = new Date()
        const currentDate = now.toISOString().split("T")[0]
        const currentTime = now.toTimeString().slice(0, 5)

        let newErrors = { numberOfGoodProduct: "", canNumber: "" }
        let hasError = false

        if (!formData.numberOfGoodProduct) {
            newErrors.numberOfGoodProduct = "良品数を入力してください。"
            hasError = true
        }

        if (!formData.canNumber) {
            newErrors.canNumber = "J缶番号を入力してください。"
            hasError = true
        }

        setErrors(newErrors)

        if (hasError) return

        if (formData.remark) {
            await workSessionProduction.updateWorkSessionProductionRemark(workSessionProductionId, formData.remark);
        }

        await workSessionProduction.completeWorkSessionProduction({
            id: workSessionProductionId,
            dateComplete: currentDate,
            timeComplete: currentTime
        })

        router.push("/home")
    }

    const handleUpdateNumberOfGoodProduct = async (numberOfGoodProduct: string) => {
        try {
            const response = await workSessionProduction.updateNumberOfGoodProduct(workSessionProductionId, parseInt(numberOfGoodProduct));
            if (response.id) {
                setErrors((prev) => ({ ...prev, numberOfGoodProduct: "" }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateCanNumber = async (canNumber: string) => {
        try {
            const response = await workSessionProduction.updateCanNumber(workSessionProductionId, canNumber);
            if (response.id) {
                setErrors((prev) => ({ ...prev, canNumber: "" }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWorkSessionProductionById()
    }, [getWorkSessionProductionById])

    return (
        <PageLayout title="生産中" rightContent="19:14:03">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left column */}
                    <div className="space-y-6">
                        <FormField
                            label="品番"
                            value={formData.productNumber}
                            onChange={(value) => setFormData((prev) => ({ ...prev, productCode: value }))}
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
                            <label className="block text-sm font-medium text-black mb-2">良品数</label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-green-200 border-2 border-amber-800 rounded-md px-3 py-3 text-center font-medium">
                                    {formData.numberOfGoodProduct ? `${formData.numberOfGoodProduct} 個` : "入力はこちら→"}
                                </div>
                                <Button
                                    onClick={() => setNumpadTarget("numberOfGoodProduct")}
                                    className="bg-amber-800 hover:bg-amber-900 text-white p-3 rounded-md"
                                >
                                    ⌨
                                </Button>
                            </div>
                            {errors.numberOfGoodProduct && (
                                <p className="text-red-600 text-sm mt-1">{errors.numberOfGoodProduct}</p>
                            )}
                        </div>

                        {/* 段取り調整品（kg） */}
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">J缶№</label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-green-200 border-2 border-amber-800 rounded-md px-3 py-3 text-center font-medium">
                                    {formData.canNumber ? `${formData.canNumber}` : "入力はこちら→"}
                                </div>
                                <Button
                                    onClick={() => setNumpadTarget("canNumber")}
                                    className="bg-amber-800 hover:bg-amber-900 text-white p-3 rounded-md"
                                >
                                    ⌨
                                </Button>
                            </div>
                            {errors.canNumber && (
                                <p className="text-red-600 text-sm mt-1">{errors.canNumber}</p>
                            )}
                        </div>

                    </div>

                    {/* Middle column */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">生産開始時間</label>
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
                            <label className="block text-sm font-medium text-black mb-2">生産終了時間</label>
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
                            <TimerDisplay timerId="setup-timer" autoStart={true} />
                        </div>

                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                            <Button
                                onClick={handlePauseSetup}
                                className="w-full bg-amber-900 hover:bg-amber-800 text-white py-6 text-lg font-bold rounded-md"
                            >
                                生産一時停止
                            </Button>

                            <Button
                                onClick={handleCompleteSetup}
                                className="w-full bg-amber-900 hover:bg-amber-800 text-white py-6 text-lg font-bold rounded-md"
                            >
                                生産終了
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Numpad Modal */}
            <NumpadModal
                open={!!numpadTarget}
                onClose={() => setNumpadTarget(null)}
                initialValue={
                    numpadTarget === "numberOfGoodProduct"
                        ? formData.numberOfGoodProduct
                        : numpadTarget === "canNumber"
                            ? formData.canNumber
                            : ""
                }
                onConfirm={(val) => {
                    if (numpadTarget === "numberOfGoodProduct") {
                        setFormData((prev) => ({ ...prev, numberOfGoodProduct: val }))
                        handleUpdateNumberOfGoodProduct(val)
                    } else if (numpadTarget === "canNumber") {
                        setFormData((prev) => ({ ...prev, canNumber: val }))
                        handleUpdateCanNumber(val)
                    }
                }}
            />

        </PageLayout>
    )
}
