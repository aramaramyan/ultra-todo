export default function getID() {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substr(10);

  return head + tail;
}