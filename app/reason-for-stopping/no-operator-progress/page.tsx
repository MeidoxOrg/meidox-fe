"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { REASON_FOR_STOPPING_NO_OPERATER_ID } from "@/utils/constants"
import reasonForStoppingNoOperatorServies from "@/services/reason-for-stopping-no-operator​"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { ReasonForStoppingNoOperator } from "@/model/reason-for-stopping-no-operator​"



export default function NoOperator() {
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

    const reasonForStoppingNoOperatorId = localStorageService.get(REASON_FOR_STOPPING_NO_OPERATER_ID, '');

    const getReasonForStoppingNoOperatorById = useCallback(async () => {
        await reasonForStoppingNoOperatorServies.getReasonForStoppingNoOperatorId(reasonForStoppingNoOperatorId).then((res) => {
            handleSetValueDefault(res.reasonForStoppingNoOperator)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: ReasonForStoppingNoOperator) => {
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
                await reasonForStoppingNoOperatorServies.updateReasonForStoppingNoOperatorRemark(reasonForStoppingNoOperatorId, formData.remark);
            }

            await reasonForStoppingNoOperatorServies.completeReasonForStoppingNoOperator({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: reasonForStoppingNoOperatorId
            });

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getReasonForStoppingNoOperatorById() }, [getReasonForStoppingNoOperatorById])

    return (
        <PageLayout
            title="作業者なし中"
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleNoKanbanCompleted}
                    startLabel="作業者なし開始時間"
                    endLabel="作業者なし終了時間"
                    completeButtonLabel="作業者なし終了"
                    timerId="reason-for-stop-no-operater-timer"
                />
            </div>
        </PageLayout>
    )
}
