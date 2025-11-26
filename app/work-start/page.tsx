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
import { WorkShift } from "@/model/work-shift"
import machinesServices from "@/services/machines"
import { Machine } from "@/model/machines"
import { useSession } from "next-auth/react"
import workSessionServices from "@/services/work-session"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ID } from "@/utils/constants"
import { TimeOnlyPicker } from "@/components/ui/time-only-picker"
import { toast } from "sonner"

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
    const { data: session, status } = useSession();

    const [workShiftData, setWorkShiftData] = useState<WorkShift[]>([]);
    const [machineData, setMachinesData] = useState<Machine[]>([]);

    const now = new Date()
    const currentDate = now.toISOString().split("T")[0]
    const currentTime = now.toTimeString().slice(0, 5)

    const form = useForm({
        defaultValues: {
            date: currentDate,
            hour: currentTime.split(":")[0],
            minute: currentTime.split(":")[1],
            shift: "",
            machineNumber: "",
            employeeId: "",
            employeeName: "",
            username: "",
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

    const onSubmit = async (values: any) => {
        try {
            const response = await workSessionServices.createWorkSession({
                workDate: values.date,
                workTime: `${values.hour}:${values.minute}`,
                employeeId: values.employeeId,
                employeeName: values.employeeName,
                machineId: values.machineNumber,
                workShiftId: values.shift
            })
            if (response.id != null) {
                localStorageService.set<string>(WORKSESSION_ID, response.id)
                router.push("/home")
            }
        } catch (error) {
            const selectedMachine = machineData.find(m => m.id === values.machineNumber);
            const selectedShift = workShiftData.find(m => m.id === values.shift);
            toast.error(
                `${selectedMachine?.machineNumber}・${selectedShift?.name} はすでにチェックインされています。`
            );
        }
    }

    useEffect(() => {
        getWorkShitfData();
        getMachinesData();
    }, [getWorkShitfData, getMachinesData])

    useEffect(() => {
        if (status === "authenticated" && session) {
            form.setValue("username", (session as any)?.user?.username || "");
            form.setValue("employeeId", (session as any)?.user?.id || "");
            form.setValue("employeeName", session.user?.name || "");
        }
    }, [session, status, form]);

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
                            <FormField
                                control={form.control}
                                name="hour"
                                rules={{ required: "時を選択してください。" }}
                                render={() => (
                                    <FormItem>
                                        {/* <FormLabel>🕐 時間</FormLabel> */}
                                        <FormControl>
                                            <TimeOnlyPicker
                                                hour={form.watch("hour")}
                                                minute={form.watch("minute")}
                                                onHourChange={(val) => form.setValue("hour", val, { shouldValidate: true })}
                                                onMinuteChange={(val) => form.setValue("minute", val, { shouldValidate: true })}
                                                className="mt-2"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                                <SelectContent className="bg-white border border-[#ffe097] text-black">
                                                    {workShiftData.length > 0 &&
                                                        workShiftData.map((item) => (
                                                            <SelectItem
                                                                key={item.id}
                                                                value={item.id}
                                                                className="data-[state=checked]:bg-[#ffe097] hover:bg-[#ffe097] hover:text-black focus:bg-[#ffe097] focus:text-black text-black"
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        ))}
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
                                                <SelectContent className="bg-white border border-[#ffe097] text-black">
                                                    {machineData.length > 0 && machineData.map((item) =>
                                                        <SelectItem key={item.id} value={item.id}
                                                            className="data-[state=checked]:bg-[#ffe097] hover:bg-[#ffe097] hover:text-black focus:bg-[#ffe097] focus:text-black text-black"
                                                        >{item.machineNumber}</SelectItem>

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
                                name="username"
                                rules={{ required: "社員番号を入力してください。" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>👥 社員番号</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                disabled
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
                                    onClick={() => { }}
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
