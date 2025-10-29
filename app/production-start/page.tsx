"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import SetupFormLayout from "@/components/common/SetupFormLayout"
import { useForm } from "react-hook-form"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ID, WORKSESSION_PRODUCTION_ID } from "@/utils/constants"
import workSessionProduction from "@/services/work-session-production"

type SetupFormValues = {
    productNumber: string
    lotNumber: string
    materialNumber: string
}

export default function SetupStartPage() {
    const router = useRouter()
    const [kanbanData, setKanbanData] = useState("")
    const [materialData, setMaterialData] = useState("")
    const [isScanningKanban, setIsScanningKanban] = useState(false)
    const [isScanningMaterialData, setIsScanningMaterialData] = useState(false)

    const form = useForm<SetupFormValues>({
        defaultValues: {
            productNumber: "",
            lotNumber: "",
            materialNumber: "",
        },
    })

    const { setValue } = form

    // --- かんばんスキャン処理 ---
    const handleScanKanban = (value: string) => {
        setKanbanData(value)

        // ロット№
        const rawLot = value.substring(5, 15).trim()
        const lotValue =
            rawLot.length >= 10
                ? `${rawLot.substring(0, 6)}-${rawLot.substring(6, 10)}`
                : rawLot

        // 品番
        const after21 = value.substring(21)
        const spaceIndex = after21.indexOf(" ")
        const productValue =
            spaceIndex !== -1 ? after21.substring(0, spaceIndex).trim() : after21.trim()

        // react-hook-form setValue
        setValue("lotNumber", lotValue)
        setValue("productNumber", productValue)
    }

    const handleScanMaterial = (value: string) => {
        setMaterialData(value)
        setValue("materialNumber", value)
    }

    const onSubmit = async (data: SetupFormValues) => {
        try {
            const now = new Date()
            const currentDate = now.toISOString().split("T")[0]
            const currentTime = now.toTimeString().slice(0, 5)
            const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

            const response = await workSessionProduction.createWorkSessionProduction({
                dateStart: currentDate,
                timeStart: currentTime,
                lotNumber: data.lotNumber,
                materialNumber: data.materialNumber,
                productNumber: data.productNumber,
                workSessionId: workSessionId
            });

            if (response.id != null) {
                localStorageService.set<string>(WORKSESSION_PRODUCTION_ID, response.id)
                router.push("/production-start-progress")
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <PageLayout title="生産中">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)]">
                <SetupFormLayout
                    form={form}
                    onSubmit={onSubmit}
                    kanbanData={kanbanData}
                    materialData={materialData}
                    isScanningKanban={isScanningKanban}
                    isScanningMaterialData={isScanningMaterialData}
                    handleScanKanban={handleScanKanban}
                    handleScanMaterial={handleScanMaterial}
                    setIsScanningKanban={setIsScanningKanban}
                    setIsScanningMaterialData={setIsScanningMaterialData}
                    submitLabel="生産開始"
                />
            </div>
        </PageLayout>
    )
}
