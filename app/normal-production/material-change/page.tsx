"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PageLayout } from "@/components/layout/page-layout"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { localStorageService } from "@/helper/localstorage"
import { PREVIOS_SESSION_CONTEXT, PRODUCT_INFO, WORKSESSION_ID, WORKSESSION_MATERIAL_CHANGE_ID } from "@/utils/constants"
import workSessionMaterialChangeServies from "@/services/work-session-material-change"
import { PreviousSessionContext, SetupFormValuesGlobal } from "@/model/custom"
import QRScanModal from "@/components/common/QRScanModal"

type MaterialChangeForm = {
    productCode: string
    lotNumber: string
    materialNumber: string
}

export default function MaterialChange() {
    const router = useRouter()
    const [isScanningMaterialData, setIsScanningMaterialData] = useState(false)
    const [materialData, setMaterialData] = useState("")

    const productManufactured = localStorageService.get<SetupFormValuesGlobal>(PRODUCT_INFO, {
        productNumber: "",
        lotNumber: "",
        materialNumber: ""
    });
    const form = useForm<MaterialChangeForm>({
        defaultValues: {
            productCode: productManufactured.productNumber,
            lotNumber: productManufactured.lotNumber,
            materialNumber: "",
        },
    })

    const { setValue } = form

    const handleScanMaterial = (value: string) => {
        setMaterialData(value)
        setValue("materialNumber", value)
    }

    const handleMaterialChange = async (data: MaterialChangeForm) => {
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

            const response = await workSessionMaterialChangeServies.createWorkSessionMaterialChange({
                dateStart: previousSessionContext.previousEndDate ?? currentDate,
                timeStart: previousSessionContext.previousEndTime ?? currentTime,
                lotNumber: data.lotNumber,
                materialNumber: data.materialNumber,
                productNumber: data.productCode,
                workSessionId: workSessionId
            })

            if (response.id) {
                localStorageService.set<String>(WORKSESSION_MATERIAL_CHANGE_ID, response.id)
                router.push("/normal-production/material-change-progress")
            }
        } catch (error) {

        }
    }

    return (
        <PageLayout title="材料交換開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleMaterialChange)}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-stretch">
                            {/* Left column - Form inputs */}
                            <div className="flex flex-col space-y-6 h-full">
                                <FormField
                                    control={form.control}
                                    name="productCode"
                                    rules={{ required: "品番を入力してください。" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel style={{ color: "black" }}>品番（かんばん無い場合手入力も可）</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                    focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"  />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lotNumber"
                                    rules={{ required: "ロット№を入力してください。" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel style={{ color: "black" }}>ロット№</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                    focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"  />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="materialNumber"
                                    rules={{ required: "材料№を入力してください。" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel style={{ color: "black" }}>材料№</FormLabel>
                                            <FormControl>
                                                <Input {...field} className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                    focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"  />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Middle column - Kanban scanning */}
                            <div className="flex flex-col justify-between h-full"></div>

                            {/* Right column - Material scanning */}
                            <div className={`flex flex-col justify-between h-full`}>
                                <div className="text-center">
                                    <p className="text-sm font-medium mb-2">↓材料エフ読み込む↓</p>
                                    <Button
                                        type="button"
                                        onClick={() => setIsScanningMaterialData(true)}
                                        className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-bold rounded-md mb-3">
                                        材料
                                    </Button>

                                    <div className="border-2 border-amber-800 rounded-md bg-white h-40 flex items-center justify-center p-2">
                                        <textarea
                                            className="w-full h-full border-none outline-none text-center text-sm resize-none 
                                             whitespace-pre-wrap break-words overflow-y-auto"
                                            value={materialData}
                                            onChange={(e) => handleScanMaterial(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <Button
                                type="submit"
                                className="bg-green-400 hover:bg-green-500 text-black py-4 px-10 text-xl font-bold rounded-lg"
                            >
                                材料交換開始
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            {/* --- Material modal --- */}
            <QRScanModal
                isOpen={isScanningMaterialData}
                title="材料QRコードを読み込んでください"
                onClose={() => setIsScanningMaterialData(false)}
                onConfirm={(value) => {
                    handleScanMaterial(value)
                    setIsScanningMaterialData(false)
                }}
            />
        </PageLayout>
    )
}
