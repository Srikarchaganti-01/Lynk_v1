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
import {
  mockConnection,
  mockTransmission,
  mockAnalytics,
  mockHistory,
} from "../data/mockData";
import { quickMessages } from "../data/quickMsgs";
function Home() {
  const handleQuickMessage = (message) => {
    console.log("Sending:", message);
    // espService.send(message);
  };
  return (
    <div className="min-h-screen bg-white text-black ">
      <Navbar connectionStatus={mockConnection.status} />

      <main className="mx-auto max-w-7xl p-6">
        <div className="w-full flex justify-between mb-15">
          <div className="w-[55%]">
            <MessageBox />
          </div>
          <div className="w-[35%]">
            <StatusBox status={mockConnection.status} />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-[40%] min-h-fit ">
            <TransmitMsg
              status={mockTransmission.status}
              message={mockTransmission.message}
            />
          </div>
          <div className="w-[50%]">
            <TransmitData
              status={mockTransmission.status}
              currentChar={mockTransmission.currentChar}
              currentMorse={mockTransmission.currentMorse}
              progress={mockTransmission.progress}
            />
          </div>
        </div>
        <div className="w-full flex justify-between mb-20">
          <div className="w-[50%]">
            <QuickMsgBox messages={quickMessages} onSend={handleQuickMessage} />
          </div>
          <div className="w-[35%]">
            <AnalyticsBox analytics={mockAnalytics} />
          </div>
        </div>
        <HistoryBox history={mockHistory} />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
