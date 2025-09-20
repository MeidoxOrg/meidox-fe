"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { TimePicker } from "@/components/ui/time-picker"
import { TimerDisplay } from "@/components/ui/timer-display"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function NumpadModal({
    open,
    onClose,
    onConfirm,
    initialValue = "",
}: {
    open: boolean
    onClose: () => void
    onConfirm: (value: string) => void
    initialValue?: string
}) {
    const [inputValue, setInputValue] = useState(initialValue)

    const handleInput = (num: string) => setInputValue((prev) => prev + num)
    const handleClear = () => setInputValue("")

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xs">
                <div className="text-center font-bold text-lg mb-4">数字入力</div>

                {/* Display */}
                <div className="border rounded-md p-2 text-xl text-center bg-gray-100 mb-4 h-12 flex items-center justify-center">
                    {inputValue || ""}
                </div>

                {/* Numpad */}
                <div className="grid grid-cols-3 gap-4 mb-4 justify-items-center">
                    {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", "."].map((num) => (
                        <button
                            key={num}
                            onClick={() => handleInput(num)}
                            className="w-16 h-16 rounded-full bg-amber-900 text-white text-2xl font-bold flex items-center justify-center"
                        >
                            {num}
                        </button>
                    ))}
                </div>

                {/* Clear */}
                <button
                    onClick={handleClear}
                    className="w-full bg-green-400 text-black py-2 rounded-md font-bold"
                >
                    クリア
                </button>

                {/* Action */}
                <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={onClose}>
                        キャンセル
                    </Button>
                    <Button
                        className="bg-amber-800 text-white"
                        onClick={() => {
                            onConfirm(inputValue || "")
                            onClose()
                        }}
                    >
                        OK
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default function RefuelProgress() {
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

    const [numpadTarget, setNumpadTarget] = useState<null | "goodCount" | "canNumber" | "unmannedTime">(null)

    const handleRefuelingCompleted = () => router.push("/home")

    return (
        <PageLayout
            title="給油中"
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

                        {/* 油種 */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">油種</label>
                            <Select
                                value={formData.oilType}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, shift: value }))}
                            >
                                <SelectTrigger className="w-full border-2 border-amber-800 bg-white">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-amber-800 text-white">
                                    <SelectItem value="1" className="hover:bg-amber-700">1</SelectItem>

                                </SelectContent>
                            </Select>
                        </div>

                        {/* 無人時間 */}
                        <div>
                            <label className="block mb-2 font-medium">給油量</label>
                            <div className="flex flex-col sm:flex-row gap-2">
                                <div className="flex-1 bg-green-100 border rounded-md px-3 py-2 text-center">
                                    {formData.unmannedTime != "" ? `${formData.unmannedTime}ℓ` : "入力はこちら→"}
                                </div>
                                <Button
                                    className="bg-amber-800 text-white w-full sm:w-auto"
                                    onClick={() => setNumpadTarget("unmannedTime")}
                                >
                                    ⌨️
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Middle column */}
                    <div className="flex flex-col space-y-6">
                        <div>
                            <label className="block font-medium mb-2">給油開始時間</label>
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
                            <label className="block font-medium mb-2">給油終了時間</label>
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
                            onClick={handleRefuelingCompleted}
                        >
                            給油終了
                        </Button>
                    </div>
                </div>
            </div>

            {/* Numpad Modal */}
            <NumpadModal
                open={!!numpadTarget}
                onClose={() => setNumpadTarget(null)}
                initialValue={
                    numpadTarget ? formData[numpadTarget].replace(/[^0-9]/g, "") : ""
                }
                onConfirm={(val) => {
                    if (numpadTarget) {
                        setFormData((p) => ({ ...p, [numpadTarget]: val }))
                    }
                }}
            />
        </PageLayout>
    )
}
