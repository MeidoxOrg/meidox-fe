"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface NumpadModalProps {
    open: boolean
    onClose: () => void
    onConfirm: (value: string) => void
    initialValue?: string
    title?: string
    keys?: string[] // 👈 thêm prop
}

export function NumpadModal({
    open,
    onClose,
    onConfirm,
    initialValue = "",
    title = "数字入力",
    keys = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"],
}: NumpadModalProps) {
    const [inputValue, setInputValue] = useState(initialValue)
    useEffect(() => {
        if (open) setInputValue(initialValue || "")
    }, [open, initialValue])

    const handleInput = (num: string) => setInputValue((prev) => prev + num)
    const handleClear = () => setInputValue("")

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xs">
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>数字を入力してください</DialogDescription>

                {/* Display */}
                <div className="border rounded-md p-2 text-xl text-center bg-gray-100 mb-4 h-12 flex items-center justify-center">
                    {inputValue || ""}
                </div>

                {/* Numpad */}
                <div className="grid grid-cols-3 gap-4 mb-4 justify-items-center">
                    {keys.map((num) => (
                        <button
                            key={num}
                            onClick={() => handleInput(num)}
                            className="w-16 h-16 rounded-full bg-amber-900 text-white text-2xl font-bold flex items-center justify-center"
                        >
                            {num}
                        </button>
                    ))}
                </div>

                <button
                    onClick={handleClear}
                    className="w-full bg-green-400 text-black py-2 rounded-md font-bold"
                >
                    クリア
                </button>

                <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={onClose}>
                        キャンセル
                    </Button>
                    <Button
                        className="bg-amber-800 text-white"
                        onClick={() => {
                            onConfirm(inputValue || "")
                            onClose()
                        }}
                    >
                        OK
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
