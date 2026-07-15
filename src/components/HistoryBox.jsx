import React from "react";

function HistoryBox({ history }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-200">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black">
          Transmission History
        </h2>

        <span className="text-sm text-gray-500">{history.length} Messages</span>
      </div>

      <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
        {history.length === 0 ? (
          <p className="text-center text-gray-500">No history available</p>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-100 p-4"
            >
              <div className="flex-1">
                <p className="font-medium text-black">{item.message}</p>
              </div>

              <span
                className={`ml-4 rounded-full px-3 py-1 text-xs font-medium ${
                  item.type === "sent"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.type === "sent" ? "Transmitted" : "Received"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoryBox;
