"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { useEffect, useState } from "react"
import workSessionServices from "@/services/work-session"
import { localStorageService } from "@/helper/localstorage"
import { PRODUCT_INFO, WORKSESSION_ID, WORKSESSION_SETUP_ID } from "@/utils/constants"
import SetupFormLayout from "@/components/common/SetupFormLayout"
import { SetupFormValuesGlobal } from "@/model/custom"


type SetupFormValues = {
  productNumber: string
  lotNumber: string
  materialNumber: string
}

export default function SetupStartPage() {
  const router = useRouter()
  const [kanbanData, setKanbanData] = useState("")
  const [materialData, setMaterialData] = useState("")
  const [isScanningKanban, setIsScanningKanban] = useState(false)
  const [isScanningMaterialData, setIsScanningMaterialData] = useState(false)


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

      handleUpdateProductInfoGlobal({
        lotNumber: data.lotNumber,
        materialNumber: data.materialNumber,
        productNumber: data.productNumber
      })

      const response = await workSessionServices.createWorkSessionSetup({
        dateStart: currentDate,
        timeStart: currentTime,
        lotNumber: data.lotNumber,
        materialNumber: data.materialNumber,
        productNumber: data.productNumber,
        workSessionId: workSessionId
      });

      if (response.id != null) {
        localStorageService.set<string>(WORKSESSION_SETUP_ID, response.id)
        router.push("/normal-production/setup-progress")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateProductInfoGlobal = async (value: SetupFormValuesGlobal) => {
    await localStorageService.set<SetupFormValuesGlobal>(PRODUCT_INFO, value)
  }
  return (
    <PageLayout title="段取り開始">
      <div className="max-w-7xl mx-auto bg-sky-100 p-6 rounded-md min-h-[calc(100vh-160px)]">
        <SetupFormLayout
          form={form}
          onSubmit={onSubmit}
          kanbanData={kanbanData}
          materialData={materialData}
          isScanningKanban={isScanningKanban}
          isScanningMaterialData={isScanningMaterialData}
          handleScanKanban={handleScanKanban}
          handleScanMaterial={handleScanMaterial}
          setIsScanningKanban={setIsScanningKanban}
          setIsScanningMaterialData={setIsScanningMaterialData}
          submitLabel="段取り開始"
        />
      </div>
    </PageLayout>
  )
}
