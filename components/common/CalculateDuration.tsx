// utils/calculateDuration.ts

/**
 * Hàm tính tổng thời gian (phút) giữa các cặp (dateStart/timeStart) và (dateComplete/timeComplete)
 * Dùng cho mọi loại dữ liệu WorkSession hoặc ReasonForStopping.
 * 
 * @param items Mảng đối tượng có các trường dateStart, timeStart, dateComplete, timeComplete
 * @returns Tổng số phút (number)
 */
export function calculateTotalDurationMinutes<
    T extends {
        dateStart?: string | null
        timeStart?: string | null
        dateComplete?: string | null
        timeComplete?: string | null
    }
>(items: T[] = []): number {
    if (!Array.isArray(items) || items.length === 0) return 0

    return items.reduce((sum, item) => {
        const { dateStart, timeStart, dateComplete, timeComplete } = item
        if (!dateStart || !timeStart || !dateComplete || !timeComplete) return sum

        // Ghép date + time thành ISO string
        const start = new Date(`${dateStart}T${timeStart}`)
        const end = new Date(`${dateComplete}T${timeComplete}`)

        // Nếu giờ kết thúc nhỏ hơn giờ bắt đầu → qua ngày hôm sau
        if (end < start) end.setDate(end.getDate() + 1)

        const diffMinutes = Math.round((end.getTime() - start.getTime()) / 60000)
        return sum + diffMinutes
    }, 0)
}
