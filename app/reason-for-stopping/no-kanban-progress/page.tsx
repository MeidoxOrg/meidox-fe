"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { REASON_FOR_STOPPING_NO_KANBAN_START } from "@/utils/constants"
import reasonForStoppingNoKanbanStartServies from "@/services/reason-for-stopping-no-kanban"
import { ReasonForStoppingNoKanbanStart } from "@/model/reason-for-stopping-no-kanban"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"

export default function NoKanbanProgress() {
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

    const reasonForStoppingNoKanbanStartId = localStorageService.get(REASON_FOR_STOPPING_NO_KANBAN_START, '');

    const getReasonForStoppingNoKanbanStartById = useCallback(async () => {
        await reasonForStoppingNoKanbanStartServies.getReasonForStoppingNoKanbanStartId(reasonForStoppingNoKanbanStartId).then((res) => {
            handleSetValueDefault(res.reasonForStoppingNoKanbanStart)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: ReasonForStoppingNoKanbanStart) => {
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
                await reasonForStoppingNoKanbanStartServies.updateReasonForStoppingNoKanbanStartRemark(reasonForStoppingNoKanbanStartId, formData.remark);
            }

            await reasonForStoppingNoKanbanStartServies.completeReasonForStoppingNoKanbanStart({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: reasonForStoppingNoKanbanStartId
            });

            // SAVE TIME COMPLETED TO GLOBAL
            handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getReasonForStoppingNoKanbanStartById() }, [getReasonForStoppingNoKanbanStartById])

    return (
        <PageLayout
            title="かんばんなし中"
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleNoKanbanCompleted}
                    startLabel="かんばんなし開始時間"
                    endLabel="かんばんなし終了時間"
                    completeButtonLabel="かんばんなし終了"
                    timerId="reason-for-stop-nokanban-timer"
                />
            </div>
        </PageLayout>
    )
}
