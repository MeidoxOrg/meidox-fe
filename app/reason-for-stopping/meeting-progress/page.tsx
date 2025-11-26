"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { REASON_FOR_STOPPING_MEETING_START } from "@/utils/constants"
import reasonForStoppingMeetingStartServies from "@/services/reason-for-stopping-meeting-start"
import { ReasonForStoppingMeetingStart } from "@/model/reason-for-stopping-meeting-start"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"

export default function MeetingProgress() {
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

    const reasonForStoppingMeetingStartId = localStorageService.get(REASON_FOR_STOPPING_MEETING_START, '');

    const getReasonForStoppingMeetingStartById = useCallback(async () => {
        await reasonForStoppingMeetingStartServies.getReasonForStoppingMeetingStartId(reasonForStoppingMeetingStartId).then((res) => {
            handleSetValueDefault(res.reasonForStoppingMeetingStart)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: ReasonForStoppingMeetingStart) => {
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
                await reasonForStoppingMeetingStartServies.updateReasonForStoppingMeetingStartRemark(reasonForStoppingMeetingStartId, formData.remark);
            }

            await reasonForStoppingMeetingStartServies.completeReasonForStoppingMeetingStart({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: reasonForStoppingMeetingStartId
            });

            // SAVE TIME COMPLETED TO GLOBAL
            handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getReasonForStoppingMeetingStartById() }, [getReasonForStoppingMeetingStartById])

    return (
        <PageLayout
            title="ミーティング中"
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleNoKanbanCompleted}
                    startLabel="ミーティング開始時間"
                    endLabel="ミーティング終了時間"
                    completeButtonLabel="ミーティング終了"
                    timerId="reason-for-stop-meeting-timer"
                />
            </div>
        </PageLayout>
    )
}
