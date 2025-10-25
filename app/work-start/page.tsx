"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home } from "lucide-react"
import workShiftServices from "@/services/work-shift"
import { useCallback, useEffect, useState } from "react"
import { WorkShift, WorkShiftResponse } from "@/model/work-shift"
import machinesServices from "@/services/machines"
import { Machine } from "@/model/machines"

function WorkStartHeader() {
    const router = useRouter()
    return (
        <header className="flex items-center justify-between h-14 px-4 border-b border-gray-300 bg-white">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="p-2 hover:bg-gray-100 rounded-full"
            >
                <Home className="h-6 w-6 text-amber-800" />
            </Button>
        </header>
    )
}

export default function WorkStartPage() {
    const router = useRouter()
    const [workShiftData, setWorkShiftData] = useState<WorkShift[]>([]);
    const [machineData, setMachinesData] = useState<Machine[]>([]);

    const form = useForm({
        defaultValues: {
            date: "",
            hour: "",
            minute: "",
            shift: "",
            machineNumber: "",
            employeeId: "",
            employeeName: "",
        },
        mode: "onTouched",
    })

    const getWorkShitfData = useCallback(async () => {
        await workShiftServices.getWorkShiftData().then((res) => {
            setWorkShiftData(res.workShifts.data);
        }).catch((error) => {
            console.log(error);
        });;
    }, [])

    const getMachinesData = useCallback(async () => {
        await machinesServices.getMachinesData().then((res) => {
            setMachinesData(res.machines.data);
        }).catch((error) => {
            console.log(error);
        });;
    }, [])

    const onSubmit = (values: any) => {
        console.log("Work start data:", values)
        console.log(workShiftData);
        //router.push("/home")
    }

    useEffect(() => {
        getWorkShitfData();
        getMachinesData();
    }, [getWorkShitfData, getMachinesData])

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <WorkStartHeader />

            <main className="flex-1 flex justify-center px-4 py-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full max-w-[400px] space-y-6 p-10"
                    >
                        <div className="space-y-6">
                            {/* 📅 Date */}
                            <FormField
                                control={form.control}
                                name="date"
                                rules={{ required: "日付を入力してください。" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>📅 日時</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="date"
                                                {...field}
                                                className="border-2 border-amber-800 rounded-md px-3 py-2 w-full bg-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* 🕐 Hour + Minute */}
                            <div>
                                <div className="flex gap-2 mt-2">
                                    <FormField
                                        control={form.control}
                                        name="hour"
                                        rules={{ required: "時を選択してください。" }}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <select
                                                        {...field}
                                                        className="border-2 border-amber-800 rounded-md px-2 py-1 w-full bg-white"
                                                    >
                                                        {Array.from({ length: 24 }).map((_, i) => (
                                                            <option key={i} value={i.toString().padStart(2, "0")}>
                                                                {i.toString().padStart(2, "0")}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <span className="self-end pb-2">:</span>
                                    <FormField
                                        control={form.control}
                                        name="minute"
                                        rules={{ required: "分を選択してください。" }}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <select
                                                        {...field}
                                                        className="border-2 border-amber-800 rounded-md px-2 py-1 w-full bg-white"
                                                    >
                                                        {Array.from({ length: 60 }).map((_, i) => (
                                                            <option key={i} value={i.toString().padStart(2, "0")}>
                                                                {i.toString().padStart(2, "0")}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* 🔧 Shift */}
                            <FormField
                                control={form.control}
                                name="shift"
                                rules={{ required: "直を選択してください。" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>🔧 直</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full border-2 border-amber-800 bg-white">
                                                    <SelectValue />
                                                </SelectTrigger>

                                                <SelectContent className="bg-amber-800 text-white">
                                                    {workShiftData.length > 0 && workShiftData.map((item) =>
                                                        <SelectItem
                                                            key={item.id}
                                                            value={item.id}>{item.name}</SelectItem>
                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* 機械番号 */}
                            <FormField
                                control={form.control}
                                name="machineNumber"
                                rules={{ required: "機械番号を選択してください。" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>🔧 機械番号</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full border-2 border-amber-800 bg-white">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-amber-800 text-white">
                                                    {machineData.length > 0 && machineData.map((item) =>
                                                        <SelectItem key={item.id} value={item.id}>{item.machineNumber}</SelectItem>

                                                    )}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* 👥 社員番号 */}
                            <FormField
                                control={form.control}
                                name="employeeId"
                                rules={{ required: "社員番号を入力してください。" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>👥 社員番号</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="border-2 border-amber-800 rounded-md px-3 py-2 w-full bg-white"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* 👤 名前（自動入力） */}
                            <FormField
                                control={form.control}
                                name="employeeName"
                                rules={{ required: "名前を入力してください。" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>👤 名前（自動入力）</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
                                                className="border-2 border-amber-800 rounded-md px-3 py-2 w-full bg-gray-100"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Buttons */}
                            <div className="flex gap-4 pt-2">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-amber-900 hover:bg-amber-800 text-white py-6 text-lg font-bold"
                                >
                                    作業開始
                                </Button>
                                {/* <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.push("/#")}
                                        className="px-6 py-6 border-2 border-amber-800 text-amber-800 hover:bg-amber-50"
                                    >
                                        社員登録アプリへ
                                    </Button> */}
                            </div>
                        </div>
                    </form>
                </Form>
            </main>
        </div>
    )
}
