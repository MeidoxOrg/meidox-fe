"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { REASON_FOR_STOPPING_PLANNED_MAINTENANCE_ID } from "@/utils/constants"
import reasonForStoppingPlannedMaintenanceServies from "@/services/reason-for-stopping-planned-maintenance"
import { ReasonForStoppingPlannedMaintenance } from "@/model/reason-for-stopping-planned-maintenance"
import { getEndTimeFromStart } from "@/utils/time-utils"



export default function PlannedMaintenanceProgress() {
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

    const reasonForStoppingPlannedMaintenanceId = localStorageService.get(REASON_FOR_STOPPING_PLANNED_MAINTENANCE_ID, '');

    const getReasonForStoppingPlannedMaintenanceById = useCallback(async () => {
        await reasonForStoppingPlannedMaintenanceServies.getReasonForStoppingPlannedMaintenanceId(reasonForStoppingPlannedMaintenanceId).then((res) => {
            handleSetValueDefault(res.reasonForStoppingPlannedMaintenance)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: ReasonForStoppingPlannedMaintenance) => {
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
                await reasonForStoppingPlannedMaintenanceServies.updateReasonForStoppingPlannedMaintenanceRemark(reasonForStoppingPlannedMaintenanceId, formData.remark);
            }

            await reasonForStoppingPlannedMaintenanceServies.completeReasonForStoppingPlannedMaintenance({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: reasonForStoppingPlannedMaintenanceId
            });

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getReasonForStoppingPlannedMaintenanceById() }, [getReasonForStoppingPlannedMaintenanceById])

    return (
        <PageLayout
            title="計画保全中"
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleNoKanbanCompleted}
                    startLabel="計画保全開始時間"
                    endLabel="計画保全終了時間"
                    completeButtonLabel="計画保全終了"
                    timerId="reason-for-top-maintenance-timer"
                />
            </div>
        </PageLayout>
    )
}
