"use client"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkInputForm } from "@/components/common/WorkInputForm"
import { WorkInputFormValues } from "@/model/custom"
import { localStorageService } from "@/helper/localstorage"
import { REASON_FOR_STOPPING_FOUR_S_AFTER_LUNCH_START_ID, WORKSESSION_ID } from "@/utils/constants"
import reasonForStoppingFourSAfterLunchStartServies from "@/services/reason-for-stopping-four-s-after-lunchStart​"

export default function FourSAfterLunchStart() {
    const router = useRouter()

    const onSubmit = async (data: WorkInputFormValues) => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)
            const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

            const response = await reasonForStoppingFourSAfterLunchStartServies.createReasonForStoppingFourSAfterLunchStart({
                dateStart: currentDate,
                timeStart: currentTime,
                lotNumber: data.lotNumber,
                materialNumber: data.materialNumber,
                productNumber: data.productCode,
                workSessionId: workSessionId
            })

            if (response.id) {
                localStorageService.set<String>(REASON_FOR_STOPPING_FOUR_S_AFTER_LUNCH_START_ID, response.id)
                router.push("/reason-for-stopping/four-s-after-lunch-progress")
            }
        } catch (error) {

        }
    }
    return (
        <PageLayout title="4S（昼休憩後）開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)] flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <WorkInputForm
                        submitLabel="4S（昼休憩後）開始"
                        onSubmit={onSubmit}
                        buttonClassName="bg-green-400 hover:bg-green-500 text-black"
                    />
                </div>
            </div>

        </PageLayout>
    )
}
