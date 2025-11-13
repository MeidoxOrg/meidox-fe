"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SetupFormValuesGlobal, WorkInputFormValues } from "@/model/custom"
import { localStorageService } from "@/helper/localstorage"
import { PRODUCT_INFO } from "@/utils/constants"

interface WorkInputFormProps {
    submitLabel?: string
    onSubmit: (data: WorkInputFormValues) => void
    labels?: {
        productCode?: string
        lotNumber?: string
        materialNumber?: string
    }
    placeholders?: {
        productCode?: string
        lotNumber?: string
        materialNumber?: string
    }
    buttonClassName?: string
}

export function WorkInputForm({
    submitLabel = "送信",
    onSubmit,
    labels,
    placeholders,
    buttonClassName = "bg-green-400 hover:bg-green-500 text-black",
}: WorkInputFormProps) {
    const productManufactured = localStorageService.get<SetupFormValuesGlobal>(PRODUCT_INFO, {
        productNumber: "",
        lotNumber: "",
        materialNumber: ""
    });

    const form = useForm<WorkInputFormValues>({
        defaultValues: {
            productCode: productManufactured.productNumber,
            lotNumber: productManufactured.lotNumber,
            materialNumber: productManufactured.materialNumber,
        },
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
                {/* 品番 */}
                <FormField
                    control={form.control}
                    name="productCode"
                    rules={{ required: `${labels?.productCode || "品番"}を入力してください。` }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel style={{ color: "black" }}>
                                {labels?.productCode || "品番（かんばん無い場合手入力も可）"}
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={placeholders?.productCode || ""}
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
                    rules={{ required: `${labels?.lotNumber || "ロット№"}を入力してください。` }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel style={{ color: "black" }}>{labels?.lotNumber || "ロット№"}</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={placeholders?.lotNumber || ""}
                                    className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                  focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* 材料№ */}
                <FormField
                    control={form.control}
                    name="materialNumber"
                    rules={{ required: `${labels?.materialNumber || "材料№"}を入力してください。` }}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel style={{ color: "black" }}>{labels?.materialNumber || "材料№"}</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder={placeholders?.materialNumber || ""}
                                    className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
                  focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="pt-4">
                    <Button
                        type="submit"
                        className={`${buttonClassName} py-3 w-full text-lg font-bold rounded-md`}
                    >
                        {submitLabel}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
