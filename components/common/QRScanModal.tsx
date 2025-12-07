"use client"

import { Scanner } from "@yudiel/react-qr-scanner"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { Ban, Camera } from "lucide-react";

interface QRScanModalProps {
    isOpen: boolean;
    title?: string;
    onClose: () => void;
    onConfirm: (value: string) => void;
}

interface QRScanResult {
    rawValue: string;
    format: string;
}

export default function QRScanModal({
    isOpen,
    title = "QRコードをスキャンします",
    onClose,
    onConfirm
}: QRScanModalProps) {

    const [isScanning, setIsScanning] = useState<boolean>(false)
    const [result, setResult] = useState<string>("")
    const [scanStatus, setScanStatus] = useState<"success" | "error" | "invalid" | null>(null);


    const handleScan = (codes: QRScanResult[]) => {
        const value = codes?.[0]?.rawValue
        if (!value) {
            setScanStatus("error");
            return;
        }

        if (!isValidQR(value)) {
            setScanStatus("invalid");
            return;
        }

        setScanStatus("success");
        setResult(value);
        setIsScanning(false);


        if (value) {
            setResult(value)
            setIsScanning(false)
        }

    }

    const handleClear = () => {
        setResult("")
        setIsScanning(false)
    }

    if (!isOpen) return null

    const isValidQR = (text: string) => {
        return text.length > 5;
    };


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-lg rounded-xl p-4 text-center">

                <p className="text-lg font-bold mb-4">{title}</p>

                {/* BUTTONS */}
                <div className="flex justify-between mb-4">
                    <Button
                        className="w-[30%] bg-black text-white flex items-center justify-center gap-2"
                        onClick={() => { setIsScanning(true); setResult("") }}
                        disabled={isScanning}
                    >
                        <Camera className="w-5 h-5" />
                        読取
                    </Button>

                    <Button
                        className="w-[30%] bg-black text-white flex items-center justify-center gap-2"
                        onClick={() => setIsScanning(false)}
                        disabled={!isScanning}
                    >
                        <Ban className="w-5 h-5" />
                        停止
                    </Button>

                    {/* <Button
                        className="w-[30%] bg-black text-white"
                        onClick={() => alert("画像読み込みは未実装")}
                    >
                        画像
                    </Button> */}
                </div>

                {isScanning && (
                    <div className="w-full h-70 overflow-hidden rounded-lg border">
                        <Scanner
                            constraints={{ facingMode: "environment" }}
                            onScan={handleScan}
                            paused={!isScanning}
                        />
                    </div>
                )}

                <div className="border mt-4 rounded-md overflow-hidden">
                    <div className="p-4">
                        {result ? (
                            <>
                                <div className="bg-gray-200 px-4 py-2">
                                    <p className="font-semibold text-gray-700 text-sm text-start">
                                        {scanStatus === "success" && "読み取り成功"}
                                        {scanStatus === "error" && "読み取り失敗"}
                                        {scanStatus === "invalid" && "無効なQRコード"}
                                    </p>
                                    <div className="flex gap-3 mt-1">
                                        <button
                                            className="border p-0.5 rounded-md text-sm flex-1 bg-white"
                                            onClick={() => { onConfirm(result); onClose(); handleClear(); }}
                                        >
                                            確認
                                        </button>

                                        <button
                                            className="border rounded-md text-sm flex-1 bg-white"
                                            onClick={handleClear}
                                        >
                                            クリア
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="whitespace-pre-wrap break-words text-gray-800 text-sm">
                                        {result}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <p className="text-gray-400 text-sm">QRコードをスキャンします</p>
                        )}

                    </div>
                </div>

                <Button className="mt-5 bg-gray-500 w-full" onClick={() => { onClose(); setIsScanning(false) }}>
                    閉じる
                </Button>
            </div>
        </div>
    );
}
