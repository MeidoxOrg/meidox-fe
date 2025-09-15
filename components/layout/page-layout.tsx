// Main page layout wrapper
"use client"

import type React from "react"

import { Header } from "./header"

interface PageLayoutProps {
  title: string
  showBackButton?: boolean
  rightContent?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function PageLayout({ title, showBackButton = true, rightContent, children, className = "" }: PageLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-200 ${className}`}>
      <Header title={title} showBackButton={showBackButton} rightContent={rightContent} />
      <main className="p-4">{children}</main>
    </div>
  )
}
