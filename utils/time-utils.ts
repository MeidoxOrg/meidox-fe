export function getEndTimeFromStart(timeStart: string) {
  const [hour, minute] = timeStart.split(":").map(Number);
  const date = new Date();
  date.setHours(hour);
  // date.setMinutes(minute + 1);
  date.setMinutes(minute);
  date.setSeconds(0);

  return {
    endHour: date.getHours().toString().padStart(2, "0"),
    endMinute: date.getMinutes().toString().padStart(2, "0"),
  };
}

export function formatDateToJapanese(dateStr: string): string {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}年${month}月${day}日`;
}

export function formatTimeToJapanese(timeStr: string): string {
  const [hour, minute] = timeStr.split(":");
  return `${parseInt(hour)}時${parseInt(minute)}分`;
}
