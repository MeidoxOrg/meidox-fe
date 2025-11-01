"use client"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Scanner } from "@yudiel/react-qr-scanner"
import React from "react"

interface SetupFormLayoutProps {
    form: any
    onSubmit: (data: any) => void

    // --- QR dữ liệu ---
    kanbanData: string
    materialData: string
    isScanningKanban: boolean
    isScanningMaterialData: boolean

    // --- QR handlers ---
    handleScanKanban: (value: string) => void
    handleScanMaterial: (value: string) => void
    setIsScanningKanban: (val: boolean) => void
    setIsScanningMaterialData: (val: boolean) => void

    // --- Label btn submit ---
    submitLabel: string
    showScanQR: boolean
}

export const SetupFormLayout: React.FC<SetupFormLayoutProps> = ({
    form,
    onSubmit,
    kanbanData,
    materialData,
    isScanningKanban,
    isScanningMaterialData,
    handleScanKanban,
    handleScanMaterial,
    setIsScanningKanban,
    setIsScanningMaterialData,
    submitLabel,
    showScanQR = true
}) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-stretch">
                    {/* Left column - Form inputs */}
                    <div className="flex flex-col space-y-6 h-full">
                        {/* 品番 */}
                        <FormField
                            control={form.control}
                            name="productNumber"
                            rules={{ required: "品番を入力してください。" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel style={{ color: "black" }}>品番（かんばん無い場合手入力も可）</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                    focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* ロット№ */}
                        <FormField
                            control={form.control}
                            name="lotNumber"
                            rules={{ required: "ロット№を入力してください。" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel style={{ color: "black" }}>ロット№</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                    focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 材料№ */}
                        <FormField
                            control={form.control}
                            name="materialNumber"
                            rules={{ required: "材料№を入力してください。" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel style={{ color: "black" }}>材料№</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                    focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* 2ロット入り */}
                        <div className="mt-auto">
                            <Button
                                type="button"
                                className="bg-amber-900 hover:bg-amber-800 text-white py-3 w-full text-lg font-bold rounded-md"
                            >
                                2ロット入り
                            </Button>
                        </div>
                    </div>

                    {/* Middle column - Kanban scanning */}
                    <div className={`flex flex-col justify-between h-full ${showScanQR ? "block" : "hidden"
                        }`}>
                        <div className="text-center w-full">
                            <p className="text-sm font-medium mb-2">↓かんばん読み込む↓</p>
                            <Button
                                type="button"
                                onClick={() => setIsScanningKanban(true)}
                                className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-bold rounded-md mb-3">
                                かんばん
                            </Button>

                            {isScanningKanban && (
                                <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50">
                                    <div className="bg-white p-4 rounded-md w-[90%] max-w-md text-center">
                                        <h2 className="font-bold text-lg mb-2">QRコードを読み込んでください</h2>
                                        <div className="w-full h-64 overflow-hidden rounded-md">
                                            <Scanner
                                                constraints={{ facingMode: "environment" }}
                                                onScan={(detectedCodes) => {
                                                    const rawValue = detectedCodes[0]?.rawValue
                                                    if (rawValue) {
                                                        handleScanKanban(rawValue)
                                                        setIsScanningKanban(false)
                                                    }
                                                }}
                                                onError={(error) => {
                                                    alert("カメラが利用できません。スマートフォンで開いてください。")
                                                    console.error(error)
                                                }}
                                                paused={false}
                                            />
                                        </div>
                                        <Button
                                            onClick={() => setIsScanningKanban(false)}
                                            className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
                                        >
                                            閉じる
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="border-2 border-amber-800 rounded-md bg-white h-40 flex items-center justify-center p-2">
                                <textarea
                                    className="w-full h-full border-none outline-none text-center text-sm resize-none 
                  whitespace-pre-wrap break-words overflow-y-auto"
                                    value={kanbanData}
                                    onChange={(e) => handleScanKanban(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right column - Material scanning */}
                    <div className={`flex flex-col justify-between h-full ${showScanQR ? "block" : "hidden"}`}>
                        <div className="text-center">
                            <p className="text-sm font-medium mb-2">↓材料エフ読み込む↓</p>
                            <Button
                                type="button"
                                onClick={() => setIsScanningMaterialData(true)}
                                className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-bold rounded-md mb-3">
                                材料
                            </Button>

                            {isScanningMaterialData && (
                                <div className="fixed inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-50">
                                    <div className="bg-white p-4 rounded-md w-[90%] max-w-md text-center">
                                        <h2 className="font-bold text-lg mb-2">QRコードを読み込んでください</h2>
                                        <div className="w-full h-64 overflow-hidden rounded-md">
                                            <Scanner
                                                constraints={{ facingMode: "environment" }}
                                                onScan={(detectedCodes) => {
                                                    const rawValue = detectedCodes[0]?.rawValue
                                                    if (rawValue) {
                                                        handleScanMaterial(rawValue)
                                                        setIsScanningMaterialData(false)
                                                    }
                                                }}
                                                onError={(error) => {
                                                    alert("カメラが利用できません。スマートフォンで開いてください。")
                                                    console.error(error)
                                                }}
                                                paused={false}
                                            />
                                        </div>
                                        <Button
                                            onClick={() => setIsScanningMaterialData(false)}
                                            className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
                                        >
                                            閉じる
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="border-2 border-amber-800 rounded-md bg-white h-40 flex items-center justify-center p-2">
                                <textarea
                                    className="w-full h-full border-none outline-none text-center text-sm resize-none 
                  whitespace-pre-wrap break-words overflow-y-auto"
                                    value={materialData}
                                    onChange={(e) => handleScanMaterial(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Submit Button (tùy label) */}
                <div className="flex justify-end mt-6">
                    <Button
                        type="submit"
                        className="bg-green-400 hover:bg-green-500 text-black py-4 px-10 text-xl font-bold rounded-lg"
                    >
                        {submitLabel}
                    </Button>
                </div>
            </form>

        </Form>
    )
}

export default SetupFormLayout
