import React from "react";

function TransmitMsg({ status, message }) {
  const getBadge = () => {
    switch (status) {
      case "Receiving":
        return "bg-purple-100 text-purple-700";
      case "Transmitting":
        return "bg-blue-100 text-blue-700";
      case "Connected":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-red-100 text-red-700";
    }
  };

  const getMessage = () => {
    switch (status) {
      case "Disconnected":
        return "ESP32 is disconnected.";
      case "Connected":
        return "Waiting for a transmission...";
      default:
        return message;
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black">Message in Void</h2>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${getBadge()}`}
        >
          {status}
        </span>
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className=" text-xl font-semibold tracking-wide text-black">
          {getMessage()}
        </p>
      </div>
    </div>
  );
}

export default TransmitMsg;
