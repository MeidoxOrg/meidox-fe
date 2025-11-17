"use client"

import { useRouter } from "next/navigation"

export default function ProductionReportPage() {
    const router = useRouter();

    return (
        <div className="relative h-screen w-full overflow-hidden">
            {/* Background */}

            {/* Overlay */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-12">
                {/* Title */}
                <div className="flex items-center space-x-3">
                    <h1 className="text-5xl font-bold text-black drop-shadow-md">生産報告書</h1>

                </div>

                {/* Buttons */}
                <div className="flex flex-col items-center space-y-6">
                    {/* Row 1 */}
                    <div className="flex space-x-8">
                        <button
                            onClick={() => router.push("/work-start")}
                            className="bg-[#4b3b2b] hover:bg-[#3b2e20] text-white text-xl px-12 py-6 rounded-md shadow-lg transition-all">
                            作業を始める
                        </button>

                        <button
                            onClick={() => router.push("/daily-summary")}
                            className="bg-[#4b3b2b] hover:bg-[#3b2e20] text-white text-xl px-12 py-6 rounded-md shadow-lg transition-all">
                            一覧へ
                        </button>
                    </div>
                    <div className="flex space-x-8">
                        <button
                            onClick={() => router.push("/data-correction")}
                            className="bg-[#4b3b2b] hover:bg-[#3b2e20] text-white text-xl px-12 py-6 rounded-md shadow-lg transition-all">
                            良品数・J缶No・異常品個数<br />編集
                        </button>

                        <button
                            onClick={() => router.push("/master-data")}
                            className="bg-[#4b3b2b] hover:bg-[#3b2e20] text-white text-xl px-12 py-6 rounded-md shadow-lg transition-all">
                            マスタ管理
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
