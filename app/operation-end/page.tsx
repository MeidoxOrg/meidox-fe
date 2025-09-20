"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/ui/time-picker"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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
                    {inputValue || "0"}
                </div>

                {/* Numpad */}
                <div className="grid grid-cols-3 gap-4 mb-4 justify-items-center">
                    {["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"].map((num) => (
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
                            onConfirm(inputValue || "0")
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

export default function OperationEnd() {
    const router = useRouter()
    const [formData, setFormData] = useState({
        startDate: "2001/12/31",
        startHour: "07",
        startMinute: "00",
        endDate: "2025/09/20",
        endHour: "14",
        endMinute: "58",
        wastePieces: "",
        wasteKg: "",
        dropPieces: "",
        dropKg: "",
        notes: "",
    })

    const [numpadTarget, setNumpadTarget] = useState<
        null | "wastePieces" | "wasteKg" | "dropPieces" | "dropKg"
    >(null)

    const handleFinish = () => router.push("/home")

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
                                onDateChange={(date) => setFormData((p) => ({ ...p, startDate: date }))}
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
                            { label: "捨て打ち品（個）", key: "wastePieces", color: "bg-[#eecbcb]" },
                            { label: "捨て打ち品（kg）", key: "wasteKg", color: "bg-[#eecbcb]" },
                            { label: "落下品（個）", key: "dropPieces", color: "bg-[#e6c989]" },
                            { label: "落下品（kg）", key: "dropKg", color: "bg-[#e6c989]" },
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
                            </div>
                        ))}
                    </div>
                </div>

                {/* 備考 */}
                <div className="mt-6">
                    <label className="block font-medium mb-2">備考</label>
                    <Textarea
                        value={formData.notes}
                        onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                        placeholder="備考入力　入力の際は↓の□を押す"
                        className="h-24 border-2 border-gray-300 rounded-md w-full"
                    />
                </div>

                {/* Button */}
                <div className="mt-8 text-center">
                    <Button
                        className="bg-[#fcbc9e] text-black px-12 py-4 rounded-lg text-xl font-bold"
                        onClick={handleFinish}
                    >
                        作業終了
                    </Button>
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
