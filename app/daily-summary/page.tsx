"use client"

import { useCallback, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home } from "lucide-react"
import workSessionServices from "@/services/work-session"
import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ID } from "@/utils/constants"
import { WorkSessionModel, WorkSessionSetupByWs } from "@/model/work-session"
import { formatDateToJapanese, formatTimeToJapanese } from "@/utils/time-utils"
import { useSession } from "next-auth/react"
import workSessionProduction from "@/services/work-session-production"
import { WorkSessionProductionByWsId } from "@/model/work-session-production"
import { WorkSessionMoldChangeByWsId } from "@/model/work-session-mold-change"
import workSessionMaterialChangeServies from "@/services/work-session-material-change"
import { WorkSessionMaterialChangeByWsId } from "@/model/work-session-material-change"
import workSessionAdjustmentBeginServies from "@/services/work-session-adjustment-begin"
import { WorkSessionAdjustmentBeginByWsId } from "@/model/work-session-adjustment-begin"
import workSession4SServies from "@/services/work-session-4s"
import { WorkSession4SByWsId } from "@/model/work-session-4s"
import workSessionProductionPrepCheckServies from "@/services/work-session-production-prep-check"
import { WorkSessionProductionPrepCheckByWsId } from "@/model/work-session-production-prep-check"
import workSessionSortingServies from "@/services/work-session-sorting"
import { WorkSessionSortingByWsId } from "@/model/work-session-sorting"
import workSessionOtherStopServies from "@/services/work-session-other-stop"
import { WorkSessionOtherStopByWsId } from "@/model/work-session-other-stop"
import workSessionEquipmentRepairServies from "@/services/work-session-equipment-repair​"
import { WorkSessionEquipmentRepairByWsId } from "@/model/work-session-equipment-repair​"
import workSessionOtherMachineSupportServies from "@/services/work-session-other-machine-support"
import { WorkSessionOtherMachineSupportByWsId } from "@/model/work-session-other-machine-support"
import workSessionQualityCheckServies from "@/services/work-session-quality-check"
import { WorkSessionQualityCheckByWsId } from "@/model/work-session-quality-check"
import reasonForStoppingBreakStartServies from "@/services/reason-for-stopping-break-start"
import { ReasonForStoppingBreakStartByWsId } from "@/model/reason-for-stopping-break-start"
import reasonForStoppingNoKanbanStartServies from "@/services/reason-for-stopping-no-kanban"
import { ReasonForStoppingNoKanbanStartByWsId } from "@/model/reason-for-stopping-no-kanban"
import reasonForStoppingMeetingStartServies from "@/services/reason-for-stopping-meeting-start"
import { ReasonForStoppingMeetingStartByWsId } from "@/model/reason-for-stopping-meeting-start"
import reasonForStoppingMaterialMoldShortageServies from "@/services/reason-for-stopping-material-mold-shortage"
import { ReasonForStoppingMaterialMoldShortageByWsId } from "@/model/reason-for-stopping-material-mold-shortage"
import reasonForStoppingPlannedMaintenanceServies from "@/services/reason-for-stopping-planned-maintenance"
import { ReasonForStoppingPlannedMaintenanceByWsId } from "@/model/reason-for-stopping-planned-maintenance"


