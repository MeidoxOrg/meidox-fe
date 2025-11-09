"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/layout/page-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NumpadModal } from "@/components/ui/numpad-modal"

export default function OperationEnd() {
    const router = useRouter()
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
        remark: "",
        shift: "",
        machineNumber: "",
        optionEdit: "numberOfGoodProduct",
        numberOfGoodProduct: "",
        canNumber: "",
        abnormalProductPieces: "",
        abnormalProductKg: ""
    })

    const [numpadTarget, setNumpadTarget] = useState<null | "numberOfGoodProducts" | "canNumber" | "abnormalProductPieces" | "abnormalProductKg">(null)

    const handleFinish = () => router.push("/home")

    const handleRenderComponent = () => {
        switch (formData.optionEdit) {
            case "numberOfGoodProduct":
                return <>
                    <div className="bg-[#eecbcb] p-4 rounded-lg border-2 border-gray-400 flex-1 mt-5">
                        <p className="text-sm">品番：</p>
                        <p className="text-sm">ロット№：</p>
                        <p className="font-bold text-sm">良品数：個</p>
                    </div>

                    <label className="block text-sm font-medium text-black mb-2">良品数</label>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-green-200 border-2 border-amber-800 rounded-md px-3 py-3 text-center font-medium">
                            {formData.numberOfGoodProduct ? `${formData.numberOfGoodProduct} 個` : "入力はこちら→"}
                        </div>
                        <Button
                            onClick={() => setNumpadTarget("numberOfGoodProducts")}
                            className="bg-amber-800 hover:bg-amber-900 text-white p-3 rounded-md"
                        >
                            ⌨
                        </Button>
                    </div>
                </>
            case "canNumber":
                return <>
                    <div className="bg-[#eecbcb] p-4 rounded-lg border-2 border-gray-400 flex-1 mt-5">
                        <p className="text-sm">品番：</p>
                        <p className="text-sm">ロット№：</p>
                        <p className="font-bold text-sm">J缶№:</p>
                    </div>

                    <label className="block text-sm font-medium text-black mb-2">J缶№</label>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-green-200 border-2 border-amber-800 rounded-md px-3 py-3 text-center font-medium">
                            {formData.canNumber ? `${formData.canNumber}` : "入力はこちら→"}
                        </div>
                        <Button
                            onClick={() => setNumpadTarget("canNumber")}
                            className="bg-amber-800 hover:bg-amber-900 text-white p-3 rounded-md"
                        >
                            ⌨
                        </Button>
                    </div>
                </>
            case "abnormalProductPieces":
                return <>
                    <div className="bg-[#eecbcb] p-4 rounded-lg border-2 border-gray-400 flex-1 mt-5">
                        <p className="text-sm">品番：</p>
                        <p className="text-sm">ロット№：</p>
                        <p className="font-bold text-sm">異常品個数: 個</p>
                        <p className="font-bold text-sm">異常品重量: kg</p>
                    </div>

                    <label className="block text-sm font-medium text-black mb-2">異常品個数</label>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-green-200 border-2 border-amber-800 rounded-md px-3 py-3 text-center font-medium">
                            {formData.abnormalProductPieces ? `${formData.abnormalProductPieces}個` : "入力はこちら→"}
                        </div>
                        <Button
                            onClick={() => setNumpadTarget("abnormalProductPieces")}
                            className="bg-amber-800 hover:bg-amber-900 text-white p-3 rounded-md"
                        >
                            ⌨
                        </Button>
                    </div>

                    <label className="block text-sm font-medium text-black mb-2">異常品重量</label>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-green-200 border-2 border-amber-800 rounded-md px-3 py-3 text-center font-medium">
                            {formData.abnormalProductKg ? `${formData.abnormalProductKg}kg` : "入力はこちら→"}
                        </div>
                        <Button
                            onClick={() => setNumpadTarget("abnormalProductKg")}
                            className="bg-amber-800 hover:bg-amber-900 text-white p-3 rounded-md"
                        >
                            ⌨
                        </Button>
                    </div>
                </>
            default:
                return ""
        }
    }

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
                            value={formData.optionEdit}
                            onValueChange={(value) => setFormData((prev) => ({ ...prev, optionEdit: value }))}
                        >
                            <SelectTrigger className="w-full border-2 border-amber-800 bg-white">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-amber-800 text-white">
                                <SelectItem value="numberOfGoodProduct" className="hover:bg-amber-700">良品数</SelectItem>
                                <SelectItem value="canNumber" className="hover:bg-amber-700">J缶№</SelectItem>
                                <SelectItem value="abnormalProductPieces" className="hover:bg-amber-700">異常品個数・重量</SelectItem>
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
                        {handleRenderComponent()}
                        <Button
                            className="bg-[#299fde] text-white px-12 py-4 rounded-lg text-xl font-bold"
                            onClick={handleFinish}
                        >
                            修正する
                        </Button>

                    </div>
                </div>
            </div>

            <NumpadModal
                open={!!numpadTarget}
                onClose={() => setNumpadTarget(null)}
                title={
                    numpadTarget === "numberOfGoodProducts"
                        ? "良品数（個）入力"
                        : numpadTarget === "canNumber"
                            ? "J缶№入力"
                            : numpadTarget === "abnormalProductPieces"
                                ? "異常品（個）入力"
                                : numpadTarget === "abnormalProductKg"
                                    ? "異常品（kg）入力"
                                    : "数字入力"
                }
                initialValue={
                    numpadTarget === "numberOfGoodProducts"
                        ? formData.numberOfGoodProduct
                        : numpadTarget === "canNumber"
                            ? formData.canNumber
                            : numpadTarget === "abnormalProductPieces"
                                ? formData.abnormalProductPieces
                                : numpadTarget === "abnormalProductKg"
                                    ? formData.abnormalProductKg
                                    : ""
                }
                onConfirm={(val) => {
                    if (numpadTarget === "numberOfGoodProducts") {
                        setFormData((prev) => ({ ...prev, numberOfGoodProduct: val }))
                        // handleUpdateNumberOfGoodProducts(val)
                    } else if (numpadTarget === "canNumber") {
                        setFormData((prev) => ({ ...prev, canNumber: val }))
                        // handleUpdateCanNumber(val)
                    } else if (numpadTarget === "abnormalProductPieces") {
                        setFormData((prev) => ({ ...prev, abnormalProductPieces: val }))
                        // handleUpdateAbnormalProductPieces(val)
                    } else if (numpadTarget === "abnormalProductKg") {
                        setFormData((prev) => ({ ...prev, abnormalProductKg: val }))
                        // handleUpdateAbnormalProductKg(val)
                    }
                }}
            />

        </PageLayout>
    )
}
