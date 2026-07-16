const HISTORY_KEY = "lynk_history";

export function saveHistory(message, type = "Transmitted") {
  const history = getHistory();

  const newEntry = {
    id: Date.now(),

    message,

    type,

    time: new Date().toLocaleTimeString(),
  };

  localStorage.setItem(HISTORY_KEY, JSON.stringify([...history, newEntry]));
}
export function getHistory() {
  const data = localStorage.getItem(HISTORY_KEY);

  return data ? JSON.parse(data) : [];
}
