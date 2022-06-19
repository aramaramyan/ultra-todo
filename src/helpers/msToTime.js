export default function dateConverter(milliseconds) {
  const seconds = Math.floor((milliseconds / 1000) % 60);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    seconds,
    minutes,
    hours,
    days
  };
}