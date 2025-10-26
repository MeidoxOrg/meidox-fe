"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PageLayout } from "@/components/layout/page-layout"
import { useState } from "react"
import workSessionServices from "@/services/work-session"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ID } from "@/utils/constants"

type SetupFormValues = {
  productNumber: string
  lotNumber: string
  materialNumber: string
}

export default function SetupStartPage() {
  const router = useRouter()
  const [kanbanData, setKanbanData] = useState("")
  const [materialData, setMaterialData] = useState("")

  const form = useForm<SetupFormValues>({
    defaultValues: {
      productNumber: "",
      lotNumber: "",
      materialNumber: "",
    },
  })

  const { setValue } = form

  // --- かんばんスキャン処理 ---
  const handleScanKanban = (value: string) => {
    setKanbanData(value)

    // ロット№
    const rawLot = value.substring(5, 15).trim()
    const lotValue =
      rawLot.length >= 10
        ? `${rawLot.substring(0, 6)}-${rawLot.substring(6, 10)}`
        : rawLot

    // 品番
    const after21 = value.substring(21)
    const spaceIndex = after21.indexOf(" ")
    const productValue =
      spaceIndex !== -1 ? after21.substring(0, spaceIndex).trim() : after21.trim()

    // react-hook-form setValue
    setValue("lotNumber", lotValue)
    setValue("productNumber", productValue)
  }

  const handleScanMaterial = (value: string) => {
    setMaterialData(value)
    setValue("materialNumber", value)
  }

  const onSubmit = async (data: SetupFormValues) => {
    try {
      const now = new Date()
      const currentDate = now.toISOString().split("T")[0]
      const currentTime = now.toTimeString().slice(0, 5)
      const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

      const response = await workSessionServices.createWorkSessionSetup({
        dateStart: currentDate,
        timeStart: currentTime,
        lotNumber: data.lotNumber,
        materialNumber: data.materialNumber,
        productNumber: data.productNumber,
        workSessionId: workSessionId
      });

      if (response.id != null) {
        router.push("/normal-production/setup-progress")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PageLayout title="段取り開始">
      <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)]">
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
                      <FormLabel style={{ color: "black" }}>ロット№</FormLabel>
                      <FormControl>
                        <Input {...field} className="w-full border-2 border-amber-800 rounded-sm text-sm px-2 py-0.5 h-[32px]
           focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"/>
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
           focus-visible:ring-0 focus-visible:border-amber-800 bg-white leading-tight"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Button sát đáy cột */}
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
              <div className="flex flex-col justify-between h-full">
                <div className="text-center w-full">
                  <p className="text-sm font-medium mb-2">↓かんばん読み込む↓</p>
                  <Button
                    type="button"
                    className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-bold rounded-md mb-3">
                    かんばん
                  </Button>
                  <div className="border-2 border-amber-800 rounded-md bg-white h-40 flex items-center justify-center p-2">
                    <textarea
                      className="w-full h-full border-none outline-none text-center text-sm resize-none 
                whitespace-pre-wrap break-words overflow-y-auto"
                      placeholder=""
                      value={kanbanData}
                      onChange={(e) => handleScanKanban(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Right column - Material scanning */}
              <div className="flex flex-col justify-between h-full">
                <div className="text-center">
                  <p className="text-sm font-medium mb-2">↓材料エフ読み込む↓</p>
                  <Button
                    type="button"
                    className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-bold rounded-md mb-3">
                    材料
                  </Button>
                  <div className="border-2 border-amber-800 rounded-md bg-white h-40 flex items-center justify-center p-2">
                    <textarea
                      className="w-full h-full border-none outline-none text-center text-sm resize-none 
                whitespace-pre-wrap break-words overflow-y-auto"
                      placeholder=""
                      value={materialData}
                      onChange={(e) => handleScanMaterial(e.target.value)}
                    />
                  </div>
                </div>

                {/* Start button sát đáy cột */}
                <div className="flex justify-end mt-6">
                  <Button
                    type="submit"
                    className="bg-green-400 hover:bg-green-500 text-black py-4 px-10 text-xl font-bold rounded-lg"
                  >
                    段取り開始
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </PageLayout>
  )
}
