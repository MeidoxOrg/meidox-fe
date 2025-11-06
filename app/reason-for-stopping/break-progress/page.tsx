"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { REASON_FOR_STOPPING_BREAK_START } from "@/utils/constants"
import reasonForStoppingBreakStartServies from "@/services/reason-for-stopping-break-start"
import { ReasonForStoppingBreakStart } from "@/model/reason-for-stopping-break-start"
import { getEndTimeFromStart } from "@/utils/time-utils"



export default function BreakProgress() {
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

    const reasonForStoppingBreakStartId = localStorageService.get(REASON_FOR_STOPPING_BREAK_START, '');

    const getReasonForStoppingBreakStartById = useCallback(async () => {
        await reasonForStoppingBreakStartServies.getReasonForStoppingBreakStartId(reasonForStoppingBreakStartId).then((res) => {
            handleSetValueDefault(res.reasonForStoppingBreakStart)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: ReasonForStoppingBreakStart) => {
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

    const handle4SCompleted = async () => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)

            if (formData.remark) {
                await reasonForStoppingBreakStartServies.updateReasonForStoppingBreakStartRemark(reasonForStoppingBreakStartId, formData.remark);
            }

            await reasonForStoppingBreakStartServies.completeReasonForStoppingBreakStart({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: reasonForStoppingBreakStartId
            });

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getReasonForStoppingBreakStartById() }, [getReasonForStoppingBreakStartById])

    return (
        <PageLayout
            title="休憩中"
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handle4SCompleted}
                    startLabel="休憩開始時間"
                    endLabel="休憩終了時間"
                    completeButtonLabel="休憩終了"
                    timerId="reason-for-stop-break-timer"
                />
            </div>
        </PageLayout>
    )
}
