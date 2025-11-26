"use client"

import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkInputForm } from "@/components/common/WorkInputForm"
import { PreviousSessionContext, WorkInputFormValues } from "@/model/custom"
import { localStorageService } from "@/helper/localstorage"
import { PREVIOS_SESSION_CONTEXT, WORKSESSION_ID, WORKSESSION_ORTHER_MACHINES_SUPPORT_ID } from "@/utils/constants"
import workSessionOtherMachineSupportServies from "@/services/work-session-other-machine-support"

export default function OtherMachineSupport() {
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

            const response = await workSessionOtherMachineSupportServies.createWorkSessionOtherMachineSupport({
                dateStart: previousSessionContext.previousEndDate ?? currentDate,
                timeStart: previousSessionContext.previousEndTime ?? currentTime,
                lotNumber: data.lotNumber,
                materialNumber: data.materialNumber,
                productNumber: data.productCode,
                workSessionId: workSessionId
            })

            if (response.id) {
                localStorageService.set<String>(WORKSESSION_ORTHER_MACHINES_SUPPORT_ID, response.id)
                router.push("/normal-production/other-machine-support-progress")
            }
        } catch (error) {

        }
    }
    return (
        <PageLayout title="他機対応開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)] flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <WorkInputForm
                        submitLabel="他機対応開始"
                        onSubmit={onSubmit}
                        buttonClassName="bg-green-400 hover:bg-green-500 text-black"
                    />
                </div>
            </div>

        </PageLayout>
    )
}
