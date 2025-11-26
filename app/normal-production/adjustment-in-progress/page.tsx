"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { localStorageService } from "@/helper/localstorage"
import { PREVIOS_SESSION_CONTEXT, WORKSESSION_ADJUSTMENT_BEGIN_CHANGE_ID } from "@/utils/constants"
import workSessionAdjustmentBeginServies from "@/services/work-session-adjustment-begin"
import { WorkSessionAdjustmentBegin } from "@/model/work-session-adjustment-begin"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { PreviousSessionContext } from "@/model/custom"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"

export default function AdjustmentInProgress() {
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
        remark: "",
    })

    const workSessionAdjustmentBeginId = localStorageService.get(WORKSESSION_ADJUSTMENT_BEGIN_CHANGE_ID, '');

    const getWorkSessionAdjustmentBeginById = useCallback(async () => {

        await workSessionAdjustmentBeginServies.getWorkSessionAdjustmentBeginId(workSessionAdjustmentBeginId).then((res) => {
            handleSetValueDefault(res.workSessionAdjustmentBegin)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionAdjustmentBegin) => {
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

    const handleAdjustmentBeginCompleted = async () => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)

            if (formData.remark) {
                await workSessionAdjustmentBeginServies.updateWorkSessionAdjustmentBeginRemark(workSessionAdjustmentBeginId, formData.remark);
            }

            await workSessionAdjustmentBeginServies.completeWorkAdjustmentBegin({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: workSessionAdjustmentBeginId
            });

            // SAVE TIME COMPLETED TO GLOBAL
            handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getWorkSessionAdjustmentBeginById() }, [getWorkSessionAdjustmentBeginById])

    return (
        <PageLayout title="調整中" rightContent="19:14:03">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left column */}
                    <div className="space-y-6">
                        <FormField
                            label="品番"
                            value={formData.productNumber}
                            disabled
                            onChange={(value) => setFormData((prev) => ({ ...prev, productCode: value }))}
                            className="w-full"
                        />

                        <FormField
                            label="ロット№"
                            value={formData.lotNumber}
                            disabled
                            onChange={(value) => setFormData((prev) => ({ ...prev, lotNumber: value }))}
                            className="w-full"
                        />

                        <FormField
                            label="材料№"
                            value={formData.materialNumber}
                            disabled
                            onChange={(value) => setFormData((prev) => ({ ...prev, materialNumber: value }))}
                            className="w-full"
                        />

                    </div>

                    {/* Middle column */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-black mb-2">調整開始時間</label>
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
                            <label className="block text-sm font-medium text-black mb-2">調整終了時間</label>
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
                                onClick={handleAdjustmentBeginCompleted}
                                className="w-full bg-amber-900 hover:bg-amber-800 text-white py-6 text-lg font-bold rounded-md"
                            >
                                調整終了
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
