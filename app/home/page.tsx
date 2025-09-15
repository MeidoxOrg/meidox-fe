// Main dashboard page with all function buttons
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
    const router = useRouter()
    const [showMessage, setShowMessage] = useState(true)

    const mainGridButtons = [
        // Row 1 - All blue
        { label: "段取り", color: "bg-blue-500 hover:bg-blue-600", route: "/setup-start" },
        { label: "調整", color: "bg-blue-500 hover:bg-blue-600", route: "#" },
        { label: "4S", color: "bg-blue-500 hover:bg-blue-600", route: "#" },
        { label: "給油", color: "bg-blue-500 hover:bg-blue-600", route: "#" },

        // Row 2 - All blue
        { label: "金型交換", color: "bg-blue-500 hover:bg-blue-600", route: "#" },
        { label: "生産準備\n暖機運転\n保全チェック", color: "bg-blue-500 hover:bg-blue-600", route: "#" },
        { label: "選別", color: "bg-blue-500 hover:bg-blue-600", route: "#" },
        { label: "その他停止", color: "bg-blue-500 hover:bg-blue-600", route: "#" },

        // Row 3 - Blue buttons with one empty space
        { label: "材料交換", color: "bg-blue-500 hover:bg-blue-600", route: "#" },
        { label: "他機対応", color: "bg-blue-500 hover:bg-blue-600", route: "#" },
        { label: "品質チェック", color: "bg-blue-500 hover:bg-blue-600", route: "#" },
        { label: "", color: "invisible", route: "#" }, // Empty space

        // Row 4 - Red and green buttons
        { label: "異常処置", color: "bg-red-500 hover:bg-red-600", route: "#" },
        { label: "設備故障\n設備修理", color: "bg-red-500 hover:bg-red-600", route: "#" },
        { label: "無人運転\n(昼休憩)", color: "bg-green-600 hover:bg-green-700", route: "/unmanned-lunch" },
        { label: "無人運転\n(残業)", color: "bg-green-600 hover:bg-green-700", route: "#" },
    ]

    const rightSideButtons = [
        { label: "休憩", color: "bg-white hover:bg-gray-50 text-black border-2 border-gray-400", route: "#" },
        {
            label: "かんばんなし",
            color: "bg-white hover:bg-gray-50 text-black border-2 border-gray-400",
            route: "#",
        },
        {
            label: "ミーティング",
            color: "bg-white hover:bg-gray-50 text-black border-2 border-gray-400",
            route: "#",
        },
        {
            label: "材料・金型\n欠品",
            color: "bg-white hover:bg-gray-50 text-black border-2 border-gray-400",
            route: "#",
        },
        {
            label: "計画保全",
            color: "bg-white hover:bg-gray-50 text-black border-2 border-gray-400",
            route: "#",
        },
        {
            label: "作業者なし",
            color: "bg-white hover:bg-gray-50 text-black border-2 border-gray-400",
            route: "#",
        },
        {
            label: "4S\n(昼休憩後)",
            color: "bg-white hover:bg-gray-50 text-black border-2 border-gray-400",
            route: "#",
        },
        {
            label: "その他\n計画停止",
            color: "bg-white hover:bg-gray-50 text-black border-2 border-gray-400",
            route: "#",
        },
    ]

    const topButtons = [
        { label: "生産開始", color: "bg-yellow-300 hover:bg-yellow-400 text-black", route: "/work-start" },
        {
            label: "作業終了\n(廃却品の入力\nへ)",
            color: "bg-yellow-300 hover:bg-yellow-400 text-black",
            route: "/work-end",
        },
        { label: "編集画面へ", color: "bg-amber-800 hover:bg-amber-900 text-white", route: "/edit" },
    ]

    return (
        <div className="min-h-screen bg-gray-200 relative overflow-hidden">
            <div
                className="absolute inset-0 opacity-20 bg-cover bg-center"
                style={{
                    backgroundImage: `url('/industrial-machinery-gear-mechanical-parts-graysca.jpg')`,
                }}
            />
            <div className="relative z-10 p-4">
                {/* Row: Back button + Message + 生産開始 */}
                <div className="flex items-start mb-4">
                    <div className="flex items-start gap-4 flex-1 pr-3.5">
                        {/* Back button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push('/')}
                            className="p-2 h-12 w-12 rounded-full bg-white border-2 border-gray-400 hover:bg-gray-50"
                        >
                            ←
                        </Button>

                        {/* Khung màu hồng chiếm phần lớn */}
                        <div className="bg-pink-200 p-4 rounded-lg border-2 border-gray-400 flex-1">
                            <p className="font-bold text-sm">CHT11 作業中です。</p>
                            <p className="text-sm">機械番号が間違っていた場合は作業終了してください。</p>
                        </div>

                        {/* Nút 生産開始, cùng size với nút xanh dương */}
                        <Button
                            style={{ background: "#dde67c" }}
                            className="h-20 w-32 text-sm font-bold whitespace-pre-line rounded-lg  hover:bg-yellow-400 text-black flex-shrink-0"
                        >
                            生産開始
                        </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-80">
                        {/* 作業終了 + 編集画面へ as same style as white buttons */}
                        <Button
                            style={{ background: "#dde67c" }}
                            className="h-20 text-sm font-bold whitespace-pre-line rounded-lg bg-white hover:bg-gray-50 text-black border-2 border-gray-400 col-span-1"
                        >
                            作業終了{"\n"}(廃却品の入力へ)
                        </Button>
                        <Button
                            style={{ background: "#533602" }}
                            className="h-20 text-sm font-bold whitespace-pre-line rounded-lg text-white hover:bg-gray-50  border-2 border-gray-400 col-span-1"
                        >
                            編集画面へ
                        </Button>
                    </div>
                </div>

                <div className="flex gap-4">
                    {/* Left grid 4x4 */}
                    <div className="grid grid-cols-4 gap-3 flex-1">
                        {mainGridButtons.map((button, index) =>
                            button.label ? (
                                <Button
                                    key={index}
                                    onClick={() => router.push(button.route)}
                                    className={`h-20 text-sm font-bold whitespace-pre-line rounded-lg ${button.color} text-white`}
                                >
                                    {button.label}
                                </Button>
                            ) : (
                                <div key={index} className="h-20" />
                            ),
                        )}
                    </div>

                    {/* Right side */}
                    <div className="grid grid-cols-2 gap-3 w-80">
                        {rightSideButtons.map((button, index) => (
                            <Button
                                key={index}
                                className={`h-20 text-sm font-bold whitespace-pre-line rounded-lg ${button.color}`}
                                style={{ background: "#fff9eb" }}
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
