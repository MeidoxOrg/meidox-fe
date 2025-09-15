"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { PageLayout } from "@/components/layout/page-layout"

export default function SetupStartPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    productCode: "",
    lotNumber: "",
    materialNumber: "",
    kanbanData: "",
    materialData: "",
  })

  const handleStartSetup = () => {
    router.push("/setup-progress")
  }

  return (
    <PageLayout title="段取り開始">
      <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full items-stretch">
          {/* Left column - Form inputs */}
          <div className="flex flex-col space-y-6 h-full">
            <FormField
              label="品番（かんばん無い場合手入力も可）"
              value={formData.productCode}
              onChange={(value) => setFormData((prev) => ({ ...prev, productCode: value }))}
              placeholder=""
              className="w-full"
            />

            <FormField
              label="ロット№"
              value={formData.lotNumber}
              onChange={(value) => setFormData((prev) => ({ ...prev, lotNumber: value }))}
              placeholder=""
              className="w-full"
            />

            <FormField
              label="材料№"
              value={formData.materialNumber}
              onChange={(value) => setFormData((prev) => ({ ...prev, materialNumber: value }))}
              placeholder=""
              className="w-full"
            />

            {/* Button sát đáy cột */}
            <div className="mt-auto">
              <Button className="bg-amber-900 hover:bg-amber-800 text-white py-3 w-full text-lg font-bold rounded-md">
                2ロット入り
              </Button>
            </div>
          </div>

          {/* Middle column - Kanban scanning */}
          <div className="flex flex-col justify-between h-full">
            <div className="text-center w-full">
              <p className="text-sm font-medium mb-2">↓かんばん読み込む↓</p>
              <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-bold rounded-md mb-3">
                かんばん
              </Button>
              <div className="border-2 border-amber-800 rounded-md bg-white h-40 flex items-center justify-center">
                <input
                  type="text"
                  className="w-full h-full border-none outline-none text-center text-lg"
                  placeholder=""
                  value={formData.kanbanData}
                  onChange={(e) => setFormData((prev) => ({ ...prev, kanbanData: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Right column - Material scanning */}
          <div className="flex flex-col justify-between h-full">
            <div className="text-center">
              <p className="text-sm font-medium mb-2">↓材料エフ読み込む↓</p>
              <Button className="w-full bg-amber-900 hover:bg-amber-800 text-white py-3 text-lg font-bold rounded-md mb-3">
                材料
              </Button>
              <div className="border-2 border-amber-800 rounded-md bg-white h-40 flex items-center justify-center">
                <input
                  type="text"
                  className="w-full h-full border-none outline-none text-center text-lg"
                  placeholder=""
                  value={formData.materialData}
                  onChange={(e) => setFormData((prev) => ({ ...prev, materialData: e.target.value }))}
                />
              </div>
            </div>

            {/* Start button sát đáy cột */}
            <div className="flex justify-end mt-6">
              <Button
                onClick={handleStartSetup}
                className="bg-green-400 hover:bg-green-500 text-black py-4 px-10 text-xl font-bold rounded-lg"
              >
                段取り開始
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
