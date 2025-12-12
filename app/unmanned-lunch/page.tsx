"use client"

import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/layout/page-layout"
import { WorkInputForm } from "@/components/common/WorkInputForm"
import { PreviousSessionContext, SetupFormValuesGlobal, WorkInputFormValues } from "@/model/custom"
import { localStorageService } from "@/helper/localstorage"
import { PREVIOS_SESSION_CONTEXT, PRODUCT_INFO, WORKSESSION_ID, WORKSESSION_UNMANNED_LUNCH_ID } from "@/utils/constants"
import workSessionUnmannedLunchServies from "@/services/work-session-unmanned-lunch​"
import { SetupFormLayout } from "@/components/common/SetupFormLayout"
import { useForm } from "react-hook-form"
import { useState } from "react"

type SetupFormValues = {
  productNumber: string
  lotNumber: string
  materialNumber: string
}

export default function UnmannedLunch() {
  const router = useRouter()
  const [kanbanData, setKanbanData] = useState("")
  const [materialData, setMaterialData] = useState("")
  const [isScanningKanban, setIsScanningKanban] = useState(false)
  const [isScanningMaterialData, setIsScanningMaterialData] = useState(false)

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

      const previousSessionContext = localStorageService.get<PreviousSessionContext>(PREVIOS_SESSION_CONTEXT, {
        previousActionName: "",
        previousEndDate: "",
        previousEndTime: ""
      });

      const response = await workSessionUnmannedLunchServies.createWorkSessionUnmannedLunch({
        unattendedDateStart: previousSessionContext.previousEndDate ?? currentDate,
        unattendedTimeStart: previousSessionContext.previousEndTime ?? currentTime,
        lotNumber: data.lotNumber,
        materialNumber: data.materialNumber,
        productNumber: data.productNumber,
        workSessionId: workSessionId
      })

      if (response.id) {
        handleUpdateProductInfoGlobal({
          lotNumber: data.lotNumber,
          materialNumber: data.materialNumber,
          productNumber: data.productNumber
        })

        localStorageService.set<String>(WORKSESSION_UNMANNED_LUNCH_ID, response.id)
        router.push("/unmanned-lunch-progress")
      }
    } catch (error) {

    }
  }

  const handleUpdateProductInfoGlobal = async (value: SetupFormValuesGlobal) => {
    await localStorageService.set<SetupFormValuesGlobal>(PRODUCT_INFO, value)
  }

  return (
    <PageLayout title="無人運転（昼休憩）開始">
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
          submitLabel="無人運転（昼休憩）開始"
          showScanQR={true}
          handleScanSlot2={() => { }}
          slot2Data={""}
          setIsScanningSlot2={() => { }}
          isScanningSlot2={false}
          disableBtn={true}
        />
      </div>
    </PageLayout>
  )
}
