import msToTime from "./msToTime";

export default function getTaskDuration(start, end) {
  const result = end - start;
  return msToTime(result);
}