import { useEffect, useState } from "react";
import { getTransmission } from "../services/espService";
import { saveHistory } from "../services/storageService";

function useTransmission({ onComplete }) {
  const [transmission, setTransmission] = useState({
    status: "Connected",
    message: "",
    currentChar: "-",
    currentMorse: "",
    progress: 0,
  });

  useEffect(() => {
    let previousStatus = "Connected";

    const fetchData = async () => {
      const data = await getTransmission();

      if (data) {
        setTransmission(data);

        if (previousStatus === "Transmitting" && data.status === "Connected") {
          saveHistory(data.message);

          onComplete();
        }

        previousStatus = data.status;
      }
    };

    const interval = setInterval(fetchData, 100);

    return () => clearInterval(interval);
  }, []);

  return {
    transmission,
  };
}

export default useTransmission;
