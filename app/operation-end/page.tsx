"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/ui/time-picker"
import { NumpadModal } from "@/components/ui/numpad-modal"
import operationEndServies from "@/services/operation-end"
import { localStorageService } from "@/helper/localstorage"
import { OPERATION_END_ID } from "@/utils/constants"
import { getEndTimeFromStart } from "@/utils/time-utils"
import { OperationEnd } from "@/model/operation-end"


export default function OperationEndPage() {
    const router = useRouter()
    const operationEndId = localStorageService.get<string>(OPERATION_END_ID, '');

    const [formData, setFormData] = useState({
        productNumber: "",
        lotNumber: "",
        materialNumber: "",
        startDate: "",
        startHour: "",
        startMinute: "",
        endDate: "",
        endHour: "",
        endMinute: "",
        disposableItemsPieces: "",
        disposableItemsKg: "",
        remark: "",
        fallenItemsPieces: "",
        fallenItemsKg: "",
    })

    const now = new Date()
    const currentDate = now.toISOString().split("T")[0]
    const currentTime = now.toTimeString().slice(0, 5)

    const [numpadTarget, setNumpadTarget] = useState<
        null | "disposableItemsPieces" | "disposableItemsKg" | "fallenItemsPieces" | "fallenItemsKg"
    >(null)

    const [errors, setErrors] = useState({
        disposableItemsPieces: "",
        disposableItemsKg: "",
        fallenItemsPieces: "",
        fallenItemsKg: ""
    })


    const getOperationEndId = useCallback(async () => {

        await operationEndServies.getOperationEndId(operationEndId).then((res) => {
            handleSetValueDefault(res.operationEnd)

        }).catch((error) => { })

    }, [])

    const handleSetValueDefault = (data: OperationEnd) => {
        setFormData((prev) => ({ ...prev, productNumber: data?.productNumber }))
        setFormData((prev) => ({ ...prev, lotNumber: data?.lotNumber }))
        setFormData((prev) => ({ ...prev, materialNumber: data?.materialNumber }))
        setFormData((prev) => ({ ...prev, startDate: data?.dateStart }))
        setFormData((prev) => ({ ...prev, startHour: data?.timeStart.split(":")[0] }))
        setFormData((prev) => ({ ...prev, startMinute: data?.timeStart.split(":")[1] }))
        setFormData((prev) => ({ ...prev, endDate: currentDate }))
        setFormData((prev) => ({ ...prev, endHour: getEndTimeFromStart(currentTime).endHour }))
        setFormData((prev) => ({ ...prev, endMinute: getEndTimeFromStart(currentTime).endMinute }))
    }

    const handleComplete = async () => {
        let newErrors = { disposableItemsPieces: "", disposableItemsKg: "", fallenItemsPieces: "", fallenItemsKg: "" }
        let hasError = false

        if (!formData.disposableItemsPieces) {
            newErrors.disposableItemsPieces = "廃棄品（個）を入力してください。"
            hasError = true
        }

        if (!formData.disposableItemsKg) {
            newErrors.disposableItemsKg = "廃棄品（kg）を入力してください。"
            hasError = true
        }

        if (!formData.fallenItemsPieces) {
            newErrors.fallenItemsPieces = "落下品（個）を入力してください。"
            hasError = true
        }

        if (!formData.fallenItemsKg) {
            newErrors.fallenItemsKg = "落下品（kg）を入力してください。"
            hasError = true
        }

        setErrors(newErrors)

        if (hasError) return

        if (formData.remark) {
            await operationEndServies.updateOperationEndRemark(operationEndId, formData.remark);
        }

        await operationEndServies.completeOperationEnd({
            id: operationEndId,
            dateComplete: currentDate,
            timeComplete: currentTime
        })

        router.push("/")
    }

    const handleUpdateDisposableItemsPieces = async (value: string) => {
        try {
            const response = await operationEndServies.updateDisposableItemsPieces(operationEndId, parseInt(value));
            if (response.id) {
                setErrors((prev) => ({ ...prev, disposableItemsPieces: "" }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateDisposableItemsKg = async (value: string) => {
        try {
            const response = await operationEndServies.updateDisposableItemsKg(operationEndId, parseFloat(value));
            if (response.id) {
                setErrors((prev) => ({ ...prev, disposableItemsKg: "" }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateFallenItemsPieces = async (value: string) => {
        try {
            const response = await operationEndServies.updateFallenItemsPieces(operationEndId, parseInt(value));
            if (response.id) {
                setErrors((prev) => ({ ...prev, fallenItemsPieces: "" }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateFallenItemsKg = async (value: string) => {
        try {
            const response = await operationEndServies.updateFallenItemsKg(operationEndId, parseFloat(value));
            if (response.id) {
                setErrors((prev) => ({ ...prev, fallenItemsKg: "" }))
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { getOperationEndId() }, [getOperationEndId])

    return (
        <PageLayout title="">
            <div className="max-w-5xl mx-auto bg-sky-100 p-6 rounded-md">
                <h1 className="mb-4">※捨て打ち品に段取り調整品は含まない</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left column: Time pickers */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <label className="block font-medium mb-2">作業開始時間</label>
                            <TimePicker
                                date={formData.startDate}
                                hour={formData.startHour}
                                minute={formData.startMinute}
                                onDateChange={(date) => {
                                    console.log(date);
                                    debugger
                                    setFormData((p) => ({ ...p, startDate: date }))
                                }}
                                onHourChange={(hour) => setFormData((p) => ({ ...p, startHour: hour }))}
                                onMinuteChange={(minute) => setFormData((p) => ({ ...p, startMinute: minute }))}
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">作業終了時間</label>
                            <TimePicker
                                date={formData.endDate}
                                hour={formData.endHour}
                                minute={formData.endMinute}
                                onDateChange={(date) => setFormData((p) => ({ ...p, endDate: date }))}
                                onHourChange={(hour) => setFormData((p) => ({ ...p, endHour: hour }))}
                                onMinuteChange={(minute) => setFormData((p) => ({ ...p, endMinute: minute }))}
                            />
                        </div>
                    </div>

                    {/* Right column: Number inputs */}
                    <div className="flex flex-col space-y-4">
                        {[
                            { label: "捨て打ち品（個）", key: "disposableItemsPieces", color: "bg-[#eecbcb]" },
                            { label: "捨て打ち品（kg）", key: "disposableItemsKg", color: "bg-[#eecbcb]" },
                            { label: "落下品（個）", key: "fallenItemsPieces", color: "bg-[#e6c989]" },
                            { label: "落下品（kg）", key: "fallenItemsKg", color: "bg-[#e6c989]" },
                        ].map((item) => (
                            <div key={item.key}>
                                <label className="block mb-2 font-medium">{item.label}</label>
                                <div className="flex gap-2">
                                    <div
                                        className={`flex-1 ${item.color} border rounded-md px-3 py-2 text-center`}
                                    >
                                        {formData[item.key as keyof typeof formData] || "入力はこちら→"}
                                    </div>
                                    <Button
                                        className="bg-amber-800 text-white"
                                        onClick={() => setNumpadTarget(item.key as any)}
                                    >
                                        ⌨️
                                    </Button>
                                </div>

                                {errors[item.key as keyof typeof errors] && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors[item.key as keyof typeof errors]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* 備考 */}
                <div className="mt-6">
                    <label className="block font-medium mb-2">備考</label>
                    <Textarea
                        value={formData.remark}
                        onChange={(e) => setFormData((p) => ({ ...p, remark: e.target.value }))}
                        placeholder="備考入力　入力の際は↓の□を押す"
                        className="h-24 border-2 border-gray-300 rounded-md w-full"
                    />
                </div>

                {/* Button */}
                <div className="mt-8 text-center">
                    <Button
                        className="bg-[#fcbc9e] text-black px-12 py-4 rounded-lg text-xl font-bold"
                        onClick={handleComplete}
                    >
                        作業終了
                    </Button>
                </div>
            </div>

            <NumpadModal
                open={!!numpadTarget}
                onClose={() => setNumpadTarget(null)}
                title={
                    numpadTarget === "disposableItemsPieces"
                        ? "廃棄品（個）入力"
                        : numpadTarget === "disposableItemsKg"
                            ? "廃棄品（kg）入力"
                            : numpadTarget === "fallenItemsPieces"
                                ? "落下品（個）入力"
                                : numpadTarget === "fallenItemsKg"
                                    ? "落下品（kg）入力"
                                    : "数字入力"
                }
                initialValue={
                    numpadTarget === "disposableItemsPieces"
                        ? formData.disposableItemsPieces
                        : numpadTarget === "disposableItemsKg"
                            ? formData.disposableItemsKg
                            : numpadTarget === "fallenItemsPieces"
                                ? formData.fallenItemsPieces
                                : numpadTarget === "fallenItemsKg"
                                    ? formData.fallenItemsKg
                                    : ""
                }
                onConfirm={(val) => {
                    if (numpadTarget === "disposableItemsPieces") {
                        setFormData((prev) => ({ ...prev, disposableItemsPieces: val }))
                        handleUpdateDisposableItemsPieces(val)
                    } else if (numpadTarget === "disposableItemsKg") {
                        setFormData((prev) => ({ ...prev, disposableItemsKg: val }))
                        handleUpdateDisposableItemsKg(val)
                    } else if (numpadTarget === "fallenItemsPieces") {
                        setFormData((prev) => ({ ...prev, fallenItemsPieces: val }))
                        handleUpdateFallenItemsPieces(val)
                    } else if (numpadTarget === "fallenItemsKg") {
                        setFormData((prev) => ({ ...prev, fallenItemsKg: val }))
                        handleUpdateFallenItemsKg(val)
                    }
                }}

                keys={
                    numpadTarget === "disposableItemsPieces"
                        ? undefined
                        : numpadTarget === "disposableItemsKg"
                            ? ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."]
                            : numpadTarget === "fallenItemsPieces"
                                ? undefined
                                : ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."]
                }

            />

        </PageLayout>
    )
}
