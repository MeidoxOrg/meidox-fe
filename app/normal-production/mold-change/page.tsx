"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PageLayout } from "@/components/layout/page-layout"

type MoldChangeForm = {
    productCode: string
    lotNumber: string
    materialNumber: string
}

export default function MoldChange() {
    const router = useRouter()
    const form = useForm<MoldChangeForm>({
        defaultValues: {
            productCode: "",
            lotNumber: "",
            materialNumber: "",
        },
    })

    const onSubmit = (data: MoldChangeForm) => {
        // có thể lưu tạm vào localStorage nếu cần
        router.push("/normal-production/mold-change-progress")
    }

    return (
        <PageLayout title="金型交換開始">
            <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)] flex items-center justify-center">
                <div className="w-full max-w-lg">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
                            {/* 品番 */}
                            <FormField
                                control={form.control}
                                name="productCode"
                                rules={{ required: "品番を入力してください。" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel style={{ color: "black" }}>品番（かんばん無い場合手入力も可）</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="" className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                    focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"  />
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
                                            <Input {...field} placeholder="" className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                    focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"  />
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
                                            <Input {...field} placeholder="" className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                    focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"  />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="pt-4">
                                <Button
                                    type="submit"
                                    className="bg-green-400 hover:bg-green-500 text-black py-3 w-full text-lg font-bold rounded-md"
                                >
                                    金型交換開始
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </PageLayout>
    )
}
