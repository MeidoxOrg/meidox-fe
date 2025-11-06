"use client"

import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkInputForm } from "@/components/common/WorkInputForm"
import { WorkInputFormValues } from "@/model/custom"
import { localStorageService } from "@/helper/localstorage"
import { REASON_FOR_STOPPING_NO_OPERATER_ID, WORKSESSION_ID } from "@/utils/constants"
import reasonForStoppingNoOperatorServies from "@/services/reason-for-stopping-no-operator​"

export default function NoOperatorStart() {
    const router = useRouter()

    const onSubmit = async (data: WorkInputFormValues) => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)
            const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

            const response = await reasonForStoppingNoOperatorServies.createReasonForStoppingNoOperator({
                dateStart: currentDate,
                timeStart: currentTime,
                lotNumber: data.lotNumber,
                materialNumber: data.materialNumber,
                productNumber: data.productCode,
                workSessionId: workSessionId
            })

            if (response.id) {
                localStorageService.set<String>(REASON_FOR_STOPPING_NO_OPERATER_ID, response.id)
                router.push("/reason-for-stopping/no-operator-progress")
            }
        } catch (error) {

        }
    }

    return (
        <PageLayout title="作業者なし開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)] flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <WorkInputForm
                        submitLabel="作業者なし開始"
                        onSubmit={onSubmit}
                        buttonClassName="bg-green-400 hover:bg-green-500 text-black"
                    />
                </div>
            </div>

        </PageLayout>
    )
}
