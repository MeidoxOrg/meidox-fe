"use client"

import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { useCallback, useEffect, useState } from "react"
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
  const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")
  const [showScanQR, setShowScanQR] = useState<boolean>(true)

  const productManufactured = localStorageService.get<SetupFormValuesGlobal>(PRODUCT_INFO, {
    productNumber: "",
    lotNumber: "",
    materialNumber: ""
  });

  const form = useForm<SetupFormValues>({
    defaultValues: {
      productNumber: productManufactured.productNumber,
      lotNumber: productManufactured.lotNumber,
      materialNumber: productManufactured.materialNumber,
    },
  })

  const { setValue } = form

  // --- かんばんスキャン処理 ---
  const handleScanKanban = (value: string) => {
    setKanbanData(value)

    // ロット№ (6文字目から10文字)
    const lotValue = value.substring(5, 10).trim()

    // 品番 (22文字目から空白まで)
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

  const getDataWorkSessionSetupByWsId = useCallback(async () => {
    try {
      const response = await workSessionServices.getWorkSessionSetupByWsId(workSessionId);
      const setups = response?.workSessionSetups ?? [];

      const activeSetup = setups.find((item) => item.status !== 2);
      if (!activeSetup) return;
      setShowScanQR(false)
      setValue("productNumber", activeSetup.productNumber || "");
      setValue("lotNumber", activeSetup.lotNumber || "");
      setValue("materialNumber", activeSetup.materialNumber || "");

    } catch (error) {
      console.error("Failed to load WorkSessionSetup:", error);
    }
  }, [])

  useEffect(() => {
    getDataWorkSessionSetupByWsId()
  }, [getDataWorkSessionSetupByWsId])

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
          showScanQR={showScanQR}
        />
      </div>
    </PageLayout>
  )
}
