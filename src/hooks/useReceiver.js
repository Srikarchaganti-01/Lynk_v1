import { useEffect } from "react";
import { getReceived } from "../services/espService";
import { saveHistory } from "../services/storageService";

function useReceiver({ onReceive, setReceiving }) {
  useEffect(() => {
    let previousMessage = "";

    const fetchReceived = async () => {
      const data = await getReceived();

      if (data && data.message !== "") {
        setReceiving(true);

        if (data.ready && data.message !== previousMessage) {
          previousMessage = data.message;

          saveHistory(data.message, "Received");

          setReceiving(false);

          onReceive();
        }
      }
    };

    const interval = setInterval(fetchReceived, 500);

    return () => clearInterval(interval);
  }, []);
}

export default useReceiver;
