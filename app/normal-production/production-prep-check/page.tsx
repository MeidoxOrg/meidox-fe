"use client"

import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkInputForm } from "@/components/common/WorkInputForm"
import { PreviousSessionContext, WorkInputFormValues } from "@/model/custom"
import { localStorageService } from "@/helper/localstorage"
import { PREVIOS_SESSION_CONTEXT, WORKSESSION_ID, WORKSESSION_PRODUCTION_PREP_CHECK_ID } from "@/utils/constants"
import workSessionProductionPrepCheckServies from "@/services/work-session-production-prep-check"

export default function ProductionPrepCheck() {
    const router = useRouter()

    const onSubmit = async (data: WorkInputFormValues) => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)
            const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

            const previousSessionContext = localStorageService.get<PreviousSessionContext>(PREVIOS_SESSION_CONTEXT, {
                previousActionName: "",
                previousEndDate: "",
                previousEndTime: ""
            });

            const response = await workSessionProductionPrepCheckServies.createWorkSessionProductionPrepCheck({
                dateStart: previousSessionContext.previousEndDate ?? currentDate,
                timeStart: previousSessionContext.previousEndTime ?? currentTime,
                lotNumber: data.lotNumber,
                materialNumber: data.materialNumber,
                productNumber: data.productCode,
                workSessionId: workSessionId
            })

            if (response.id) {
                localStorageService.set<String>(WORKSESSION_PRODUCTION_PREP_CHECK_ID, response.id)
                router.push("/normal-production/production-prep-progress")
            }
        } catch (error) {

        }
    }
    return (
        <PageLayout title="生産準備開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)] flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <WorkInputForm
                        submitLabel="生産準備開始"
                        onSubmit={onSubmit}
                        buttonClassName="bg-green-400 hover:bg-green-500 text-black"
                    />
                </div>
            </div>

        </PageLayout>
    )
}
