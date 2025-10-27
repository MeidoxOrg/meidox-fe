export function getEndTimeFromStart(timeStart: string) {
  const [hour, minute] = timeStart.split(":").map(Number);
  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute + 1);
  date.setSeconds(0);

  return {
    endHour: date.getHours().toString().padStart(2, "0"),
    endMinute: date.getMinutes().toString().padStart(2, "0"),
  };
}
