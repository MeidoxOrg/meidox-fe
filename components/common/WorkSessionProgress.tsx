"use client"

import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"

interface WorkSessionCommonLayoutProps {
    formData: {
        productNumber: string
        lotNumber: string
        materialNumber: string
        startDate: string
        startHour: string
        startMinute: string
        endDate: string
        endHour: string
        endMinute: string
        remark: string
    }
    setFormData: React.Dispatch<React.SetStateAction<any>>
    onComplete: () => void
    startLabel?: string
    endLabel?: string
    completeButtonLabel?: string
    timerId?: string
}

export function WorkSessionCommonLayout({
    formData,
    setFormData,
    onComplete,
    startLabel = "開始時間",
    endLabel = "終了時間",
    completeButtonLabel = "完了",
    timerId = "session-timer",
}: WorkSessionCommonLayoutProps) {
    return (
        <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md">
            {/* Responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Left column */}
                <div className="flex flex-col space-y-6">
                    <FormField
                        label="品番"
                        value={formData.productNumber}
                        disabled
                        onChange={(value) => setFormData((p: any) => ({ ...p, productNumber: value }))}
                    />
                    <FormField
                        label="ロット№"
                        value={formData.lotNumber}
                        disabled
                        onChange={(value) => setFormData((p: any) => ({ ...p, lotNumber: value }))}
                    />
                    <FormField
                        label="材料№"
                        value={formData.materialNumber}
                        disabled
                        onChange={(value) => setFormData((p: any) => ({ ...p, materialNumber: value }))}
                    />
                </div>

                {/* Middle column */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <label className="block font-medium mb-2">{startLabel}</label>
                        <TimePicker
                            date={formData.startDate}
                            hour={formData.startHour}
                            minute={formData.startMinute}
                            onDateChange={(date) => setFormData((p: any) => ({ ...p, startDate: date }))}
                            onHourChange={(hour) => setFormData((p: any) => ({ ...p, startHour: hour }))}
                            onMinuteChange={(minute) => setFormData((p: any) => ({ ...p, startMinute: minute }))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">{endLabel}</label>
                        <TimePicker
                            date={formData.endDate}
                            hour={formData.endHour}
                            minute={formData.endMinute}
                            onDateChange={(date) => setFormData((p: any) => ({ ...p, endDate: date }))}
                            onHourChange={(hour) => setFormData((p: any) => ({ ...p, endHour: hour }))}
                            onMinuteChange={(minute) => setFormData((p: any) => ({ ...p, endMinute: minute }))}
                            className="w-full"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-2">備考</label>
                        <Textarea
                            value={formData.remark}
                            onChange={(e) => setFormData((p: any) => ({ ...p, remark: e.target.value }))}
                            placeholder="備考入力　入力の際は↓の□を押す"
                            className="h-24 border-2 border-gray-300 rounded-md w-full"
                        />
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col space-y-6 md:mt-[60%]">
                    <TimerDisplay timerId={timerId} autoStart={true} />
                    <Button
                        className="bg-amber-900 text-white p-4 rounded-lg text-center text-xl font-bold w-full"
                        onClick={onComplete}
                    >
                        {completeButtonLabel}
                    </Button>
                </div>
            </div>
        </div>
    )
}
