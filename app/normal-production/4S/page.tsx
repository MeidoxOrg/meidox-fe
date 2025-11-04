"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { PageLayout } from "@/components/layout/page-layout"

export default function Page4S() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        productCode: "",
        lotNumber: "",
        materialNumber: "",
        kanbanData: "",
        materialData: "",
    })

    const handleStart4S = () => {
        router.push("/4S-running")
    }

    return (
        <PageLayout title="4S開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)] flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <div className="flex flex-col space-y-6">
                        <FormField
                            label="品番（かんばん無い場合手入力も可）"
                            value={formData.productCode}
                            onChange={(value) =>
                                setFormData((prev) => ({ ...prev, productCode: value }))
                            }
                            placeholder=""
                            className="w-full"
                        />

                        <FormField
                            label="ロット№"
                            value={formData.lotNumber}
                            onChange={(value) =>
                                setFormData((prev) => ({ ...prev, lotNumber: value }))
                            }
                            placeholder=""
                            className="w-full"
                        />

                        <FormField
                            label="材料№"
                            value={formData.materialNumber}
                            onChange={(value) =>
                                setFormData((prev) => ({ ...prev, materialNumber: value }))
                            }
                            placeholder=""
                            className="w-full"
                        />

                        <div className="pt-4">
                            <Button
                                onClick={handleStart4S}
                                className="bg-green-400 hover:bg-green-500 text-black py-3 w-full text-lg font-bold rounded-md"
                            >
                                4S開始
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

        </PageLayout>
    )
}
