"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_EQUIPMENT_REPAIR_ID } from "@/utils/constants"
import workSessionEquipmentRepairServies from "@/services/work-session-equipment-repair​"
import { WorkSessionEquipmentRepair } from "@/model/work-session-equipment-repair​"
import { getEndTimeFromStart } from "@/utils/time-utils"

export default function EquipmentRepairProgress() {
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

    const workSessionEquipmentRepairId = localStorageService.get(WORKSESSION_EQUIPMENT_REPAIR_ID, '');

    const getWorkSessionEquipmentRepairById = useCallback(async () => {
        await workSessionEquipmentRepairServies.getWorkSessionEquipmentRepairId(workSessionEquipmentRepairId).then((res) => {
            handleSetValueDefault(res.workSessionEquipmentRepair)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionEquipmentRepair) => {
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

    const handleEquipmentRepairCompleted = async () => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)

            if (formData.remark) {
                await workSessionEquipmentRepairServies.updateWorkSessionEquipmentRepairRemark(workSessionEquipmentRepairId, formData.remark);
            }

            await workSessionEquipmentRepairServies.completeWorkSessionEquipmentRepair({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: workSessionEquipmentRepairId
            });

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getWorkSessionEquipmentRepairById() }, [getWorkSessionEquipmentRepairById])

    return (
        <PageLayout
            title="設備故障中"
            rightContent={<span className="bg-green-200 px-4 py-1 rounded-md">18:13:46</span>}
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleEquipmentRepairCompleted}
                    startLabel="設備故障開始時間"
                    endLabel="設備故障終了時間"
                    completeButtonLabel="設備故障終了"
                    timerId="equipment-repair-timer"
                />
            </div>
        </PageLayout>
    )
}
