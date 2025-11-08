"use client"

import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkInputForm } from "@/components/common/WorkInputForm"
import { WorkInputFormValues } from "@/model/custom"
import { WORKSESSION_ID, WORKSESSION_UNMANNED_OPERATION_OVER_TIME_ID } from "@/utils/constants"
import { localStorageService } from "@/helper/localstorage"
import unmannedOperationOvertimesServies from "@/services/unmanned-operation-overtime​"

export default function UnmannedOperationOvertime() {
    const router = useRouter()

    const onSubmit = async (data: WorkInputFormValues) => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)
            const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

            const response = await unmannedOperationOvertimesServies.createUnmannedOperationOvertimes({
                unattendedDateStart: currentDate,
                unattendedTimeStart: currentTime,
                lotNumber: data.lotNumber,
                materialNumber: data.materialNumber,
                productNumber: data.productCode,
                workSessionId: workSessionId
            })

            if (response.id) {
                localStorageService.set<String>(WORKSESSION_UNMANNED_OPERATION_OVER_TIME_ID, response.id)
                router.push("/unmanned-lunch-progress")
            }
        } catch (error) {

        }
    }

    return (
        <PageLayout title="無人運転（残業）開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)] flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <WorkInputForm
                        submitLabel="無人運転（残業）開始"
                        onSubmit={onSubmit}
                        buttonClassName="bg-green-400 hover:bg-green-500 text-black"
                    />
                </div>
            </div>

        </PageLayout>
    )
}
