import React from "react";
function TransmitData({ status, currentChar, currentMorse, progress }) {
  const active = status === "Transmitting" || status === "Receiving";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 mb-20 shadow-2xl shadow-gray-600">
      <h2 className="mb-4 text-lg font-semibold text-black">
        Live Transmission
      </h2>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <p className="mb-2 text-sm text-gray-500">Character</p>

          <h3 className="text-3xl font-bold text-black">
            {active ? currentChar : "-"}
          </h3>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <p className="mb-2 text-sm text-gray-500">Morse</p>

          <h3 className="font-mono text-2xl font-bold text-black">
            {active ? currentMorse : "-"}
          </h3>
        </div>

        <div className="rounded-lg bg-gray-50 p-4 text-center">
          <p className="mb-2 text-sm text-gray-500">Progress</p>

          <h3 className="text-3xl font-bold text-black">
            {active ? `${progress}%` : "-"}
          </h3>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            active ? "bg-black" : "bg-gray-300"
          }`}
          style={{ width: active ? `${progress}%` : "0%" }}
        />
      </div>
    </div>
  );
}

export default TransmitData;
