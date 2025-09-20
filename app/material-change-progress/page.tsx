"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"



export default function MaterialChangeProgress() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        productCode: "",
        lotNumber: "",
        materialNumber: "",
        goodCount: "44",
        canNumber: "1236",
        unmannedTime: "",
        startDate: "2025-09-20",
        startHour: "18",
        startMinute: "13",
        endDate: "2025-09-20",
        endHour: "18",
        endMinute: "13",
        notes: "",
        lotCompleted: false,
        oilType: "1"
    })


    const handleMoldChangeCompleted = () => router.push("/home")

    return (
        <PageLayout
            title="材料交換中"
            rightContent={<span className="bg-green-200 px-4 py-1 rounded-md">18:13:46</span>}
        >
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md">
                {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Left column */}
                    <div className="flex flex-col space-y-6">
                        <FormField
                            label="品番"
                            value={formData.productCode}
                            onChange={(value) => setFormData((p) => ({ ...p, productCode: value }))}
                        />
                        <FormField
                            label="ロット№"
                            value={formData.lotNumber}
                            onChange={(value) => setFormData((p) => ({ ...p, lotNumber: value }))}
                        />
                        <FormField
                            label="材料№"
                            value={formData.materialNumber}
                            onChange={(value) => setFormData((p) => ({ ...p, materialNumber: value }))}
                        />
                    </div>

                    {/* Middle column */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <label className="block font-medium mb-2">材料交換開始時間</label>
                            <TimePicker
                                date={formData.startDate}
                                hour={formData.startHour}
                                minute={formData.startMinute}
                                onDateChange={(date) => setFormData((p) => ({ ...p, startDate: date }))}
                                onHourChange={(hour) => setFormData((p) => ({ ...p, startHour: hour }))}
                                onMinuteChange={(minute) => setFormData((p) => ({ ...p, startMinute: minute }))}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-2">材料交換終了時間</label>
                            <TimePicker
                                date={formData.endDate}
                                hour={formData.endHour}
                                minute={formData.endMinute}
                                onDateChange={(date) => setFormData((p) => ({ ...p, endDate: date }))}
                                onHourChange={(hour) => setFormData((p) => ({ ...p, endHour: hour }))}
                                onMinuteChange={(minute) => setFormData((p) => ({ ...p, endMinute: minute }))}
                                className="w-full"
                            />
                        </div>

                        {/* 備考 */}
                        <div>
                            <label className="block font-medium mb-2">備考</label>
                            <Textarea
                                value={formData.notes}
                                onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                                placeholder="備考入力　入力の際は↓の□を押す"
                                className="h-24 border-2 border-gray-300 rounded-md w-full"
                            />
                        </div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col space-y-6 md:mt-[60%]">
                        <TimerDisplay timerId="unmanned-timer" autoStart={true} />
                        <Button
                            className="bg-amber-900 text-white p-4 rounded-lg text-center text-xl font-bold w-full"
                            onClick={handleMoldChangeCompleted}
                        >
                            材料交換終了
                        </Button>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
