export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function generateId() {
  return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}
