import { Wifi, WifiOff, Radio } from "lucide-react";

function StatusBox({ connectionStatus, transmissionStatus, receivingStatus }) {
  const getStatus = () => {
    if (connectionStatus === "Disconnected") {
      return {
        icon: <WifiOff size={50} />,
        text: "ESP Disconnected",
        color: "text-red-600 bg-red-50",
        strength: "N/C",
      };
    }

    if (receivingStatus === "Receiving") {
      return {
        icon: <Radio size={50} />,
        text: "Receiving",
        color: "text-purple-600 bg-purple-50",
        strength: "Good",
      };
    }

    switch (transmissionStatus) {
      case "Transmitting":
        return {
          icon: <Radio size={50} />,
          text: "Transmitting",
          color: "text-blue-600 bg-blue-50",
          strength: "Good",
        };

      default:
        return {
          icon: <Wifi size={50} />,
          text: "ESP Connected",
          color: "text-green-600 bg-green-50",
          strength: "Excellent",
        };
    }
  };

  const current = getStatus();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200">
      <h2 className="mb-4 text-lg font-semibold text-black">Device Status</h2>

      <div
        className={`flex items-center gap-3 rounded-lg px-4 py-3 ${current.color}`}
      >
        {current.icon}

        <div>
          <p className="font-medium">{current.text}</p>
          <p className="text-sm opacity-70">Lynk ESP32 Module</p>
          <p className="text-sm opacity-70">
            Wifi Strength : {current.strength}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StatusBox;
