import { useState } from "react";

function useTransmission() {
  const [transmission, setTransmission] = useState({
    status: "Connected",
    message: "",
    currentChar: "",
    currentMorse: "",
    progress: 0,
  });

  const startTransmission = (message, mode = "Transmitting") => {
    setTransmission({
      status: mode,
      message: message,
      currentChar: "",
      currentMorse: "",
      progress: 0,
    });
  };

  const updateTransmission = (data) => {
    setTransmission((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const stopTransmission = () => {
    setTransmission({
      status: "Connected",
      message: "",
      currentChar: "",
      currentMorse: "",
      progress: 0,
    });
  };

  return {
    transmission,
    startTransmission,
    updateTransmission,
    stopTransmission,
  };
}

export default useTransmission;
