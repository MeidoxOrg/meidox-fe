"use client"

import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkInputForm } from "@/components/common/WorkInputForm"
import { WorkInputFormValues } from "@/model/custom"
import workSessionMoldChangeServies from "@/services/work-session-mold-change"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ID, WORKSESSION_MOLD_CHANGE_ID } from "@/utils/constants"


export default function MoldChange() {
    const router = useRouter()

    const onSubmit = async (data: WorkInputFormValues) => {
        console.log(data);
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)
            const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

            const response = await workSessionMoldChangeServies.createWorkSessionMoldChange({
                dateStart: currentDate,
                timeStart: currentTime,
                lotNumber: data.lotNumber,
                materialNumber: data.materialNumber,
                productNumber: data.productCode,
                workSessionId: workSessionId
            })

            if (response.id) {
                localStorageService.set<String>(WORKSESSION_MOLD_CHANGE_ID, response.id)
                router.push("/normal-production/mold-change-progress")
            }
        } catch (error) {

        }
    }

    return (
        <PageLayout title="金型交換開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)] flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <WorkInputForm
                        submitLabel="金型交換開始"
                        onSubmit={onSubmit}
                        buttonClassName="bg-green-400 hover:bg-green-500 text-black"
                    />
                </div>
            </div>
        </PageLayout>
    )
}
