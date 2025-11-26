"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkSessionCommonLayout } from "@/components/common/WorkSessionProgress"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_SORTING_ID } from "@/utils/constants"
import workSessionSortingServies from "@/services/work-session-sorting"
import { WorkSessionSorting } from "@/model/work-session-sorting"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { handleUpdatePreviousSessionContextGlobal } from "@/utils/function"



export default function SortingProgress() {
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

    const workSessionSortingId = localStorageService.get(WORKSESSION_SORTING_ID, '');

    const getWorkSessionSortingById = useCallback(async () => {
        await workSessionSortingServies.getWorkSessionSortingId(workSessionSortingId).then((res) => {
            handleSetValueDefault(res.workSessionSorting)
        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: WorkSessionSorting) => {
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

    const handleSortingCompleted = async () => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)

            if (formData.remark) {
                await workSessionSortingServies.updateWorkSessionSortingRemark(workSessionSortingId, formData.remark);
            }

            await workSessionSortingServies.completeWorkSessionSorting({
                dateComplete: currentDate,
                timeComplete: currentTime,
                id: workSessionSortingId
            });

            // SAVE TIME COMPLETED TO GLOBAL
            handleUpdatePreviousSessionContextGlobal({ previousActionName: window.location.pathname, previousEndDate: currentDate, previousEndTime: currentTime })

            router.push("/home")

        } catch (error) {

        }
    }

    useEffect(() => { getWorkSessionSortingById() }, [getWorkSessionSortingById])

    return (
        <PageLayout
            title="選別中"
            rightContent={<span className="bg-green-200 px-4 py-1 rounded-md">18:13:46</span>}
        >
            <div className="max-w-7xl mx-auto">
                <WorkSessionCommonLayout
                    formData={formData}
                    setFormData={setFormData}
                    onComplete={handleSortingCompleted}
                    startLabel="選別開始時間"
                    endLabel="選別終了時間"
                    completeButtonLabel="選別終了"
                    timerId="sorting-timer"
                />
            </div>
        </PageLayout>
    )
}
