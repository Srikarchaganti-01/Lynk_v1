import { useState } from "react";
import {
  Navbar,
  MessageBox,
  StatusBox,
  TransmitMsg,
  TransmitData,
  QuickMsgBox,
  AnalyticsBox,
  HistoryBox,
  Footer,
} from "../components";

import { quickMessages } from "../data/quickMsgs";
import useESPConnection from "../hooks/useESPConnection";
import useTransmission from "../hooks/useTransmission";

import { saveHistory, getHistory } from "../services/storageService";

import { mockAnalytics } from "../data/mockData";

function Home() {
  const { status } = useESPConnection();

  const {
    transmission,
    startTransmission,
    updateTransmission,
    stopTransmission,
  } = useTransmission();

  const [history, setHistory] = useState(getHistory());

  // Common function for MessageBox + QuickMsgBox
  const handleSend = (message) => {
    if (!message.trim()) return;

    startTransmission(message, "Transmitting");

    // Fake transmission for now
    setTimeout(() => {
      stopTransmission();

      saveHistory(message);

      setHistory(getHistory());
    }, 3000);
  };
  const analytics = {
    sentMessages: history.filter((item) => item.type === "Transmitted").length,

    receivedMessages: history.filter((item) => item.type === "Received").length,

    totalCharacters: history.reduce(
      (total, item) => total + item.message.length,
      0,
    ),
  };
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar connectionStatus={status} />

      <main className="mx-auto max-w-7xl p-6">
        {/* Input + Status */}

        <div className="mb-15 flex w-full justify-between">
          <div className="w-[55%]">
            <MessageBox onSend={handleSend} />
          </div>

          <div className="w-[35%]">
            <StatusBox
              connectionStatus={status}
              transmissionStatus={transmission.status}
            />
          </div>
        </div>

        {/* Transmission */}

        <div className="flex w-full justify-between">
          <div className="w-[40%]">
            <TransmitMsg
              status={transmission.status}
              message={transmission.message}
            />
          </div>

          <div className="w-[50%]">
            <TransmitData
              status={transmission.status}
              currentChar={transmission.currentChar}
              currentMorse={transmission.currentMorse}
              progress={transmission.progress}
            />
          </div>
        </div>

        {/* Quick Messages + Analytics */}

        <div className="mb-20 flex w-full justify-between">
          <div className="w-[50%]">
            <QuickMsgBox messages={quickMessages} onSend={handleSend} />
          </div>

          <div className="w-[35%]">
            <AnalyticsBox analytics={analytics} />
          </div>
        </div>

        {/* History */}

        <HistoryBox history={history} />
      </main>

      <Footer />
    </div>
  );
}

export default Home;
