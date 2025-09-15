// Header component with back button and title
"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface HeaderProps {
  title: string
  showBackButton?: boolean
  rightContent?: React.ReactNode
  className?: string
}

export function Header({ title, showBackButton = true, rightContent, className = "" }: HeaderProps) {
  const router = useRouter()

  return (
    <header className={`bg-gray-300 px-4 py-3 flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="p-2 rounded-full bg-gray-400 hover:bg-gray-500"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
      </div>
      {rightContent && <div className="text-sm text-gray-600 bg-green-200 px-3 py-1 rounded-full">{rightContent}</div>}
    </header>
  )
}
