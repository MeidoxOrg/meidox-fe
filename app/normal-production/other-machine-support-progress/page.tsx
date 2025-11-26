"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ORTHER_MACHINES_SUPPORT_ID } from "@/utils/constants"
import workSessionOtherMachineSupportServies from "@/services/work-session-other-machine-support"
import { WorkSessionOtherMachineSupport } from "@/model/work-session-other-machine-support"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"



export default function OtherMachineSupportProgress() {
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

    const workSessionOrtherMachinesSupportId = localStorageService.get(WORKSESSION_ORTHER_MACHINES_SUPPORT_ID, '');

    const getWorkSessionOrtherMachinesSupporById = useCallback(async () => {
        await workSessionOtherMachineSupportServies.getWorkSessionOtherMachineSupportId(workSessionOrtherMachinesSupportId).then((res) => {
            handleSetValueDefault(res.workSessionOtherMachineSupport)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionOtherMachineSupport) => {
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

    const handleOrtherMachinesSupportCompleted = async () => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)

            if (formData.remark) {
                await workSessionOtherMachineSupportServies.updateWorkSessionOtherMachineSupportRemark(workSessionOrtherMachinesSupportId, formData.remark);
            }

            await workSessionOtherMachineSupportServies.completeWorkSessionOtherMachineSupport({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: workSessionOrtherMachinesSupportId
            });

            // SAVE TIME COMPLETED TO GLOBAL
            handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getWorkSessionOrtherMachinesSupporById() }, [getWorkSessionOrtherMachinesSupporById])

    return (
        <PageLayout
            title="他機対応中"
            rightContent={<span className="bg-green-200 px-4 py-1 rounded-md">18:13:46</span>}
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleOrtherMachinesSupportCompleted}
                    startLabel="他機対応開始時間"
                    endLabel="他機対応終了時間"
                    completeButtonLabel="他機対応終了"
                    timerId="orther-machines-support-timer"
                />
            </div>
        </PageLayout>
    )
}
