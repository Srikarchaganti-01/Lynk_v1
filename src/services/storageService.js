const HISTORY_KEY = "lynk_history";

export function saveHistory(message) {
  const history = getHistory();

  const newEntry = {
    id: Date.now(),
    message: message,
    type: "Transmitted",
    time: new Date().toLocaleTimeString(),
  };

  localStorage.setItem(HISTORY_KEY, JSON.stringify([...history, newEntry]));
}

export function getHistory() {
  const data = localStorage.getItem(HISTORY_KEY);

  return data ? JSON.parse(data) : [];
}
