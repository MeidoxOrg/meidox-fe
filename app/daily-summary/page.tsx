"use client"

import { useCallback, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import workSessionServices from "@/services/work-session"
import workSessionProduction from "@/services/work-session-production"
import workSessionMaterialChangeServies from "@/services/work-session-material-change"
import workSessionAdjustmentBeginServies from "@/services/work-session-adjustment-begin"
import workSession4SServies from "@/services/work-session-4s"
import workSessionProductionPrepCheckServies from "@/services/work-session-production-prep-check"
import workSessionSortingServies from "@/services/work-session-sorting"
import workSessionOtherStopServies from "@/services/work-session-other-stop"
import workSessionEquipmentRepairServies from "@/services/work-session-equipment-repair​"
import workSessionOtherMachineSupportServies from "@/services/work-session-other-machine-support"
import workSessionQualityCheckServies from "@/services/work-session-quality-check"
import reasonForStoppingBreakStartServies from "@/services/reason-for-stopping-break-start"
import reasonForStoppingNoKanbanStartServies from "@/services/reason-for-stopping-no-kanban"
import reasonForStoppingMeetingStartServies from "@/services/reason-for-stopping-meeting-start"
import reasonForStoppingMaterialMoldShortageServies from "@/services/reason-for-stopping-material-mold-shortage"
import reasonForStoppingPlannedMaintenanceServies from "@/services/reason-for-stopping-planned-maintenance"
import reasonForStoppingNoOperatorServies from "@/services/reason-for-stopping-no-operator​"
import reasonForStoppingFourSAfterLunchStartServies from "@/services/reason-for-stopping-four-s-after-lunchStart​"
import reasonForStoppingOtherPlannedStopStartServies from "@/services/reason-for-stopping-other-planned-stop-start"

import { localStorageService } from "@/helper/localstorage"
import { WORKSESSION_ID } from "@/utils/constants"
import { formatDateToJapanese, formatTimeToJapanese } from "@/utils/time-utils"


import type {
    WorkSessionModel,
    WorkSessionSetupByWs,
} from "@/model/work-session"
import type { WorkSessionProductionByWsId } from "@/model/work-session-production"
import type { WorkSessionMoldChangeByWsId } from "@/model/work-session-mold-change"
import type { WorkSessionMaterialChangeByWsId } from "@/model/work-session-material-change"
import type { WorkSessionAdjustmentBeginByWsId } from "@/model/work-session-adjustment-begin"
import type { WorkSession4SByWsId } from "@/model/work-session-4s"
import type { WorkSessionProductionPrepCheckByWsId } from "@/model/work-session-production-prep-check"
import type { WorkSessionSortingByWsId } from "@/model/work-session-sorting"
import type { WorkSessionOtherStopByWsId } from "@/model/work-session-other-stop"
import type { WorkSessionEquipmentRepairByWsId } from "@/model/work-session-equipment-repair​"
import type { WorkSessionOtherMachineSupportByWsId } from "@/model/work-session-other-machine-support"
import type { WorkSessionQualityCheckByWsId } from "@/model/work-session-quality-check"
import type { ReasonForStoppingBreakStartByWsId } from "@/model/reason-for-stopping-break-start"
import type { ReasonForStoppingNoKanbanStartByWsId } from "@/model/reason-for-stopping-no-kanban"
import type { ReasonForStoppingMeetingStartByWsId } from "@/model/reason-for-stopping-meeting-start"
import type { ReasonForStoppingMaterialMoldShortageByWsId } from "@/model/reason-for-stopping-material-mold-shortage"
import type { ReasonForStoppingPlannedMaintenanceByWsId } from "@/model/reason-for-stopping-planned-maintenance"
import type { ReasonForStoppingNoOperatorByWsId } from "@/model/reason-for-stopping-no-operator​"
import type { ReasonForStoppingFourSAfterLunchStartByWsId } from "@/model/reason-for-stopping-four-s-after-lunchStart​"
import type { ReasonForStoppingOtherPlannedStopStartByWsId } from "@/model/reason-for-stopping-other-planned-stop-start"
import { WorkSessionCardList } from "@/components/common/WorkSessionCardList"
import { calculateTotalDurationMinutes } from "@/components/common/CalculateDuration"

export default function DailySummaryPage() {
    const [selectedDate] = useState("2025年8月28日")
    const [shift] = useState("黄")
    const [machine] = useState("CPH35")
    const { data: session } = useSession()
    const router = useRouter()
    const workSessionId = localStorageService.get<string>(WORKSESSION_ID, "")

    const [workSessionData, setWorkSessionData] = useState<WorkSessionModel>()
    const [dataWorkSessionSetup, setDataWorkSessionSetup] = useState<WorkSessionSetupByWs[]>([])
    const [dataWorkSessionProduction, setDataWorkSessionProduction] = useState<WorkSessionProductionByWsId[]>([])
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
    const [dataReasonForStoppingNoOperator, setDataReasonForStoppingNoOperator] = useState<ReasonForStoppingNoOperatorByWsId[]>([])
    const [dataReasonForStoppingFourSAfterLunchStart, setDataReasonForStoppingFourSAfterLunchStart] = useState<ReasonForStoppingFourSAfterLunchStartByWsId[]>([])
    const [dataReasonForStoppingOtherPlannedStopStart, setDataReasonForStoppingOtherPlannedStopStart] = useState<ReasonForStoppingOtherPlannedStopStartByWsId[]>([])

    /** ─── 🧩 Common fetcher ───────────────────────────────────────────────── */
    const fetchData = useCallback(async () => {
        try {
            const [
                ws, setup, prod, mold, material, adjust, fourS, prep, sorting, otherStop,
                repair, otherMachine, quality, breakStart, noKanban, meeting, shortage,
                maintenance, noOp, fourSAfter, otherPlanned,
            ] = await Promise.all([
                workSessionServices.getWorkSessionById(workSessionId),
                workSessionServices.getWorkSessionSetupByWsId(workSessionId),
                workSessionProduction.getWorkSessionProductionByWsId(workSessionId),
                workSessionProduction.getWorkSessionMoldChangeByWsId(workSessionId),
                workSessionMaterialChangeServies.getWorkSessionMaterialChangeByWsId(workSessionId),
                workSessionAdjustmentBeginServies.getWorkSessionAdjustmentBeginByWsId(workSessionId),
                workSession4SServies.getWorkSession4SByWsId(workSessionId),
                workSessionProductionPrepCheckServies.getWorkSessionProductionPrepCheckByWsId(workSessionId),
                workSessionSortingServies.getWorkSessionSortingByWsId(workSessionId),
                workSessionOtherStopServies.getWorkSessionOtherStopByWsId(workSessionId),
                workSessionEquipmentRepairServies.getWorkSessionEquipmentRepairByWsId(workSessionId),
                workSessionOtherMachineSupportServies.getWorkSessionOtherMachineSupportByWsId(workSessionId),
                workSessionQualityCheckServies.getWorkSessionQualityCheckByWsId(workSessionId),
                reasonForStoppingBreakStartServies.getReasonForStoppingBreakStartByWsId(workSessionId),
                reasonForStoppingNoKanbanStartServies.getReasonForStoppingNoKanbanStartByWsId(workSessionId),
                reasonForStoppingMeetingStartServies.getReasonForStoppingMeetingStartByWsId(workSessionId),
                reasonForStoppingMaterialMoldShortageServies.getReasonForStoppingMaterialMoldShortageByWsId(workSessionId),
                reasonForStoppingPlannedMaintenanceServies.getReasonForStoppingPlannedMaintenanceByWsId(workSessionId),
                reasonForStoppingNoOperatorServies.getReasonForStoppingNoOperatorByWsId(workSessionId),
                reasonForStoppingFourSAfterLunchStartServies.getReasonForStoppingFourSAfterLunchStartByWsId(workSessionId),
                reasonForStoppingOtherPlannedStopStartServies.getReasonForStoppingOtherPlannedStopStartByWsId(workSessionId),
            ])

            setWorkSessionData(ws.workSession)
            setDataWorkSessionSetup(setup.workSessionSetups)
            setDataWorkSessionProduction(prod.workSessionProductions)
            setDataWorkSessionMoldChange(mold.workSessionMoldChanges)
            setDataWorkSessionMaterialChange(material.workSessionMaterialChanges)
            setDataWorkSessionAdjustmentBegin(adjust.workSessionAdjustmentBegins)
            setDataWorkSession4S(fourS.workSession4Ss)
            setDataWorkSessionProductionPrepCheck(prep.workSessionProductionPrepChecks)
            setDataWorkSessionSorting(sorting.workSessionSortings)
            setDataWorkSesionOrtherStop(otherStop.workSessionOtherStops)
            setDataWorkSesionEquipmentRepair(repair.workSessionEquipmentRepairs)
            setDataWorkSesionOrtherMachinesSupport(otherMachine.workSessionOtherMachineSupports)
            setDataWorkSesionQuanlityCheck(quality.workSessionQualityChecks)
            setDataReasonForStoppingBreakStart(breakStart.reasonForStoppingBreakStarts)
            setDataReasonForStoppingNoKanbanStart(noKanban.reasonForStoppingNoKanbanStarts)
            setDataReasonForStoppingMeetingStart(meeting.reasonForStoppingMeetingStarts)
            setDataReasonForStoppingMaterialMoldShortage(shortage.reasonForStoppingMaterialMoldShortages)
            setDataReasonForStoppingPlannedMaintenance(maintenance.reasonForStoppingPlannedMaintenances)
            setDataReasonForStoppingNoOperator(noOp.reasonForStoppingNoOperators)
            setDataReasonForStoppingFourSAfterLunchStart(fourSAfter.reasonForStoppingFourSAfterLunchStarts)
            setDataReasonForStoppingOtherPlannedStopStart(otherPlanned.reasonForStoppingOtherPlannedStopStarts)
        } catch (err) {
            console.error("データ取得失敗:", err)
        }
    }, [workSessionId])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    /** ─── 🧮 Helper Summary ──────────────────────────────────────────────── */
    const calculateStandardProcessingQuantity = (list: WorkSessionProductionByWsId[]) =>
        list.reduce((sum, x) => sum + (x.numberOfGoodProduct || 0), 0)

    const calculateDefectQuantity = (list: WorkSessionSetupByWs[]) =>
        list.reduce((sum, x) => sum + (x.adjustmentItemUnit || 0), 0)

    /** ─── 🧱 UI ──────────────────────────────────────────────────────────── */
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="flex items-center justify-between p-3 bg-white border-b border-gray-300">
                <h1 className="text-2xl font-bold flex items-center">一覧</h1>
                <div className="flex items-center space-x-2">
                    <Input value={selectedDate} readOnly className="w-36 text-center" />
                    <Input value={shift} readOnly className="w-12 text-center" />
                    <Input value={machine} readOnly className="w-20 text-center" />
                    <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
                        <Home className="text-amber-800" />
                    </Button>
                </div>
            </header>

            {/* Main */}
            <div className="flex flex-1 flex-col md:flex-row overflow-hidden">
                {/* LEFT */}
                <div className="w-full md:w-1/2 overflow-y-auto p-3 bg-gray-50 border-r border-gray-200">
                    {/* 作業開始 */}
                    <Card className="p-3 mb-3 bg-gray-100 rounded-md shadow-sm">
                        <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-[13px] leading-tight text-gray-800">
                            <p>{formatDateToJapanese(workSessionData?.workDate ?? "")}</p>
                            <p>{formatTimeToJapanese(workSessionData?.workTime ?? "")}</p>
                            <p>{session?.user?.username}</p>
                            <p>作業開始</p>
                        </div>
                    </Card>

                    {/* Cards */}
                    <WorkSessionCardList data={dataWorkSessionSetup} startLabel="段取り開始" endLabel="段取り完了" />
                    <WorkSessionCardList data={dataWorkSessionProduction} startLabel="生産開始" endLabel="生産終了" />
                    <WorkSessionCardList data={dataWorkSessionMoldChange} startLabel="金型交換開始" endLabel="金型交換完了" />
                    <WorkSessionCardList data={dataWorkSessionMaterialChange} startLabel="材料交換開始" endLabel="材料交換終了" />
                    <WorkSessionCardList data={dataWorkSessionAdjustmentBegin} startLabel="調整開始" endLabel="調整終了" />
                    <WorkSessionCardList data={dataWorkSession4S} startLabel="4S開始" endLabel="4S終了" />
                    <WorkSessionCardList data={dataWorkSessionProductionPrepCheck} startLabel="生産準備開始" endLabel="生産準備終了" />
                    <WorkSessionCardList data={dataWorkSessionSorting} startLabel="仕分け開始" endLabel="仕分け終了" />
                    <WorkSessionCardList data={dataWorkSesionOrtherStop} startLabel="その他停止開始" endLabel="その他停止終了" />
                    <WorkSessionCardList data={dataWorkSesionEquipmentRepair} startLabel="設備修理開始" endLabel="設備修理終了" />
                    <WorkSessionCardList data={dataWorkSesionOrtherMachinesSupport} startLabel="他機対応開始" endLabel="他機対応終了" />
                    <WorkSessionCardList data={dataWorkSesionQuanlityCheck} startLabel="品質チェック開始" endLabel="品質チェック終了" />

                    {/* Reason stops */}
                    <WorkSessionCardList data={dataReasonForStoppingBreakStart} startLabel="休憩開始" endLabel="休憩終了" />
                    <WorkSessionCardList data={dataReasonForStoppingNoKanbanStart} startLabel="かんばんなし開始" endLabel="かんばんなし終了" />
                    <WorkSessionCardList data={dataReasonForStoppingMeetingStart} startLabel="ミーティング開始" endLabel="ミーティング終了" />
                    <WorkSessionCardList data={dataReasonForStoppingMaterialMoldShortage} startLabel="材料・金型欠品開始" endLabel="材料・金型欠品終了" />
                    <WorkSessionCardList data={dataReasonForStoppingPlannedMaintenance} startLabel="計画保全開始" endLabel="計画保全終了" />
                    <WorkSessionCardList data={dataReasonForStoppingNoOperator} startLabel="作業者なし開始" endLabel="作業者なし終了" />
                    <WorkSessionCardList data={dataReasonForStoppingFourSAfterLunchStart} startLabel="４Ｓ（昼休憩後）開始" endLabel="４Ｓ（昼休憩後）終了" />
                    <WorkSessionCardList data={dataReasonForStoppingOtherPlannedStopStart} startLabel="その他計画停止開始" endLabel="その他計画停止終了" />
                </div>

                {/* RIGHT */}
                <div className="w-full md:w-1/2 overflow-y-auto p-4 bg-white">
                    <div className="grid grid-cols-4 gap-2 text-sm mb-4">
                        <SummaryItem label="標準加工数" value={`${calculateStandardProcessingQuantity(dataWorkSessionProduction)}個`} />
                        <SummaryItem label="負荷時間" value="X分" />
                        <SummaryItem label="停止時間" value="X分" />
                        <SummaryItem label="稼働時間" value="X分" />
                        <SummaryItem label="操業時間" value="X分" />
                        <SummaryItem label="良品数" value="X個" />
                        <SummaryItem label="異常数" value={`${calculateDefectQuantity(dataWorkSessionSetup)}個`} />
                        <SummaryItem label="段取り回数" value={`${dataWorkSessionSetup.length}回`} />
                    </div>

                    {/* Table: 作業区分 */}
                    <div className="border border-gray-300 rounded-md mb-4 p-2 bg-yellow-50">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                            <SummaryItem label="段取り" value={`${calculateTotalDurationMinutes(dataWorkSessionSetup)}分`} />
                            <SummaryItem label="金型交換" value={`${calculateTotalDurationMinutes(dataWorkSessionMoldChange)}分`} />
                            <SummaryItem label="材料交換" value={`${calculateTotalDurationMinutes(dataWorkSessionMaterialChange)}分`} />
                            <SummaryItem label="調整" value={`${calculateTotalDurationMinutes(dataWorkSessionAdjustmentBegin)}分`} />
                            <SummaryItem label="設備故障" value={`${calculateTotalDurationMinutes(dataWorkSesionEquipmentRepair)}分`} />
                            <SummaryItem label="生産準備" value={`${calculateTotalDurationMinutes(dataWorkSessionProductionPrepCheck)}分`} />
                            <SummaryItem label="他機対応" value={`${calculateTotalDurationMinutes(dataWorkSesionOrtherMachinesSupport)}分`} />
                            <SummaryItem label="品質チェック" value={`${calculateTotalDurationMinutes(dataWorkSesionQuanlityCheck)}分`} />
                            <SummaryItem label="選別" value={`${calculateTotalDurationMinutes(dataWorkSessionSorting)}分`} />
                            <SummaryItem label="4S" value={`${calculateTotalDurationMinutes(dataWorkSession4S)}分`} />
                            <SummaryItem label="その他停止" value={`${calculateTotalDurationMinutes(dataWorkSesionOrtherStop)}分`} />
                        </div>
                    </div>

                    {/* Table: 停止区分 */}
                    <div className="border border-gray-300 rounded-md mb-4 p-2 bg-rose-50">
                        <div className="grid grid-cols-4 gap-2 text-sm">
                            <SummaryItem label="休憩" value={`${calculateTotalDurationMinutes(dataReasonForStoppingBreakStart)}分`} />
                            <SummaryItem label="ミーティング" value={`${calculateTotalDurationMinutes(dataReasonForStoppingMeetingStart)}分`} />
                            <SummaryItem label="計画保全" value={`${calculateTotalDurationMinutes(dataReasonForStoppingPlannedMaintenance)}分`} />
                            <SummaryItem label="4S（昼休憩後）" value={`${calculateTotalDurationMinutes(dataReasonForStoppingFourSAfterLunchStart)}分`} />
                            <SummaryItem label="かんばんなし" value={`${calculateTotalDurationMinutes(dataReasonForStoppingNoKanbanStart)}分`} />
                            <SummaryItem label="材料・金型欠品" value={`${calculateTotalDurationMinutes(dataReasonForStoppingMaterialMoldShortage)}分`} />
                            <SummaryItem label="作業者なし" value={`${calculateTotalDurationMinutes(dataReasonForStoppingNoOperator)}分`} />
                            <SummaryItem label="その他計画停止" value={`${calculateTotalDurationMinutes(dataReasonForStoppingOtherPlannedStopStart)}分`} />
                        </div>
                    </div>

                    {/* KPI */}
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

function SummaryItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col items-center justify-center p-1 border border-gray-200 rounded-sm bg-white">
            <span className="text-xs text-gray-600">{label}</span>
            <span className="font-semibold text-gray-900">{value}</span>
        </div>
    )
}
