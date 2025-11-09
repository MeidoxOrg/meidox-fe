import { WorkSessionProductionByWsId } from "@/model/work-session-production";

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
