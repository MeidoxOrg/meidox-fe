"use client"

import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkInputForm } from "@/components/common/WorkInputForm"
import { WorkInputFormValues } from "@/model/custom"


export default function MoldChange() {
    const router = useRouter()

    const onSubmit = (data: WorkInputFormValues) => {
        console.log(data);
        //router.push("/normal-production/mold-change-progress")
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
