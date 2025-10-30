"use client"

import { useCallback, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home } from "lucide-react"
import workSessionServices from "@/services/work-session"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ID } from "@/utils/constants"
import { WorkSessionSetupByWs } from "@/model/work-session"
import { formatDateToJapanese, formatTimeToJapanese } from "@/utils/time-utils"
import { useSession } from "next-auth/react"
import workSessionProduction from "@/services/work-session-production"
import { WorkSessionProductionByWsId } from "@/model/work-session-production"


export default function DailySummaryPage() {
    const [selectedDate] = useState("2025年8月28日")
    const [shift] = useState("黄")
    const [machine] = useState("CPH35")
    const { data: session } = useSession()

    const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

    const [totalSetupTime, setTotalSetupTime] = useState<number>()
    const [dataWorkSessionSetup, setDataWorkSessionSetup] = useState<WorkSessionSetupByWs[]>([])
    const [dataWorkSessionProduction, setDataWorkSessionProduction] = useState<WorkSessionProductionByWsId[]>([])

    const getDataWorkSessionSetupByWsId = useCallback(async () => {
        try {
            const response = await workSessionServices.getWorkSessionSetupByWsId(workSessionId);
            setDataWorkSessionSetup(response.workSessionSetups);
        } catch (error) {

        }
    }, [])

    const getDataWorkSessionProductionByWsId = useCallback(async () => {
        try {
            const response = await workSessionProduction.getWorkSessionProductionByWsId(workSessionId);
            setDataWorkSessionProduction(response.workSessionProductions);
        } catch (error) {

        }
    }, [])

    const calculateStandardProcessingQuantity = (
        productions: WorkSessionProductionByWsId[]
    ): number => {
        if (!productions?.length) return 0
        return productions.reduce(
            (sum, item) => sum + (item.numberOfGoodProduct || 0),
            0
        )
    }

    const calculateDefectQuantity = (
        productions: WorkSessionSetupByWs[]
    ): number => {
        if (!productions?.length) return 0
        return productions.reduce(
            (sum, item) => sum + (item.adjustmentItemUnit || 0),
            0
        )
    }

    const calculateTotalSetupDurationMinutes = (
        setups: WorkSessionSetupByWs[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    useEffect(() => {
        getDataWorkSessionSetupByWsId()
        getDataWorkSessionProductionByWsId()
    }, [getDataWorkSessionSetupByWsId, getDataWorkSessionProductionByWsId])

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between p-3 bg-white border-b border-gray-300">
                <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold flex items-center">
                        <span className="mr-2">一覧</span>
                        {/* <img src="/logo.png" alt="logo" className="h-8" /> */}
                    </h1>
                </div>

                <div className="flex items-center space-x-2">
                    <Input value={selectedDate} readOnly className="w-36 text-center" />
                    <Input value={shift} readOnly className="w-12 text-center" />
                    <Input value={machine} readOnly className="w-20 text-center" />
                    <Button variant="ghost" size="icon">
                        <Home className="text-amber-800" />
                    </Button>
                </div>
            </header>

            {/* Main content: left list + right summary */}
            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                {/* LEFT SIDE */}
                <div className="w-full md:w-1/2 overflow-y-auto p-3 bg-gray-50 border-r border-gray-200">
                    {dataWorkSessionSetup.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>段取り開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>段取り完了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESIONPRODUCTION */}

                    {dataWorkSessionProduction.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>生産開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>生産終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                </div>

                {/* RIGHT SIDE */}
                <div className="w-full md:w-1/2 overflow-y-auto p-4 bg-white">
                    {/* Top summary numbers */}
                    <div className="grid grid-cols-4 gap-2 text-sm mb-4">
                        <SummaryItem label="標準加工数" value={`${calculateStandardProcessingQuantity(dataWorkSessionProduction)}個`} />
                        <SummaryItem label="負荷時間" value="X分" />
                        <SummaryItem label="停止時間" value="X分" />
                        <SummaryItem label="稼働時間" value="X分" />

                        <SummaryItem label="操業時間" value="X分" />
                        <SummaryItem label="良品数" value="X個" />
                        <SummaryItem label="異常数" value={`${calculateDefectQuantity(dataWorkSessionSetup)}個`} />
                        <SummaryItem label="段取回数" value={`${dataWorkSessionSetup.length}回`} />
                    </div>

                    {/* Table 1: operations */}
                    <div className="border border-gray-300 rounded-md mb-4 p-2 bg-yellow-50">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                            <SummaryItem label="段取り" value={`${calculateTotalSetupDurationMinutes(dataWorkSessionSetup)}分`} />
                            <SummaryItem label="金型交換" value="X分" />
                            <SummaryItem label="材料交換" value="X分" />
                            <SummaryItem label="調整" value="X分" />

                            <SummaryItem label="設備故障" value="X分" />
                            <SummaryItem label="異常処置" value="X分" />
                            <SummaryItem label="生産準備" value="X分" />
                            <SummaryItem label="他機対応" value="X分" />

                            <SummaryItem label="品質チェック" value="X分" />
                            <SummaryItem label="選別" value="X分" />
                            <SummaryItem label="4S" value="X分" />
                            <SummaryItem label="その他停止" value="X分" />
                        </div>
                    </div>

                    {/* Table 2: meetings and breaks */}
                    <div className="border border-gray-300 rounded-md mb-4 p-2 bg-rose-50">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                            <SummaryItem label="休憩" value="X分" />
                            <SummaryItem label="ミーティング" value="X分" />
                            <SummaryItem label="計画保全" value="X分" />
                            <SummaryItem label="4S（昼休憩後）" value="X分" />

                            <SummaryItem label="かんばんなし" value="X分" />
                            <SummaryItem label="材料・金型欠品" value="X分" />
                            <SummaryItem label="作業者なし" value="X分" />
                            <SummaryItem label="その他停止" value="X分" />
                        </div>
                    </div>

                    {/* Performance summary */}
                    <div className="grid grid-cols-4 gap-2 text-sm text-center">
                        <SummaryItem label="時間稼働率" value="X%" />
                        <SummaryItem label="性能稼働率" value="X%" />
                        <SummaryItem label="良品率" value="X%" />
                        <SummaryItem label="設備総合効率" value="X%" />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper component
function SummaryItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-1 border border-gray-200 rounded-sm bg-white">
            <span className="text-xs text-gray-600">{label}</span>
            <span className="font-semibold text-gray-900">{value}</span>
        </div>
    )
}
