"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_MATERIAL_MOLDSHORTAGE_ID } from "@/utils/constants"
import reasonForStoppingMaterialMoldShortageServies from "@/services/reason-for-stopping-material-mold-shortage"
import { ReasonForStoppingMaterialMoldShortage } from "@/model/reason-for-stopping-material-mold-shortage"
import { getEndTimeFromStart } from "@/utils/time-utils"



export default function MaterialMoldShortageProgress() {
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

    const reasonForStoppingMaterialMoldShortageId = localStorageService.get(WORKSESSION_MATERIAL_MOLDSHORTAGE_ID, '');

    const getReasonForStoppingMaterialMoldShortageById = useCallback(async () => {
        await reasonForStoppingMaterialMoldShortageServies.getReasonForStoppingMaterialMoldShortageId(reasonForStoppingMaterialMoldShortageId).then((res) => {
            handleSetValueDefault(res.reasonForStoppingMaterialMoldShortage)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: ReasonForStoppingMaterialMoldShortage) => {
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
                await reasonForStoppingMaterialMoldShortageServies.updateReasonForStoppingMaterialMoldShortageRemark(reasonForStoppingMaterialMoldShortageId, formData.remark);
            }

            await reasonForStoppingMaterialMoldShortageServies.completeReasonForStoppingMaterialMoldShortage({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: reasonForStoppingMaterialMoldShortageId
            });

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getReasonForStoppingMaterialMoldShortageById() }, [getReasonForStoppingMaterialMoldShortageById])

    return (
        <PageLayout
            title="材料・金型欠品中"
        >
            <WorkSessionCommonLayout
                formData={formData}
                setFormData={setFormData}
                onComplete={handleNoKanbanCompleted}
                startLabel="材料・金型欠品開始時間"
                endLabel="材料・金型欠品終了時間"
                completeButtonLabel="材料・金型欠品終了"
                timerId="reason-for-stop-mold-shortage-timer"
            />
        </PageLayout>
    )
}
