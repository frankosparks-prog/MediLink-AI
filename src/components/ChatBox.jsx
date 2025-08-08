import { useState, useRef, useEffect } from "react";

const ChatBox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "👋 Hi! Tell me your symptoms, and I’ll try to help you understand what could be wrong.",
    },
  ]);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    const aiResponse = {
      from: "ai",
      text: "🤖 Based on your symptoms, it could be flu or a cold. Please consult a doctor for full diagnosis.",
    };

    setMessages((prev) => [...prev, userMessage, aiResponse]);
    setInput("");
  };

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-blue-100 p-4 flex flex-col h-[420px]">
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-end ${msg.from === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.from === "ai" && (
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-2 shadow">
                <span role="img" aria-label="AI">🤖</span>
              </div>
            )}
            <div
              className={`px-4 py-2 rounded-2xl shadow
                ${msg.from === "ai"
                  ? "bg-gradient-to-br from-blue-100 to-blue-200 text-blue-900"
                  : "bg-gradient-to-br from-green-100 to-green-200 text-green-900"}
                max-w-[75%] break-words`}
            >
              {msg.text}
            </div>
            {msg.from === "user" && (
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center ml-2 shadow">
                <span role="img" aria-label="User">🧑</span>
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          placeholder="Describe your symptoms..."
          className="flex-1 px-4 py-2 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-400 outline-none bg-white/80 shadow"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-6 py-2 rounded-xl font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;