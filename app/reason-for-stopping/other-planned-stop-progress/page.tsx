"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { REASON_FOR_STOPPING_OTHER_PLANNED_STOP_START_ID } from "@/utils/constants"
import reasonForStoppingOtherPlannedStopStartServies from "@/services/reason-for-stopping-other-planned-stop-start"
import { ReasonForStoppingOtherPlannedStopStart } from "@/model/reason-for-stopping-other-planned-stop-start"
import { getEndTimeFromStart } from "@/utils/time-utils"

export default function OtherPlannedStopProgress() {
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

    const reasonForStoppingOtherPlannedStopStartId = localStorageService.get(REASON_FOR_STOPPING_OTHER_PLANNED_STOP_START_ID, '');

    const getReasonForStoppingOtherPlannedStopStartById = useCallback(async () => {
        await reasonForStoppingOtherPlannedStopStartServies.getReasonForStoppingOtherPlannedStopStartId(reasonForStoppingOtherPlannedStopStartId).then((res) => {
            handleSetValueDefault(res.reasonForStoppingOtherPlannedStopStart)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: ReasonForStoppingOtherPlannedStopStart) => {
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
                await reasonForStoppingOtherPlannedStopStartServies.updateReasonForStoppingOtherPlannedStopStartRemark(reasonForStoppingOtherPlannedStopStartId, formData.remark);
            }

            await reasonForStoppingOtherPlannedStopStartServies.completeReasonForStoppingOtherPlannedStopStart({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: reasonForStoppingOtherPlannedStopStartId
            });

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getReasonForStoppingOtherPlannedStopStartById() }, [getReasonForStoppingOtherPlannedStopStartById])

    return (
        <PageLayout
            title="その他計画停止中"
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleNoKanbanCompleted}
                    startLabel="その他計画停止開始時間"
                    endLabel="その他計画停止終了時間"
                    completeButtonLabel="その他計画停止終了"
                    timerId="reason-for-stop-orther-planned-timer"
                />
            </div>
        </PageLayout>
    )
}
