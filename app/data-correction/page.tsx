"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/layout/page-layout"
import { Textarea } from "@/components/ui/textarea"
import { TimePicker } from "@/components/ui/time-picker"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
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
        shift: "黄",
        machineNumber: "CHT11",
        unitQuantity: "良品数",
        adjustmentItems: "",

    })

    const [numpadTarget, setNumpadTarget] = useState<
        null | "items"
    >(null)

    const handleFinish = () => router.push("/home")

    return (
        <PageLayout title="">
            <div className="max-w-5xl mx-auto bg-sky-100 p-6 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <input
                            type="date"
                            // value={formData.date}
                            onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                            className="border-2 border-amber-800 rounded-md px-3 py-2 w-full bg-white"
                        />
                    </div>
                    <div>
                        <Select
                            value={formData.shift}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, shift: value }))}
                        >
                            <SelectTrigger className="w-full border-2 border-amber-800 bg-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-amber-800 text-white">
                                <SelectItem value="黄" className="hover:bg-amber-700">黄</SelectItem>
                                <SelectItem value="白" className="hover:bg-amber-700">白</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Machine number 1*/}
                    <div>
                        <Select
                            value={formData.machineNumber}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, machineNumber: value }))}
                        >
                            <SelectTrigger className="w-full border-2 border-amber-800 bg-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-amber-800 text-white">
                                <SelectItem value="CHT11" className="hover:bg-amber-700">CHT11</SelectItem>
                                <SelectItem value="CHT12" className="hover:bg-amber-700">CHT12</SelectItem>
                                <SelectItem value="CHT13" className="hover:bg-amber-700">CHT13</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Select
                            value={formData.unitQuantity}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, unitQuantity: value }))}
                        >
                            <SelectTrigger className="w-full border-2 border-amber-800 bg-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-amber-800 text-white">
                                <SelectItem value="良品数" className="hover:bg-amber-700">良品数</SelectItem>
                                <SelectItem value="J缶№" className="hover:bg-amber-700">J缶№</SelectItem>
                                <SelectItem value="異常品個数・重量" className="hover:bg-amber-700">異常品個数・重量</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left column: */}
                    <div className="flex flex-col space-y-6 mt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            {/* Field group 1 */}
                            <div>日付：</div>
                            <div>品番：</div>

                            {/* Field group 2 */}
                            <div>日時：</div>
                            <div>ロット№：</div>

                            {/* Field group 3 */}
                            <div>名前: </div>
                            <div>良品数：</div>

                            {/* Field group 4 */}
                            <div>状態: </div>
                            <div>缶№：</div>

                            {/* Field cuối */}
                            <div className="sm:col-span-2">所要時間：</div>
                        </div>

                        {/* Button 編集 */}
                        <div className="flex justify-end">
                            <button className="bg-[#3d3427] text-white px-6 py-2 rounded-md">
                                編集
                            </button>
                        </div>
                    </div>

                    {/* Right column: Number inputs */}
                    <div className="flex flex-col space-y-4">

                        <div className="bg-[#eecbcb] p-4 rounded-lg border-2 border-gray-400 flex-1 mt-5">
                            <p className="text-sm">品番：</p>
                            <p className="text-sm">ロット№：</p>
                            <p className="font-bold text-sm">良品数：個</p>
                        </div>


                        <label className="block text-sm font-medium text-black mb-2">良品数</label>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-green-200 border-2 border-amber-800 rounded-md px-3 py-3 text-center font-medium">
                                {formData.adjustmentItems ? `${formData.adjustmentItems} 個` : "入力はこちら→"}
                            </div>
                            <Button
                                onClick={() => setNumpadTarget("items")}
                                className="bg-amber-800 hover:bg-amber-900 text-white p-3 rounded-md"
                            >
                                ⌨
                            </Button>
                        </div>

                        <Button
                            className="bg-[#299fde] text-white px-12 py-4 rounded-lg text-xl font-bold"
                            onClick={handleFinish}
                        >
                            修正する
                        </Button>

                    </div>
                </div>
            </div>

            {/* Numpad Modal */}
            <NumpadModal
                open={!!numpadTarget}
                onClose={() => setNumpadTarget(null)}
                initialValue={
                    numpadTarget === "items"
                        ? formData.adjustmentItems
                        : ""
                }
                onConfirm={(val) => {
                    if (numpadTarget === "items") {
                        setFormData((prev) => ({ ...prev, adjustmentItems: val }))
                    }
                }}
            />
        </PageLayout>
    )
}
