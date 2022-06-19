export default function msToTime(ms) {
  const seconds = Math.round(ms / 1000);
  const minutes = Math.round(ms / (1000 * 60));
  const hours = Math.round(ms / (1000 * 60 * 60));
  const days = Math.round(ms / (1000 * 60 * 60 * 24));

  if (seconds < 60) {
    return `${seconds} sec`;
  } else if (minutes < 60) {
    return `${minutes} min`;
  } else if (hours < 24) {
    return `${hours} hrs`;
  } else {
    return `${days} days`;
  }
}