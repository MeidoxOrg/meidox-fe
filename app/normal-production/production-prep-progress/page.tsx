"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_PRODUCTION_PREP_CHECK_ID } from "@/utils/constants"
import workSessionProductionPrepCheckServies from "@/services/work-session-production-prep-check"
import { WorkSessionProductionPrepCheck } from "@/model/work-session-production-prep-check"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"

export default function ProductionPrepProgress() {
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

    const workSessionProductionPrepCheckId = localStorageService.get(WORKSESSION_PRODUCTION_PREP_CHECK_ID, '');

    const getWorkSessionProductionPrepCheckId = useCallback(async () => {
        await workSessionProductionPrepCheckServies.getWorkSessionProductionPrepCheckId(workSessionProductionPrepCheckId).then((res) => {
            handleSetValueDefault(res.workSessionProductionPrepCheck)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionProductionPrepCheck) => {
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


    const handleProductionPrepProgressCompleted = async () => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)

            if (formData.remark) {
                await workSessionProductionPrepCheckServies.updateWorkSessionProductionPrepCheckRemark(workSessionProductionPrepCheckId, formData.remark);
            }

            await workSessionProductionPrepCheckServies.completeWorkSessionProductionPrepCheck({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: workSessionProductionPrepCheckId
            });

            // SAVE TIME COMPLETED TO GLOBAL
            handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getWorkSessionProductionPrepCheckId() }, [getWorkSessionProductionPrepCheckId])

    return (
        <PageLayout
            title="生産準備中"
            rightContent={<span className="bg-green-200 px-4 py-1 rounded-md">18:13:46</span>}
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleProductionPrepProgressCompleted}
                    startLabel="生産準備開始時間"
                    endLabel="生産準備終了時間"
                    completeButtonLabel="生産準備終了"
                    timerId="production-prep-progress-timer"
                />
            </div>
        </PageLayout>
    )
}
