import { useEffect, useState } from "react";
import { checkESPConnection } from "../services/espService";

export default function useESPConnection() {
  const [status, setStatus] = useState("Disconnected");

  const checkConnection = async () => {
    const connected = await checkESPConnection();

    setStatus((prev) => {
      if (!connected) {
        return "Disconnected";
      }

      if (prev === "Receiving") {
        return "Receiving";
      }

      return "Connected";
    });
  };

  useEffect(() => {
    checkConnection();

    const interval = setInterval(checkConnection, 5000);

    return () => clearInterval(interval);
  }, []);

  const setReceiving = (value) => {
    setStatus(value ? "Receiving" : "Connected");
  };

  return {
    status,
    setReceiving,
  };
}
