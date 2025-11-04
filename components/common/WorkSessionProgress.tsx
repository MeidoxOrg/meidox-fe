"use client"

import { ReactNode } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { TimerDisplay } from "@/components/ui/timer-display"
import { Button } from "@/components/ui/button"

interface WorkSessionProgressProps {
    title: string
    rightContent?: string
    leftContent?: ReactNode
    middleContent?: ReactNode
    rightExtraContent?: ReactNode
    onComplete: () => void
    buttonLabel: string
    timerId?: string
}

export function WorkSessionProgress({
    title,
    rightContent,
    leftContent,
    middleContent,
    rightExtraContent,
    onComplete,
    buttonLabel,
    timerId = "default-timer"
}: WorkSessionProgressProps) {
    return (
        <PageLayout title={title} rightContent={rightContent}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left column */}
                    <div className="space-y-6">{leftContent}</div>

                    {/* Middle column */}
                    <div className="space-y-6">{middleContent}</div>

                    {/* Right column */}
                    <div className="space-y-6 flex flex-col">
                        <div className="flex justify-center">
                            <TimerDisplay timerId={timerId} autoStart />
                        </div>

                        {rightExtraContent}

                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                            <Button
                                onClick={onComplete}
                                className="w-full bg-amber-900 hover:bg-amber-800 text-white py-6 text-lg font-bold rounded-md"
                            >
                                {buttonLabel}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}
