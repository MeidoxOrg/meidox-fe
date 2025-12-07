"use client"

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"
import QRScanModal from "./QRScanModal"

interface SetupFormLayoutProps {
    form: any
    onSubmit: (data: any) => void

    // --- QR data ---
    kanbanData: string
    materialData: string
    slot2Data: string

    // --- scanning states ---
    isScanningKanban: boolean
    isScanningMaterialData: boolean
    isScanningSlot2: boolean

    // --- handlers ---
    handleScanKanban: (value: string) => void
    handleScanMaterial: (value: string) => void
    handleScanSlot2: (value: string) => void

    setIsScanningKanban: (val: boolean) => void
    setIsScanningMaterialData: (val: boolean) => void
    setIsScanningSlot2: (val: boolean) => void

    // --- submit button ---
    submitLabel: string
    showScanQR: boolean
    disableBtn: boolean
}

export const SetupFormLayout: React.FC<SetupFormLayoutProps> = ({
    form,
    onSubmit,

    kanbanData,
    materialData,
    slot2Data,

    isScanningKanban,
    isScanningMaterialData,
    isScanningSlot2,

    handleScanKanban,
    handleScanMaterial,
    handleScanSlot2,

    setIsScanningKanban,
    setIsScanningMaterialData,
    setIsScanningSlot2,

    submitLabel,
    showScanQR = true,
    disableBtn,
}) => {
    const [isShowLot2, setIsShowLot2] = useState<boolean>(false)
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    return (
        <>
            {/* --- Kanban modal --- */}
            <QRScanModal
                isOpen={isScanningKanban}
                title="QRコードを読み込んでください"
                onClose={() => setIsScanningKanban(false)}
                onConfirm={(value) => {
                    handleScanKanban(value)
                    setIsScanningKanban(false)
                }}
            />

            {/* --- Material modal --- */}
            <QRScanModal
                isOpen={isScanningMaterialData}
                title="材料QRコードを読み込んでください"
                onClose={() => setIsScanningMaterialData(false)}
                onConfirm={(value) => {
                    handleScanMaterial(value)
                    setIsScanningMaterialData(false)
                }}
            />

            {/* --- Slot2 modal --- */}
            <QRScanModal
                isOpen={isScanningSlot2}
                title="2ロット目QRコードを読み込んでください"
                onClose={() => setIsScanningSlot2(false)}
                onConfirm={(value) => {
                    handleScanSlot2(value)
                    setIsScanningSlot2(false)
                }}
            />

            {/* --- Main Form UI --- */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-stretch">
                        {/* Left column */}
                        <div className="flex flex-col space-y-6 h-full">
                            {/* 品番 */}
                            <FormField
                                control={form.control}
                                name="productNumber"
                                rules={{ required: "品番を入力してください。" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel style={{ color: "black" }}>
                                            品番（かんばん無い場合手入力も可）
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                                                focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"
                                            />
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
                                        <FormLabel style={{ color: "black" }}>
                                            ロット№
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                                                focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* ロット№② */}
                            {(isShowLot2 ||
                                (mounted && form.watch("lotNumber2"))) && (
                                    <FormField
                                        control={form.control}
                                        name="lotNumber2"
                                        rules={{ required: "ロット№②を入力してください。" }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel style={{ color: "black" }}>
                                                    ロット№②
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                                                    focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )}

                            {/* 材料№ */}
                            <FormField
                                control={form.control}
                                name="materialNumber"
                                rules={{ required: "材料№を入力してください。" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel style={{ color: "black" }}>
                                            材料№
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                                                focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* 2ロット入り */}
                            {showScanQR && (
                                <div className="mt-auto">
                                    <Button
                                        type="button"
                                        disabled={disableBtn}
                                        className="bg-amber-900 hover:bg-amber-800 text-white py-3 w-full text-lg font-bold rounded-md"
                                        onClick={() =>
                                            setIsShowLot2(!isShowLot2)
                                        }
                                    >
                                        2ロット入り
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* Middle column - Kanban */}
                        <div
                            className={`flex flex-col justify-between h-full ${showScanQR ? "block" : "hidden"
                                }`}
                        >
                            <div className="text-center w-full">
                                <p className="text-sm font-medium mb-2">
                                    ↓かんばん読み込む↓
                                </p>
                                <Button
                                    type="button"
                                    onClick={() => setIsScanningKanban(true)}
                                    className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-bold rounded-md mb-3"
                                >
                                    かんばん
                                </Button>

                                <div className="border-2 border-amber-800 rounded-md bg-white h-40 flex items-center justify-center p-2">
                                    <textarea
                                        className="w-full h-full border-none outline-none text-center text-sm resize-none 
                                            whitespace-pre-wrap break-words overflow-y-auto"
                                        value={kanbanData}
                                        onChange={(e) =>
                                            handleScanKanban(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {/* Slot2 */}
                            {isShowLot2 && (
                                <div className="text-center w-full mt-5">
                                    <p className="text-sm font-medium mb-2">
                                        ↓2ロット目かんばん読み込む↓
                                    </p>
                                    <Button
                                        type="button"
                                        onClick={() =>
                                            setIsScanningSlot2(true)
                                        }
                                        className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-bold rounded-md mb-3"
                                    >
                                        かんばん②
                                    </Button>

                                    <div className="border-2 border-amber-800 rounded-md bg-white h-40 flex items-center justify-center p-2">
                                        <textarea
                                            className="w-full h-full border-none outline-none text-center text-sm resize-none 
                                            whitespace-pre-wrap break-words overflow-y-auto"
                                            value={slot2Data}
                                            onChange={(e) =>
                                                handleScanSlot2(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right column - Material */}
                        <div
                            className={`flex flex-col justify-between h-full ${showScanQR ? "block" : "hidden"
                                }`}
                        >
                            <div className="text-center">
                                <p className="text-sm font-medium mb-2">
                                    ↓材料エフ読み込む↓
                                </p>
                                <Button
                                    type="button"
                                    onClick={() =>
                                        setIsScanningMaterialData(true)
                                    }
                                    className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-bold rounded-md mb-3"
                                >
                                    材料
                                </Button>

                                <div className="border-2 border-amber-800 rounded-md bg-white h-40 flex items-center justify-center p-2">
                                    <textarea
                                        className="w-full h-full border-none outline-none text-center text-sm resize-none 
                                            whitespace-pre-wrap break-words overflow-y-auto"
                                        value={materialData}
                                        onChange={(e) =>
                                            handleScanMaterial(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit */}
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
        </>
    )
}

