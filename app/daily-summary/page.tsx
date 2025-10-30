"use client"

import { useCallback, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Home } from "lucide-react"
import workSessionServices from "@/services/work-session"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ID } from "@/utils/constants"
import { WorkSessionSetupByWs } from "@/model/work-session"
import { formatDateToJapanese, formatTimeToJapanese } from "@/utils/time-utils"
import { useSession } from "next-auth/react"


export default function DailySummaryPage() {
    const [selectedDate] = useState("2025年8月28日")
    const [shift] = useState("黄")
    const [machine] = useState("CPH35")
    const { data: session } = useSession()

    const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

    const [dataWorkSessionSetup, setDataWorkSessionSetup] = useState<WorkSessionSetupByWs[]>([])

    const getDataWorkSessionSetupByWsId = useCallback(async () => {
        try {
            const response = await workSessionServices.getWorkSessionSetupByWsId(workSessionId);
            setDataWorkSessionSetup(response.workSessionSetups);
        } catch (error) {

        }
    }, [])

    useEffect(() => {
        getDataWorkSessionSetupByWsId()
    }, [getDataWorkSessionSetupByWsId])

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
                {/* LEFT SIDE */}
                <div className="w-full md:w-1/2 overflow-y-auto p-3 bg-gray-50 border-r border-gray-200">
                    {dataWorkSessionSetup.length > 0 && dataWorkSessionSetup?.map((item, idx) => (
                        <Card key={idx} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                            <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                <p>{formatDateToJapanese(item?.dateStart)}</p>
                                <p>{formatTimeToJapanese(item?.timeStart)}</p>
                                <p className="text-right">{item.productNumber}</p>

                                <p>{session?.user?.username}</p>
                                <p>段取り開始</p>
                                <p className="text-right">{item.lotNumber}</p>

                                <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* RIGHT SIDE */}
                {/* RIGHT SIDE */}
                <div className="w-full md:w-1/2 overflow-y-auto p-4 bg-white">
                    {/* Top summary numbers */}
                    <div className="grid grid-cols-4 gap-2 text-sm mb-4">
                        <SummaryItem label="標準加工数" value="10800個" />
                        <SummaryItem label="負荷時間" value="557分" />
                        <SummaryItem label="停止時間" value="195分" />
                        <SummaryItem label="稼働時間" value="362分" />

                        <SummaryItem label="操業時間" value="658分" />
                        <SummaryItem label="良品数" value="48180個" />
                        <SummaryItem label="異常数" value="700個" />
                        <SummaryItem label="段取回数" value="2回" />
                    </div>

                    {/* Table 1: operations */}
                    <div className="border border-gray-300 rounded-md mb-4 p-2 bg-yellow-50">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                            <SummaryItem label="段取り" value="135分" />
                            <SummaryItem label="金型交換" value="0分" />
                            <SummaryItem label="材料交換" value="39分" />
                            <SummaryItem label="調整" value="0分" />

                            <SummaryItem label="設備故障" value="0分" />
                            <SummaryItem label="異常処置" value="0分" />
                            <SummaryItem label="生産準備" value="0分" />
                            <SummaryItem label="他機対応" value="0分" />

                            <SummaryItem label="品質チェック" value="0分" />
                            <SummaryItem label="選別" value="0分" />
                            <SummaryItem label="4S" value="0分" />
                            <SummaryItem label="その他停止" value="21分" />
                        </div>
                    </div>

                    {/* Table 2: meetings and breaks */}
                    <div className="border border-gray-300 rounded-md mb-4 p-2 bg-rose-50">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                            <SummaryItem label="休憩" value="76分" />
                            <SummaryItem label="ミーティング" value="25分" />
                            <SummaryItem label="計画保全" value="0分" />
                            <SummaryItem label="4S（昼休憩後）" value="0分" />

                            <SummaryItem label="かんばんなし" value="0分" />
                            <SummaryItem label="材料・金型欠品" value="0分" />
                            <SummaryItem label="作業者なし" value="0分" />
                            <SummaryItem label="その他停止" value="0分" />
                        </div>
                    </div>

                    {/* Performance summary */}
                    <div className="grid grid-cols-4 gap-2 text-sm text-center">
                        <SummaryItem label="時間稼働率" value="65%" />
                        <SummaryItem label="性能稼働率" value="73.9%" />
                        <SummaryItem label="良品率" value="98.6%" />
                        <SummaryItem label="設備総合効率" value="47.4%" />
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
