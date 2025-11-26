"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ORTHER_STOP_ID } from "@/utils/constants"
import workSessionOtherStopServies from "@/services/work-session-other-stop"
import { WorkSessionOtherStop } from "@/model/work-session-other-stop"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"

export default function OtherStopProgress() {
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

    const workSessionOrtherStopId = localStorageService.get(WORKSESSION_ORTHER_STOP_ID, '');

    const getWorkSessionOrtherStopById = useCallback(async () => {
        await workSessionOtherStopServies.getWorkSessionOtherStopId(workSessionOrtherStopId).then((res) => {
            handleSetValueDefault(res.workSessionOtherStop)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionOtherStop) => {
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
                await workSessionOtherStopServies.updateWorkSessionOtherStopRemark(workSessionOrtherStopId, formData.remark);
            }

            await workSessionOtherStopServies.completeWorkSessionOtherStop({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: workSessionOrtherStopId
            });

            // SAVE TIME COMPLETED TO GLOBAL
            handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getWorkSessionOrtherStopById() }, [getWorkSessionOrtherStopById])

    return (
        <PageLayout
            title="その他停止中"
            rightContent={<span className="bg-green-200 px-4 py-1 rounded-md">18:13:46</span>}
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handle4SCompleted}
                    startLabel="その他停止開始時間"
                    endLabel="その他停止終了時間"
                    completeButtonLabel="その他停止終了"
                    timerId="other-stop-timer"
                />
            </div>
        </PageLayout>
    )
}
