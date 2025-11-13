"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import SetupFormLayout from "@/components/common/SetupFormLayout"
import { useForm } from "react-hook-form"
import { localStorageService } from "@/helper/localstorage"
import { PRODUCT_INFO, WORKSESSION_ID, WORKSESSION_PRODUCTION_ID } from "@/utils/constants"
import workSessionProduction from "@/services/work-session-production"
import { SetupFormValuesGlobal } from "@/model/custom"

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

    const productManufactured = localStorageService.get<SetupFormValuesGlobal>(PRODUCT_INFO, {
        productNumber: "",
        lotNumber: "",
        materialNumber: ""
    });

    const form = useForm<SetupFormValues>({
        defaultValues: {
            productNumber: productManufactured.productNumber,
            lotNumber: productManufactured.lotNumber,
            materialNumber: productManufactured.materialNumber,
        },
    })

    const { setValue } = form

    // --- かんばんスキャン処理 ---
    const handleScanKanban = (value: string) => {
        setKanbanData(value)

        // ロット№ (6文字目から10文字)
        const lotValue = value.substring(5, 10).trim()

        // 品番 (22文字目から空白まで)
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
                handleUpdateProductInfoGlobal({
                    lotNumber: data.lotNumber,
                    materialNumber: data.materialNumber,
                    productNumber: data.productNumber
                })

                localStorageService.set<string>(WORKSESSION_PRODUCTION_ID, response.id)
                router.push("/production-start-progress")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateProductInfoGlobal = async (value: SetupFormValuesGlobal) => {
        await localStorageService.set<SetupFormValuesGlobal>(PRODUCT_INFO, value)
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
                    showScanQR={true} />
            </div>
        </PageLayout>
    )
}