export default function DailySummaryPage() {
    const [selectedDate] = useState("2025年8月28日")
    const [shift] = useState("黄")
    const [machine] = useState("CPH35")
    const { data: session } = useSession()

    const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

    const [dataWorkSessionSetup, setDataWorkSessionSetup] = useState<WorkSessionSetupByWs[]>([])
    const [dataWorkSessionProduction, setDataWorkSessionProduction] = useState<WorkSessionProductionByWsId[]>([])
    const [workSessionData, setWorkSessionData] = useState<WorkSessionModel>();
    const [dataWorkSessionMoldChange, setDataWorkSessionMoldChange] = useState<WorkSessionMoldChangeByWsId[]>([])
    const [dataWorkSessionMaterialChange, setDataWorkSessionMaterialChange] = useState<WorkSessionMaterialChangeByWsId[]>([])
    const [dataWorkSessionAdjustmentBegin, setDataWorkSessionAdjustmentBegin] = useState<WorkSessionAdjustmentBeginByWsId[]>([])
    const [dataWorkSession4S, setDataWorkSession4S] = useState<WorkSession4SByWsId[]>([])
    const [dataWorkSessionProductionPrepCheck, setDataWorkSessionProductionPrepCheck] = useState<WorkSessionProductionPrepCheckByWsId[]>([])
    const [dataWorkSessionSorting, setDataWorkSessionSorting] = useState<WorkSessionSortingByWsId[]>([])
    const [dataWorkSesionOrtherStop, setDataWorkSesionOrtherStop] = useState<WorkSessionOtherStopByWsId[]>([])
    const [dataWorkSesionEquipmentRepair, setDataWorkSesionEquipmentRepair] = useState<WorkSessionEquipmentRepairByWsId[]>([])
    const [dataWorkSesionOrtherMachinesSupport, setDataWorkSesionOrtherMachinesSupport] = useState<WorkSessionOtherMachineSupportByWsId[]>([])
    const [dataWorkSesionQuanlityCheck, setDataWorkSesionQuanlityCheck] = useState<WorkSessionQualityCheckByWsId[]>([])
    const [dataReasonForStoppingBreakStart, setDataReasonForStoppingBreakStart] = useState<ReasonForStoppingBreakStartByWsId[]>([])
    const [dataReasonForStoppingNoKanbanStart, setDataReasonForStoppingNoKanbanStart] = useState<ReasonForStoppingNoKanbanStartByWsId[]>([])
    const [dataReasonForStoppingMeetingStart, setDataReasonForStoppingMeetingStart] = useState<ReasonForStoppingMeetingStartByWsId[]>([])
    const [dataReasonForStoppingMaterialMoldShortage, setDataReasonForStoppingMaterialMoldShortage] = useState<ReasonForStoppingMaterialMoldShortageByWsId[]>([])
    const [dataReasonForStoppingPlannedMaintenance, setDataReasonForStoppingPlannedMaintenance] = useState<ReasonForStoppingPlannedMaintenanceByWsId[]>([])


    const getDataWorkSessionSetupByWsId = useCallback(async () => {
        try {
            const response = await workSessionServices.getWorkSessionSetupByWsId(workSessionId);
            setDataWorkSessionSetup(response.workSessionSetups);
        } catch (error) {

        }
    }, [])

    const getDataWorkSessionProductionByWsId = useCallback(async () => {
        try {
            const response = await workSessionProduction.getWorkSessionProductionByWsId(workSessionId);
            setDataWorkSessionProduction(response.workSessionProductions);
        } catch (error) {

        }
    }, [])

    const getWorkSessionById = useCallback(async () => {
        try {
            const workSessionId = localStorageService.get(WORKSESSION_ID, '');
            const response = await workSessionServices.getWorkSessionById(workSessionId)
            if (response.workSession.id) {
                setWorkSessionData(response.workSession)
            }
        } catch (error) {
            console.error(error);
        }
    }, [])

    const getDataWorkSessionMoldChangeByWsId = useCallback(async () => {
        try {
            const response = await workSessionProduction.getWorkSessionMoldChangeByWsId(workSessionId);
            setDataWorkSessionMoldChange(response.workSessionMoldChanges);
        } catch (error) {

        }
    }, [])

    const getDataWorkSessionMaterialChangeByWsId = useCallback(async () => {
        try {
            const response = await workSessionMaterialChangeServies.getWorkSessionMaterialChangeByWsId(workSessionId);
            setDataWorkSessionMaterialChange(response.workSessionMaterialChanges);
        } catch (error) {

        }
    }, [])

    const getDataWorkSessionAdjustmentBeginByWsId = useCallback(async () => {
        try {
            const response = await workSessionAdjustmentBeginServies.getWorkSessionAdjustmentBeginByWsId(workSessionId);
            setDataWorkSessionAdjustmentBegin(response.workSessionAdjustmentBegins);
        } catch (error) {

        }
    }, [])

    const getDataWorkSession4SByWsId = useCallback(async () => {
        try {
            const response = await workSession4SServies.getWorkSession4SByWsId(workSessionId);
            setDataWorkSession4S(response.workSession4Ss);
        } catch (error) {

        }
    }, [])

    const getDataWorkSessionProductionPrepCheckByWsId = useCallback(async () => {
        try {
            const response = await workSessionProductionPrepCheckServies.getWorkSessionProductionPrepCheckByWsId(workSessionId);
            setDataWorkSessionProductionPrepCheck(response.workSessionProductionPrepChecks);
        } catch (error) {

        }
    }, [])

    const getDataWorkSessionSortingByWsId = useCallback(async () => {
        try {
            const response = await workSessionSortingServies.getWorkSessionSortingByWsId(workSessionId);
            setDataWorkSessionSorting(response.workSessionSortings);
        } catch (error) {

        }
    }, [])

    const getDataWorkSessionOrtherStopByWsId = useCallback(async () => {
        try {
            const response = await workSessionOtherStopServies.getWorkSessionOtherStopByWsId(workSessionId);
            setDataWorkSesionOrtherStop(response.workSessionOtherStops);
        } catch (error) {

        }
    }, [])

    const getDataWorkSessionEquipmentRepairByWsId = useCallback(async () => {
        try {
            const response = await workSessionEquipmentRepairServies.getWorkSessionEquipmentRepairByWsId(workSessionId);
            setDataWorkSesionEquipmentRepair(response.workSessionEquipmentRepairs);
        } catch (error) {

        }
    }, [])

    const getDataWorkSessionOrtherMachinesSupportByWsId = useCallback(async () => {
        try {
            const response = await workSessionQualityCheckServies.getWorkSessionQualityCheckByWsId(workSessionId);
            setDataWorkSesionOrtherMachinesSupport(response.workSessionQualityChecks);
        } catch (error) {

        }
    }, [])

    const getDataWorkSessionQuanlityCheckByWsId = useCallback(async () => {
        try {
            const response = await workSessionOtherMachineSupportServies.getWorkSessionOtherMachineSupportByWsId(workSessionId);
            setDataWorkSesionQuanlityCheck(response.workSessionOtherMachineSupports);
        } catch (error) {

        }
    }, [])

    const getDataReasonForStoppingBreakStartId = useCallback(async () => {
        try {
            const response = await reasonForStoppingBreakStartServies.getReasonForStoppingBreakStartByWsId(workSessionId);
            setDataReasonForStoppingBreakStart(response.reasonForStoppingBreakStarts);
        } catch (error) {

        }
    }, [])

    const getDataReasonForStoppingNoKanbanStartId = useCallback(async () => {
        try {
            const response = await reasonForStoppingNoKanbanStartServies.getReasonForStoppingNoKanbanStartByWsId(workSessionId);
            setDataReasonForStoppingNoKanbanStart(response.reasonForStoppingNoKanbanStarts);
        } catch (error) {

        }
    }, [])

    const getDataReasonForStoppingMeetingStartId = useCallback(async () => {
        try {
            const response = await reasonForStoppingMeetingStartServies.getReasonForStoppingMeetingStartByWsId(workSessionId);
            setDataReasonForStoppingMeetingStart(response.reasonForStoppingMeetingStarts);
        } catch (error) {

        }
    }, [])

    const getDataReasonForStoppingMaterialMoldShortageId = useCallback(async () => {
        try {
            const response = await reasonForStoppingMaterialMoldShortageServies.getReasonForStoppingMaterialMoldShortageByWsId(workSessionId);
            setDataReasonForStoppingMaterialMoldShortage(response.reasonForStoppingMaterialMoldShortages);
        } catch (error) {

        }
    }, [])

    const getDataReasonForStoppingPlannedMaintenanced = useCallback(async () => {
        try {
            const response = await reasonForStoppingPlannedMaintenanceServies.getReasonForStoppingPlannedMaintenanceByWsId(workSessionId);
            setDataReasonForStoppingPlannedMaintenance(response.reasonForStoppingPlannedMaintenances);
        } catch (error) {

        }
    }, [])

    const calculateStandardProcessingQuantity = (
        productions: WorkSessionProductionByWsId[]
    ): number => {
        if (!productions?.length) return 0
        return productions.reduce(
            (sum, item) => sum + (item.numberOfGoodProduct || 0),
            0
        )
    }

    const calculateDefectQuantity = (
        productions: WorkSessionSetupByWs[]
    ): number => {
        if (!productions?.length) return 0
        return productions.reduce(
            (sum, item) => sum + (item.adjustmentItemUnit || 0),
            0
        )
    }

    const calculateTotalSetupDurationMinutes = (
        setups: WorkSessionSetupByWs[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotalMoldChangeDurationMinutes = (
        setups: WorkSessionMoldChangeByWsId[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotalMaterialChangeDurationMinutes = (
        setups: WorkSessionMaterialChangeByWsId[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotalAdjustmentBeginDurationMinutes = (
        setups: WorkSessionAdjustmentBeginByWsId[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotal4SDurationMinutes = (
        setups: WorkSession4SByWsId[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotalProductionPrepCheckDurationMinutes = (
        setups: WorkSessionProductionPrepCheckByWsId[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotalSortingDurationMinutes = (
        setups: WorkSessionSortingByWsId[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotalOrtherStopDurationMinutes = (
        setups: WorkSessionOtherStopByWsId[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotalEquipmentRepairDurationMinutes = (
        setups: WorkSessionEquipmentRepairByWsId[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotalOrtherMachinesSupportDurationMinutes = (
        setups: WorkSessionOtherMachineSupportByWsId[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotalQuanlityCheckDurationMinutes = (
        setups: WorkSessionQualityCheckByWsId[] = []
    ): number => {
        if (!Array.isArray(setups) || setups.length === 0) return 0

        return setups.reduce((sum, item) => {
            if (!item.dateStart || !item.timeStart || !item.dateComplete || !item.timeComplete) {
                return sum // bỏ qua nếu thiếu dữ liệu
            }

            const start = new Date(`${item.dateStart}T${item.timeStart}`)
            const end = new Date(`${item.dateComplete}T${item.timeComplete}`)

            // xử lý nếu qua ngày (VD: setup từ 23:50 → 00:10 hôm sau)
            if (end < start) {
                end.setDate(end.getDate() + 1)
            }

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }

    const calculateTotalDurationMinutes = <
        T extends {
            dateStart?: string | null
            timeStart?: string | null
            dateComplete?: string | null
            timeComplete?: string | null
        }
    >(
        items: T[] = []
    ): number => {
        if (!Array.isArray(items) || items.length === 0) return 0

        return items.reduce((sum, item) => {
            const { dateStart, timeStart, dateComplete, timeComplete } = item
            if (!dateStart || !timeStart || !dateComplete || !timeComplete) return sum

            const start = new Date(`${dateStart}T${timeStart}`)
            const end = new Date(`${dateComplete}T${timeComplete}`)

            if (end < start) end.setDate(end.getDate() + 1)

            const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
            return sum + diffMinutes
        }, 0)
    }


    useEffect(() => {
        getDataWorkSessionSetupByWsId()
        getDataWorkSessionProductionByWsId()
        getWorkSessionById()
        getDataWorkSessionMoldChangeByWsId()
        getDataWorkSessionMaterialChangeByWsId()
        getDataWorkSessionAdjustmentBeginByWsId()
        getDataWorkSession4SByWsId()
        getDataWorkSessionProductionPrepCheckByWsId()
        getDataWorkSessionSortingByWsId()
        getDataWorkSessionOrtherStopByWsId()
        getDataWorkSessionEquipmentRepairByWsId()
        getDataWorkSessionOrtherMachinesSupportByWsId()
        getDataWorkSessionQuanlityCheckByWsId()
        getDataReasonForStoppingBreakStartId()
        getDataReasonForStoppingNoKanbanStartId()
        getDataReasonForStoppingMeetingStartId()
        getDataReasonForStoppingMaterialMoldShortageId()
        getDataReasonForStoppingPlannedMaintenanced()

    }, [getDataWorkSessionSetupByWsId, getDataWorkSessionProductionByWsId, getWorkSessionById,
        getDataWorkSessionMoldChangeByWsId, getDataWorkSessionMaterialChangeByWsId,
        getDataWorkSessionAdjustmentBeginByWsId, getDataWorkSession4SByWsId, getDataWorkSessionProductionPrepCheckByWsId,
        getDataWorkSessionSortingByWsId, getDataWorkSessionOrtherStopByWsId, getDataWorkSessionEquipmentRepairByWsId,
        getDataWorkSessionOrtherMachinesSupportByWsId, getDataWorkSessionQuanlityCheckByWsId, getDataReasonForStoppingBreakStartId,
        getDataReasonForStoppingNoKanbanStartId, getDataReasonForStoppingMeetingStartId, getDataReasonForStoppingMaterialMoldShortageId,
        getDataReasonForStoppingPlannedMaintenanced])

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between p-3 bg-white border-b border-gray-300">
                <div className="flex items-center space-x-3">
                    <h1 className="text-2xl font-bold flex items-center">
                        <span className="mr-2">一覧</span>
                        {/* <img src="/logo.png" alt="logo" className="h-8" /> */}
                    </h1>
                </div>

                <div className="flex items-center space-x-2">
                    <Input value={selectedDate} readOnly className="w-36 text-center" />
                    <Input value={shift} readOnly className="w-12 text-center" />
                    <Input value={machine} readOnly className="w-20 text-center" />
                    <Button variant="ghost" size="icon">
                        <Home className="text-amber-800" />
                    </Button>
                </div>
            </header>

            {/* Main content: left list + right summary */}
            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                {/* LEFT SIDE */}
                <div className="w-full md:w-1/2 overflow-y-auto p-3 bg-gray-50 border-r border-gray-200">

                    <Card className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                        <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                            <p>{formatDateToJapanese(workSessionData?.workDate ?? "")}</p>
                            <p>{formatTimeToJapanese(workSessionData?.workTime ?? "")}</p>
                            <p></p>
                            <p>{session?.user?.username}</p>
                            <p>作業開始</p>
                        </div>
                    </Card>

                    {dataWorkSessionSetup.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>段取り開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>段取り完了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESIONPRODUCTION */}

                    {dataWorkSessionProduction.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>生産開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>生産終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESSION_MOLD_CHANGE */}

                    {dataWorkSessionMoldChange.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>金型交換開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>金型交換完了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}
                    {/* SHOW CARD WORKSESSION_MATERIAL_CHANGE */}

                    {dataWorkSessionMaterialChange.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>材料交換開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>材料交換終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESSION_ADJUSTMENT_BEGIN */}

                    {dataWorkSessionAdjustmentBegin.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>調整開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>調整終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESSION_4S*/}

                    {dataWorkSession4S.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>4S開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>4S終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESSION_PRODUCTION_PREP_CHECK */}

                    {dataWorkSessionProductionPrepCheck.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>生産準備開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>生産準備終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESSION_SORTING */}

                    {dataWorkSessionSorting.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>仕分け開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>仕分け終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESSION_ORTHER_STOP */}

                    {dataWorkSesionOrtherStop.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>その他停止開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>その他停止終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESSION_EUQIPMENT_REAPIR */}

                    {dataWorkSesionEquipmentRepair.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>設備修理開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>設備修理終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESSION_ORTHER_MACHINES_SUPPORT */}

                    {dataWorkSesionOrtherMachinesSupport.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>他機対応開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>他機対応終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD WORKSESSION_ORTHER_MACHINES_SUPPORT */}

                    {dataWorkSesionQuanlityCheck.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>品質チェック開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>品質チェック終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD REASON_FOR_STOPPING_BREAK_START */}

                    {dataReasonForStoppingBreakStart.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>休憩開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>休憩終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD REASON_FOR_STOPPING_NOKANBAN_START */}

                    {dataReasonForStoppingNoKanbanStart.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>かんばんなし開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>かんばんなし終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}
                    {/* SHOW CARD REASON_STOP_MEETING_START */}

                    {dataReasonForStoppingMeetingStart.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>ミーティング開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>ミーティング終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD REASON_STOP_MOLD_SHORTAGE*/}

                    {dataReasonForStoppingMaterialMoldShortage.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>材料・金型欠品開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>材料・金型欠品終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                    {/* SHOW CARD REASON_STOP_PLANNED_MAINTENANCE */}

                    {dataReasonForStoppingPlannedMaintenance.map((item, idx) => {
                        const start = new Date(`${item.dateStart}T${item.timeStart}`)
                        const end = new Date(`${item.dateComplete}T${item.timeComplete}`)
                        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000) // tính phút

                        return (
                            <>
                                {/* Card 1: 段取り開始 */}
                                <Card key={`${idx}-start`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item.timeStart)}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>計画保全開始</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">{item.materialNumber}</p>
                                    </div>
                                </Card>

                                {/* Card 2: 段取り完了 */}
                                {item.timeComplete !== null && <Card key={`${idx}-end`} className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                                        <p>{formatDateToJapanese(item.dateStart)}</p>
                                        <p>{formatTimeToJapanese(item?.timeComplete ?? "")}</p>
                                        <p className="text-right">{item.productNumber}</p>

                                        <p>{session?.user?.username}</p>
                                        <p>計画保全終了</p>
                                        <p className="text-right">{item.lotNumber}</p>

                                        <p className="col-span-3 mt-1 text-right">
                                            {diffMinutes}分
                                        </p>
                                        <p className="col-span-3 mt-1 text-right">
                                            {item.materialNumber}
                                        </p>
                                    </div>
                                </Card>}
                            </>
                        )
                    })}

                </div>

                {/* RIGHT SIDE */}
                <div className="w-full md:w-1/2 overflow-y-auto p-4 bg-white">
                    {/* Top summary numbers */}
                    <div className="grid grid-cols-4 gap-2 text-sm mb-4">
                        <SummaryItem label="標準加工数" value={`${calculateStandardProcessingQuantity(dataWorkSessionProduction)}個`} />
                        <SummaryItem label="負荷時間" value="X分" />
                        <SummaryItem label="停止時間" value="X分" />
                        <SummaryItem label="稼働時間" value="X分" />

                        <SummaryItem label="操業時間" value="X分" />
                        <SummaryItem label="良品数" value="X個" />
                        <SummaryItem label="異常数" value={`${calculateDefectQuantity(dataWorkSessionSetup)}個`} />
                        <SummaryItem label="段取回数" value={`${dataWorkSessionSetup.length}回`} />
                    </div>

                    {/* Table 1: operations */}
                    <div className="border border-gray-300 rounded-md mb-4 p-2 bg-yellow-50">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                            <SummaryItem label="段取り" value={`${calculateTotalSetupDurationMinutes(dataWorkSessionSetup)}分`} />
                            <SummaryItem label="金型交換" value={`${calculateTotalMoldChangeDurationMinutes(dataWorkSessionMoldChange)}分`} />
                            <SummaryItem label="材料交換" value={`${calculateTotalMaterialChangeDurationMinutes(dataWorkSessionMaterialChange)}分`} />
                            <SummaryItem label="調整" value={`${calculateTotalAdjustmentBeginDurationMinutes(dataWorkSessionAdjustmentBegin)}分`} />

                            <SummaryItem label="設備故障" value={`${calculateTotalEquipmentRepairDurationMinutes(dataWorkSesionEquipmentRepair)}分`} />
                            <SummaryItem label="異常処置" value="X分" />
                            <SummaryItem label="生産準備" value={`${calculateTotalProductionPrepCheckDurationMinutes(dataWorkSessionProductionPrepCheck)}分`} />
                            <SummaryItem label="他機対応" value={`${calculateTotalOrtherMachinesSupportDurationMinutes(dataWorkSesionOrtherMachinesSupport)}分`} />

                            <SummaryItem label="品質チェック" value={`${calculateTotalQuanlityCheckDurationMinutes(dataWorkSesionQuanlityCheck)}分`} />
                            <SummaryItem label="選別" value={`${calculateTotalSortingDurationMinutes(dataWorkSessionSorting)}分`} />
                            <SummaryItem label="4S" value={`${calculateTotal4SDurationMinutes(dataWorkSession4S)}分`} />
                            <SummaryItem label="その他停止" value={`${calculateTotalOrtherStopDurationMinutes(dataWorkSesionOrtherStop)}分`} />
                        </div>
                    </div>

                    {/* Table 2: meetings and breaks */}
                    <div className="border border-gray-300 rounded-md mb-4 p-2 bg-rose-50">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                            <SummaryItem label="休憩" value={`${calculateTotalDurationMinutes(dataReasonForStoppingBreakStart)}分`} />
                            <SummaryItem label="ミーティング" value={`${calculateTotalDurationMinutes(dataReasonForStoppingMeetingStart)}分`} />
                            <SummaryItem label="計画保全" value={`${calculateTotalDurationMinutes(dataReasonForStoppingPlannedMaintenance)}分`} />
                            <SummaryItem label="4S（昼休憩後）" value="X分" />

                            <SummaryItem label="かんばんなし" value={`${calculateTotalDurationMinutes(dataReasonForStoppingNoKanbanStart)}分`} />
                            <SummaryItem label="材料・金型欠品" value={`${calculateTotalDurationMinutes(dataReasonForStoppingMaterialMoldShortage)}分`} />
                            <SummaryItem label="作業者なし" value="X分" />
                            <SummaryItem label="その他停止" value="X分" />
                        </div>
                    </div>

                    {/* Performance summary */}
                    <div className="grid grid-cols-4 gap-2 text-sm text-center">
                        <SummaryItem label="時間稼働率" value="X%" />
                        <SummaryItem label="性能稼働率" value="X%" />
                        <SummaryItem label="良品率" value="X%" />
                        <SummaryItem label="設備総合効率" value="X%" />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Helper component
function SummaryItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-1 border border-gray-200 rounded-sm bg-white">
            <span className="text-xs text-gray-600">{label}</span>
            <span className="font-semibold text-gray-900">{value}</span>
        </div>
    )
}
