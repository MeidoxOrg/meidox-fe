"use client"

import { Card } from "@/components/ui/card"
import { formatDateToJapanese, formatTimeToJapanese } from "@/utils/time-utils"
import { useSession } from "next-auth/react"

interface WorkSessionCardListProps<T> {
    data: T[]
    startLabel: string
    endLabel: string
    getProductNumber?: (item: T) => string
    getLotNumber?: (item: T) => string
    getMaterialNumber?: (item: T) => string
    getDateStart?: (item: T) => string
    getTimeStart?: (item: T) => string
    getDateComplete?: (item: T) => string | null
    getTimeComplete?: (item: T) => string | null
}

export function WorkSessionCardList<T>({
    data,
    startLabel,
    endLabel,
    getProductNumber = (item: any) => item.productNumber,
    getLotNumber = (item: any) => item.lotNumber,
    getMaterialNumber = (item: any) => item.materialNumber,
    getDateStart = (item: any) => item.dateStart,
    getTimeStart = (item: any) => item.timeStart,
    getDateComplete = (item: any) => item.dateComplete,
    getTimeComplete = (item: any) => item.timeComplete,
}: WorkSessionCardListProps<T>) {
    const { data: session } = useSession()

    return (
        <>
            {data.map((item, idx) => {
                const startDate = getDateStart(item)
                const startTime = getTimeStart(item)
                const endDate = getDateComplete(item)
                const endTime = getTimeComplete(item)

                const start = new Date(`${startDate}T${startTime}`)
                const end = endDate && endTime ? new Date(`${endDate}T${endTime}`) : null
                const diffMinutes = end ? Math.round((end.getTime() - start.getTime()) / 60000) : 0

                return (
                    <div key={idx}>
                        {/* 開始カード */}
                        <Card className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                            <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                <p>{formatDateToJapanese(startDate)}</p>
                                <p>{formatTimeToJapanese(startTime)}</p>
                                <p className="text-right">{getProductNumber(item)}</p>

                                <p>{session?.user?.username}</p>
                                <p>{startLabel}</p>
                                <p className="text-right">{getLotNumber(item)}</p>

                                <p className="col-span-3 mt-1 text-right">{getMaterialNumber(item)}</p>
                            </div>
                        </Card>

                        {/* 完了カード */}
                        {end && (
                            <Card className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                    <p>{formatDateToJapanese(startDate)}</p>
                                    <p>{formatTimeToJapanese(endTime ?? "")}</p>
                                    <p className="text-right">{getProductNumber(item)}</p>

                                    <p>{session?.user?.username}</p>
                                    <p>{endLabel}</p>
                                    <p className="text-right">{getLotNumber(item)}</p>

                                    <p className="col-span-3 mt-1 text-right">{diffMinutes}分</p>
                                    <p className="col-span-3 mt-1 text-right">{getMaterialNumber(item)}</p>
                                </div>
                            </Card>
                        )}
                    </div>
                )
            })}
        </>
    )
}
