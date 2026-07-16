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
import { sendMessage } from "../services/espService";
import { quickMessages } from "../data/quickMsgs";
import useESPConnection from "../hooks/useESPConnection";
import useTransmission from "../hooks/useTransmission";
import useReceiver from "../hooks/useReceiver";
import { saveHistory, getHistory } from "../services/storageService";

import { mockAnalytics } from "../data/mockData";

function Home() {
  const { status, setReceiving } = useESPConnection();
  const { transmission } = useTransmission({
    onComplete: () => {
      setHistory(getHistory());
    },
  });

  const [history, setHistory] = useState(getHistory());
  useReceiver({
    onReceive: () => {
      setHistory(getHistory());
    },

    setReceiving,
  });
  // Common function for MessageBox + QuickMsgBox
  // const handleSend = (message) => {
  //   if (!message.trim()) return;

  //   startTransmission(message, "Transmitting");

  //   // Fake transmission for now
  //   setTimeout(() => {
  //     stopTransmission();

  //     saveHistory(message);

  //     setHistory(getHistory());
  //   }, 3000);
  // };

  // const handleSend = (message) => {
  //   startTransmission(message, "Transmitting");

  //   sendMessage(message);
  // };
  const handleSend = async (message) => {
    await sendMessage(message);
  };

  const analytics = {
    sentMessages: history.filter((item) => item.type === "Transmitted").length,

    receivedMessages: history.filter((item) => item.type === "Received").length,

    totalCharacters: history.reduce(
      (total, item) => total + (item.message?.length || 0),
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
              receivingStatus={status}
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
