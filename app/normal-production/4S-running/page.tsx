"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_4S_ID } from "@/utils/constants"
import workSession4SServies from "@/services/work-session-4s"
import { WorkSession4S } from "@/model/work-session-4s"
import { getEndTimeFromStart } from "@/utils/time-utils"

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

    const workSession4SId = localStorageService.get(WORKSESSION_4S_ID, '');

    const getWorkSession4SById = useCallback(async () => {
        await workSession4SServies.getWorkSession4SId(workSession4SId).then((res) => {
            handleSetValueDefault(res.workSession4S)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSession4S) => {
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
                await workSession4SServies.updateWorkSession4SRemark(workSession4SId, formData.remark);
            }

            await workSession4SServies.completeWorkSession4S({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: workSession4SId
            });

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getWorkSession4SById() }, [getWorkSession4SById])

    return (
        <PageLayout title="4S中" rightContent="19:14:03">
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handle4SCompleted}
                    startLabel="4S開始時間"
                    endLabel="4S終了時間"
                    completeButtonLabel="4S終了"
                    timerId="4S-timer"
                />
            </div>
        </PageLayout>
    )
}
