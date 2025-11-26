import { localStorageService } from "@/helper/localstorage";
import { WorkSessionAbnormalHandlingByWsId } from "@/model/abnormal-handling​";
import { PreviousSessionContext } from "@/model/custom";
import { WorkSessionSetupByWs } from "@/model/work-session";
import { WorkSessionProductionByWsId } from "@/model/work-session-production";
import { PREVIOS_SESSION_CONTEXT } from "./constants";

export function getLatestCompletedSession(
  productions: WorkSessionProductionByWsId[]
): (WorkSessionProductionByWsId & { completeDateTime: Date }) | null {
  if (!productions || productions.length === 0) return null;

  const completedList = productions
    .filter((p) => p.dateComplete && p.timeComplete)
    .map((p) => ({
      ...p,
      completeDateTime: new Date(`${p.dateComplete}T${p.timeComplete}`),
    }))
    .sort(
      (a, b) => b.completeDateTime.getTime() - a.completeDateTime.getTime()
    );

  return completedList.length > 0 ? completedList[0] : null;
}

export function getLatestCompletedAbnormalHandling(
  productions: WorkSessionAbnormalHandlingByWsId[]
): (WorkSessionAbnormalHandlingByWsId & { completeDateTime: Date }) | null {
  if (!productions || productions.length === 0) return null;

  const completedList = productions
    .filter((p) => p.dateComplete && p.timeComplete)
    .map((p) => ({
      ...p,
      completeDateTime: new Date(`${p.dateComplete}T${p.timeComplete}`),
    }))
    .sort(
      (a, b) => b.completeDateTime.getTime() - a.completeDateTime.getTime()
    );

  return completedList.length > 0 ? completedList[0] : null;
}

export function getEarliestSetupStart(
  items: WorkSessionSetupByWs[]
): WorkSessionSetupByWs | null {
  if (!items || items.length === 0) return null;

  return items
    .map((item) => ({
      ...item,
      startDateTime: new Date(`${item.dateStart}T${item.timeStart}`),
    }))
    .sort((a, b) => a.startDateTime.getTime() - b.startDateTime.getTime())[0];
}

export function getLatestComplete<
  T extends { dateComplete: string | null; timeComplete: string | null }
>(items: T[]): T | null {
  if (!items || items.length === 0) return null;
  // Lọc ra những item có dateComplete + timeComplete hợp lệ
  const completed = items.filter(
    (item) => item.dateComplete && item.timeComplete
  );

  if (completed.length === 0) return null;

  return completed
    .map((item) => ({
      ...item,
      completeDateTime: new Date(`${item.dateComplete}T${item.timeComplete}`),
    }))
    .sort(
      (a, b) => b.completeDateTime.getTime() - a.completeDateTime.getTime()
    )[0];
}

export function diffMinutes(
  startTime?: string | null,
  endTime?: string | null
): number {
  if (!startTime || !endTime) return 0;

  const start = new Date(`2000-01-01T${startTime}`);
  const end = new Date(`2000-01-01T${endTime}`);

  // Kiểm tra trường hợp date không hợp lệ
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / 60000); // 1 phút = 60000ms
}

export function sumNumberOfGoodProducts(
  productions: WorkSessionProductionByWsId[] | undefined | null
): number {
  if (!productions || productions.length === 0) return 0;

  return productions.reduce((sum, item) => {
    const value = Number(item.numberOfGoodProduct) || 0;
    return sum + value;
  }, 0);
}

export function sumAbnormalProductPieces(
  list: WorkSessionAbnormalHandlingByWsId[] | undefined | null
): number {
  if (!list || list.length === 0) return 0;

  return list.reduce((sum, item) => {
    const value = Number(item.abnormalProductPieces) || 0;
    return sum + value;
  }, 0);
}

export const handleUpdatePreviousSessionContextGlobal = async (
  value: PreviousSessionContext
) => {
  await localStorageService.set<PreviousSessionContext>(
    PREVIOS_SESSION_CONTEXT,
    value
  );
};
