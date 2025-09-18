"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { PageLayout } from "@/components/layout/page-layout"

export default function AdjustmentBegins() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        productCode: "",
        lotNumber: "",
        materialNumber: "",
        kanbanData: "",
        materialData: "",
    })

    const handleStartSetup = () => {
        router.push("/setup-progress")
    }

    return (
        <PageLayout title="調整開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-stretch">
                    {/* Left column - Form inputs */}
                    <div className="flex flex-col space-y-6 h-full">
                        <FormField
                            label="品番（かんばん無い場合手入力も可）"
                            value={formData.productCode}
                            onChange={(value) => setFormData((prev) => ({ ...prev, productCode: value }))}
                            placeholder=""
                            className="w-full"
                        />

                        <FormField
                            label="ロット№"
                            value={formData.lotNumber}
                            onChange={(value) => setFormData((prev) => ({ ...prev, lotNumber: value }))}
                            placeholder=""
                            className="w-full"
                        />

                        <FormField
                            label="材料№"
                            value={formData.materialNumber}
                            onChange={(value) => setFormData((prev) => ({ ...prev, materialNumber: value }))}
                            placeholder=""
                            className="w-full"
                        />
                        <div className="mt-auto">
                            <Button
                                onClick={handleStartSetup}
                                className="bg-green-400 hover:bg-green-500 text-black py-3 w-full text-lg font-bold rounded-md"
                            >
                                調整開始
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
