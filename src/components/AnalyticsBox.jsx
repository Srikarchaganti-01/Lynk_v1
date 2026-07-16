import { ArrowUpRight, ArrowDownLeft, Type } from "lucide-react";

function AnalyticsBox({ analytics }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-black">
        All-Time Analytics
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <ArrowUpRight className="text-green-600" size={20} />
            <span className="text-gray-600">Messages Sent</span>
          </div>

          <span className="text-xl font-bold">{analytics.sentMessages}</span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <ArrowDownLeft className="text-blue-600" size={20} />
            <span className="text-gray-600">Messages Received</span>
          </div>

          <span className="text-xl font-bold">
            {analytics.receivedMessages}
          </span>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div className="flex items-center gap-3">
            <Type className="text-gray-700" size={20} />
            <span className="text-gray-600">Characters</span>
          </div>

          <span className="text-xl font-bold">{analytics.totalCharacters}</span>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsBox;
