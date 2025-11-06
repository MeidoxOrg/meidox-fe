"use client"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkInputForm } from "@/components/common/WorkInputForm"
import { WorkInputFormValues } from "@/model/custom"
import { WORKSESSION_ID, WORKSESSION_MATERIAL_MOLDSHORTAGE_ID } from "@/utils/constants"
import { localStorageService } from "@/helper/localstorage"
import reasonForStoppingMaterialMoldShortageServies from "@/services/reason-for-stopping-material-mold-shortage"

export default function MaterialMoldShortageStart() {
    const router = useRouter()

    const onSubmit = async (data: WorkInputFormValues) => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)
            const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

            const response = await reasonForStoppingMaterialMoldShortageServies.createReasonForStoppingMaterialMoldShortage({
                dateStart: currentDate,
                timeStart: currentTime,
                lotNumber: data.lotNumber,
                materialNumber: data.materialNumber,
                productNumber: data.productCode,
                workSessionId: workSessionId
            })

            if (response.id) {
                localStorageService.set<String>(WORKSESSION_MATERIAL_MOLDSHORTAGE_ID, response.id)
                router.push("/reason-for-stopping/material-mold-shortage-progress")
            }
        } catch (error) {

        }
    }

    return (
        <PageLayout title="材料・金型欠品開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)] flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <WorkInputForm
                        submitLabel="材料・金型欠品開始"
                        onSubmit={onSubmit}
                        buttonClassName="bg-green-400 hover:bg-green-500 text-black"
                    />
                </div>
            </div>

        </PageLayout>
    )
}
