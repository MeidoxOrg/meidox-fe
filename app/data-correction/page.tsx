"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/layout/page-layout"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { NumpadModal } from "@/components/ui/numpad-modal"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import workSessionProduction from "@/services/work-session-production"
import { WORKSESSION_ID } from "@/utils/constants"
import { localStorageService } from "@/helper/localstorage"
import { getLatestCompletedAbnormalHandling, getLatestCompletedSession } from "@/utils/function"
import { toast } from "sonner"
import workSessionAbnormalHandlingServies from "@/services/abnormal-handling​"
import { WorkShift } from "@/model/work-shift"
import { Machine } from "@/model/machines"
import workShiftServices from "@/services/work-shift"
import machinesServices from "@/services/machines"

export default function OperationEnd() {
    const now = new Date()
    const currentDate = now.toISOString().split("T")[0]

    const [formData, setFormData] = useState({
        productNumber: "",
        lotNumber: "",
        materialNumber: "",
        startDate: currentDate,
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

    const [errors, setErrors] = useState({
        numberOfGoodProduct: "",
        canNumber: "",
        abnormalProductPieces: "",
        abnormalProductKg: ""
    })

    const [openConfirmNumberOfGoodProduct, setOpenConfirmNumberOfGoodProduct] = useState(false)
    const [openConfirmCanNumber, setOpenConfirmCanNumber] = useState(false)
    const [openAbnormalItems, setOpenAbnormalItems] = useState(false)
    const [workShiftData, setWorkShiftData] = useState<WorkShift[]>([]);
    const [machineData, setMachinesData] = useState<Machine[]>([]);

    const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")



    const [numpadTarget, setNumpadTarget] = useState<null | "numberOfGoodProducts" | "canNumber" | "abnormalProductPieces" | "abnormalProductKg">(null)

    const handleFinish = async () => {
        try {
            const response = await workSessionProduction.getWorkSessionProductionByWsId(workSessionId);
            const latestCompleted = getLatestCompletedSession(response.workSessionProductions)
            if (latestCompleted) {
                const res = workSessionProduction.updateNumberOfGoodProduct(latestCompleted.id, parseInt(formData.numberOfGoodProduct))
                if ((await res).id) {
                    toast.success("情報が正常に更新されました！")
                    setErrors((prev) => ({ ...prev, numberOfGoodProduct: "" }))
                }
            } else {
                toast.error("該当する情報が見つからなかったため、更新できませんでした。")
            }
            setOpenConfirmNumberOfGoodProduct(false)
        } catch (error) {
            console.error("Lỗi:", error)
        }
    }

    const handleFinishCanNumber = async () => {
        try {
            const response = await workSessionProduction.getWorkSessionProductionByWsId(workSessionId);
            const latestCompleted = getLatestCompletedSession(response.workSessionProductions)
            if (latestCompleted) {
                const res = workSessionProduction.updateCanNumber(latestCompleted.id, formData.canNumber)
                if ((await res).id) {
                    toast.success("情報が正常に更新されました！")
                    setErrors((prev) => ({ ...prev, canNumber: "" }))
                }
            } else {
                toast.error("該当する情報が見つからなかったため、更新できませんでした。")
            }
            setOpenConfirmCanNumber(false)
        } catch (error) {
            console.error("Lỗi:", error)
        }
    }

    const handleFinishAbnormalItems = async () => {
        try {
            const response = await workSessionAbnormalHandlingServies.getWorkSessionAbnormalHandlingByWsId(workSessionId);
            const latestCompleted = getLatestCompletedAbnormalHandling(response.abnormalHandlings)
            if (latestCompleted) {
                const resPieces = workSessionAbnormalHandlingServies.updateAbnormalProductPiecesHandling(latestCompleted.id, parseInt(formData.abnormalProductPieces))
                const resKg = workSessionAbnormalHandlingServies.updateAbnormalProductKgHandling(latestCompleted.id, parseInt(formData.abnormalProductKg))
                if ((await resPieces).id && (await resKg).id) {
                    toast.success("情報が正常に更新されました！")
                    setErrors((prev) => ({ ...prev, abnormalProductPieces: "", abnormalProductKg: "" }))
                }
            } else {
                toast.error("該当する情報が見つからなかったため、更新できませんでした。")
            }
            setOpenAbnormalItems(false)
        } catch (error) {
            console.error("Lỗi:", error)
        }
    }

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
                    {errors.numberOfGoodProduct && (
                        <p className="text-red-600 text-sm mt-1">{errors.numberOfGoodProduct}</p>
                    )}

                    <Button
                        className="bg-[#299fde] text-white px-12 py-4 rounded-lg text-xl font-bold"
                        onClick={() => {
                            let hasError = false
                            if (!formData.numberOfGoodProduct) {
                                setErrors((prev) => ({ ...prev, numberOfGoodProduct: "良品数を入力してください。" }))
                                hasError = true
                            }
                            if (hasError) return
                            setOpenConfirmNumberOfGoodProduct(true)
                        }}
                    >
                        修正する
                    </Button>

                    <AlertDialog open={openConfirmNumberOfGoodProduct} onOpenChange={setOpenConfirmNumberOfGoodProduct}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle></AlertDialogTitle>
                                <AlertDialogDescription>
                                    {`良品数を個から${formData.numberOfGoodProduct}個に変更します。
                                    よろしいですか？`}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>戻る</AlertDialogCancel>
                                <AlertDialogAction onClick={handleFinish}>
                                    変更する
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
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
                    {errors.canNumber && (
                        <p className="text-red-600 text-sm mt-1">{errors.canNumber}</p>
                    )}

                    <Button
                        className="bg-[#299fde] text-white px-12 py-4 rounded-lg text-xl font-bold"
                        onClick={() => {
                            let hasError = false
                            if (!formData.canNumber) {
                                setErrors((prev) => ({ ...prev, canNumber: "J缶№を入力してください。" }))
                                hasError = true
                            }
                            if (hasError) return
                            setOpenConfirmCanNumber(true)
                        }}
                    >
                        修正する
                    </Button>

                    <AlertDialog open={openConfirmCanNumber} onOpenChange={setOpenConfirmCanNumber}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle></AlertDialogTitle>
                                <AlertDialogDescription>
                                    {`J缶№をから${formData.canNumber}に変更します。よろしいですか？`}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>戻る</AlertDialogCancel>
                                <AlertDialogAction onClick={handleFinishCanNumber}>
                                    変更する
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

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
                    {errors.abnormalProductPieces && (
                        <p className="text-red-600 text-sm mt-1">{errors.abnormalProductPieces}</p>
                    )}

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

                    {errors.abnormalProductKg && (
                        <p className="text-red-600 text-sm mt-1">{errors.abnormalProductKg}</p>
                    )}

                    <Button
                        className="bg-[#299fde] text-white px-12 py-4 rounded-lg text-xl font-bold"
                        onClick={() => {
                            let hasError = false
                            if (!formData.abnormalProductPieces) {
                                setErrors((prev) => ({ ...prev, abnormalProductPieces: "異常品（個）を入力してください。", }))
                                hasError = true
                            }
                            if (!formData.abnormalProductKg) {
                                setErrors((prev) => ({ ...prev, abnormalProductKg: "異常品（kg）を入力してください。" }))
                                hasError = true
                            }
                            if (hasError) return
                            setOpenAbnormalItems(true)
                        }}
                    >
                        修正する
                    </Button>

                    <AlertDialog open={openAbnormalItems} onOpenChange={setOpenAbnormalItems}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle></AlertDialogTitle>
                                <AlertDialogDescription>
                                    {`異常品個数を個から${formData.abnormalProductPieces}個に、
                                    異常品重量をkgから${formData.abnormalProductKg}kgに変更します。
                                    よろしいですか？`}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>戻る</AlertDialogCancel>
                                <AlertDialogAction onClick={handleFinishAbnormalItems}>
                                    変更する
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </>
            default:
                return ""
        }
    }

    const getWorkShitfData = useCallback(async () => {
        await workShiftServices.getWorkShiftData().then((res) => {
            setWorkShiftData(res.workShifts.data);
            setFormData((prev) => ({ ...prev, shift: res.workShifts.data[0].id }))
        }).catch((error) => {
            console.log(error);
        });;
    }, [])

    const getMachinesData = useCallback(async () => {
        await machinesServices.getMachinesData().then((res) => {
            setMachinesData(res.machines.data);
            setFormData((prev) => ({ ...prev, machineNumber: res.machines.data[0].id }))
        }).catch((error) => {
            console.log(error);
        });;
    }, [])

    useEffect(() => {
        getWorkShitfData();
        getMachinesData();
    }, [getWorkShitfData, getMachinesData])

    return (
        <PageLayout title="">
            <div className="max-w-5xl mx-auto bg-sky-100 p-6 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData((prev) => ({ ...prev, startDate: e.target.value }))}
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
                                {workShiftData.length > 0 && workShiftData.map((item) =>
                                    <SelectItem
                                        key={item.id}
                                        value={item.id}>{item.name}</SelectItem>
                                )}
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
                                {machineData.length > 0 && machineData.map((item) =>
                                    <SelectItem key={item.id} value={item.id}>{item.machineNumber}</SelectItem>

                                )}
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
                        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>日付：</div>
                            <div>品番：</div>

                            <div>日時：</div>
                            <div>ロット№：</div>

                            <div>名前: </div>
                            <div>良品数：</div>

                            <div>状態: </div>
                            <div>缶№：</div>

                            <div className="sm:col-span-2">所要時間：</div>
                        </div>

                        <div className="flex justify-end">
                            <button className="bg-[#3d3427] text-white px-6 py-2 rounded-md">
                                編集
                            </button>
                        </div> */}
                    </div>

                    {/* Right column: Number inputs */}
                    <div className="flex flex-col space-y-4">
                        {handleRenderComponent()}
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
