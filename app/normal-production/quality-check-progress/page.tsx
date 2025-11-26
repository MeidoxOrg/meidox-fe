"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_QUANLITY_CHECK_ID } from "@/utils/constants"
import workSessionQualityCheckServies from "@/services/work-session-quality-check"
import { WorkSessionQualityCheck } from "@/model/work-session-quality-check"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"



export default function QualityCheckProgress() {
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

    const workSessionQuanlityCheckId = localStorageService.get(WORKSESSION_QUANLITY_CHECK_ID, '');

    const getWorkSessionQuanlityCheckById = useCallback(async () => {
        await workSessionQualityCheckServies.getWorkSessionQualityCheckId(workSessionQuanlityCheckId).then((res) => {
            handleSetValueDefault(res.workSessionQualityCheck)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionQualityCheck) => {
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

    const handleQuanlityCheckCompleted = async () => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)

            if (formData.remark) {
                await workSessionQualityCheckServies.updateWorkSessionQualityCheckRemark(workSessionQuanlityCheckId, formData.remark);
            }

            await workSessionQualityCheckServies.completeWorkSessionQualityCheck({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: workSessionQuanlityCheckId
            });

            // SAVE TIME COMPLETED TO GLOBAL
            handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getWorkSessionQuanlityCheckById() }, [getWorkSessionQuanlityCheckById])

    return (
        <PageLayout
            title="品質チェック中"
            rightContent={<span className="bg-green-200 px-4 py-1 rounded-md">18:13:46</span>}
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleQuanlityCheckCompleted}
                    startLabel="品質チェック開始時間"
                    endLabel="品質チェック終了時間"
                    completeButtonLabel="品質チェック終了"
                    timerId="quanlity-check-timer"
                />
            </div>
        </PageLayout>
    )
}
