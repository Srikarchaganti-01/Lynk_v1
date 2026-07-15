import { useState } from "react";
import { Send } from "lucide-react";

function MessageBox() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("Sending:", message);

    setMessage("");
    console.log("Sent ");
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xl shadow-gray-400 ">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-black">Message Box</h2>
        <p className="text-sm text-gray-500">
          Enter text to transmit through Morse
        </p>
      </div>

      {/* Input */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        rows={4}
        className="w-full resize-none rounded-lg border border-gray-300 p-3 text-sm text-black outline-none transition focus:shadow-gray-200 focus:shadow-xl"
      />

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {message.length} characters
        </span>

        <button
          onClick={handleSend}
          className="flex items-center gap-2 rounded-lg bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          <Send size={16} />
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageBox;
