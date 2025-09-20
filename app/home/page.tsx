"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
    const router = useRouter()
    const [showMessage, setShowMessage] = useState(true)

    const mainGridButtons = [
        { label: "段取り", color: "bg-blue-500 hover:bg-blue-600", route: "/setup-start" },
        { label: "調整", color: "bg-blue-500 hover:bg-blue-600", route: "/adjustment-begins" },
        { label: "4S", color: "bg-blue-500 hover:bg-blue-600", route: "/4S" },
        { label: "給油", color: "bg-blue-500 hover:bg-blue-600", route: "/refuel" },
        { label: "金型交換", color: "bg-blue-500 hover:bg-blue-600", route: "/mold-change" },
        { label: "生産準備\n暖機運転\n保全チェック", color: "bg-blue-500 hover:bg-blue-600", route: "/production-prep-check" },
        { label: "選別", color: "bg-blue-500 hover:bg-blue-600", route: "/sorting" },
        { label: "その他停止", color: "bg-blue-500 hover:bg-blue-600", route: "/other-stop" },
        { label: "材料交換", color: "bg-blue-500 hover:bg-blue-600", route: "/material-change" },
        { label: "他機対応", color: "bg-blue-500 hover:bg-blue-600", route: "/other-machine-support" },
        { label: "品質チェック", color: "bg-blue-500 hover:bg-blue-600", route: "/quality-check" },
        { label: "", color: "invisible", route: "#" },
        { label: "異常処置", color: "bg-red-500 hover:bg-red-600", route: "/abnormal-handling" },
        { label: "設備故障\n設備修理", color: "bg-red-500 hover:bg-red-600", route: "/equipment-repair" },
        { label: "無人運転\n(昼休憩)", color: "bg-green-600 hover:bg-green-700", route: "/unmanned-lunch" },
        { label: "無人運転\n(残業)", color: "bg-green-600 hover:bg-green-700", route: "/unmanned-operation-overtime" },
    ]

    const rightSideButtons = [
        { label: "休憩", route: "/reason-for-stopping/break-start" },
        { label: "かんばんなし", route: "/reason-for-stopping/no-kanban-start" },
        { label: "ミーティング", route: "/reason-for-stopping/meeting-start" },
        { label: "材料・金型\n欠品", route: "#" },
        { label: "計画保全", route: "#" },
        { label: "作業者なし", route: "#" },
        { label: "4S\n(昼休憩後)", route: "#" },
        { label: "その他\n計画停止", route: "#" },
    ]

    const topButtons = [
        { label: "生産開始", color: "bg-yellow-300 hover:bg-yellow-400 text-black", route: "/work-start" },
        { label: "作業終了\n(廃却品の入力\nへ)", color: "bg-yellow-300 hover:bg-yellow-400 text-black", route: "/work-end" },
        { label: "編集画面へ", color: "bg-amber-800 hover:bg-amber-900 text-white", route: "/edit" },
    ]

    return (
        <div className="min-h-screen bg-gray-200 relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{ backgroundImage: `url('/industrial-machinery-gear-mechanical-parts-graysca.jpg')` }}
            />
            <div className="relative z-10 p-4 space-y-6">
                {/* Header Row */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Back + Message + Start */}
                    <div className="flex-1 flex gap-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push("/")}
                            className="p-2 h-12 w-12 rounded-full bg-white border-2 border-gray-400"
                        >
                            ←
                        </Button>

                        <div className="bg-pink-200 p-4 rounded-lg border-2 border-gray-400 flex-1">
                            <p className="font-bold text-sm">CHT11 作業中です。</p>
                            <p className="text-sm">機械番号が間違っていた場合は作業終了してください。</p>
                        </div>

                        <Button className="h-20 w-28 text-sm font-bold rounded-lg bg-yellow-300 text-black">
                            生産開始
                        </Button>
                    </div>

                    {/* Right small buttons */}
                    <div className="grid grid-cols-2 gap-3 w-full md:w-80">
                        <Button className="h-20 text-sm font-bold rounded-lg bg-yellow-300 text-black">作業終了</Button>
                        <Button className="h-20 text-sm font-bold rounded-lg bg-amber-800 text-white">編集画面へ</Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Main Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 flex-1">
                        {mainGridButtons.map((button, index) =>
                            button.label ? (
                                <Button
                                    key={index}
                                    onClick={() => router.push(button.route)}
                                    className={`h-20 text-sm font-bold whitespace-pre-line rounded-lg ${button.color}`}
                                >
                                    {button.label}
                                </Button>
                            ) : (
                                <div key={index} className="h-20" />
                            )
                        )}
                    </div>

                    {/* Right Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-3 w-full md:w-80">
                        {rightSideButtons.map((button, index) => (
                            <Button
                                key={index}
                                onClick={() => router.push(button.route)}
                                className="h-20 text-sm font-bold whitespace-pre-line rounded-lg bg-white border-2 border-gray-400 text-black"
                            >
                                {button.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
