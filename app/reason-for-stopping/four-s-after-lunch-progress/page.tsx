"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { REASON_FOR_STOPPING_FOUR_S_AFTER_LUNCH_START_ID } from "@/utils/constants"
import reasonForStoppingFourSAfterLunchStartServies from "@/services/reason-for-stopping-four-s-after-lunchStart​"
import { ReasonForStoppingFourSAfterLunchStart } from "@/model/reason-for-stopping-four-s-after-lunchStart​"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"

export default function FourSAfterLunchProgress() {
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

    const reasonForStoppingFourSAfterLunchStartId = localStorageService.get(REASON_FOR_STOPPING_FOUR_S_AFTER_LUNCH_START_ID, '');

    const getReasonForStoppingFourSAfterLunchStartById = useCallback(async () => {
        await reasonForStoppingFourSAfterLunchStartServies.getReasonForStoppingFourSAfterLunchStartId(reasonForStoppingFourSAfterLunchStartId).then((res) => {
            handleSetValueDefault(res.reasonForStoppingFourSAfterLunchStart)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: ReasonForStoppingFourSAfterLunchStart) => {
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

    const handleNoKanbanCompleted = async () => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)

            if (formData.remark) {
                await reasonForStoppingFourSAfterLunchStartServies.updateReasonForStoppingFourSAfterLunchStartRemark(reasonForStoppingFourSAfterLunchStartId, formData.remark);
            }

            await reasonForStoppingFourSAfterLunchStartServies.completeReasonForStoppingFourSAfterLunchStart({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: reasonForStoppingFourSAfterLunchStartId
            });

            // SAVE TIME COMPLETED TO GLOBAL
            handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getReasonForStoppingFourSAfterLunchStartById() }, [getReasonForStoppingFourSAfterLunchStartById])


    return (
        <PageLayout
            title="4S（昼休憩後）中"
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleNoKanbanCompleted}
                    startLabel="4S（昼休憩後）開始時間"
                    endLabel="4S（昼休憩後）終了時間"
                    completeButtonLabel="4S（昼休憩後）終了"
                    timerId="reason-for-stop-4S-after-timer"
                />
            </div>
        </PageLayout>
    )
}
