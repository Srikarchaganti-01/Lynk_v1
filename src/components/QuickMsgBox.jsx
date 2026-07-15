function QuickMsgBox({ messages, onSend }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-black">Quick Messages</h2>

      <div className="grid grid-cols-2 gap-3">
        {messages.map((msg, index) => (
          <button
            key={index}
            onClick={() => onSend(msg)}
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium transition hover:bg-black hover:text-white"
          >
            {msg}
          </button>
        ))}
      </div>
    </div>
  );
}

export default QuickMsgBox;
