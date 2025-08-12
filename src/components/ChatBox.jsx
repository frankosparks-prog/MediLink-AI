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

// const handleSend = async () => {
//   if (!input.trim()) return;

//   const userMessage = { from: "user", text: input };
//   setMessages((prev) => [...prev, userMessage]);
//   setInput("");

//   try {
//     const res = await fetch("/api/ai/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         messages: [
//           { role: "system", content: "You are a helpful medical assistant." },
//           ...messages.map(m => ({
//             role: m.from === "ai" ? "assistant" : "user",
//             content: m.text
//           })),
//           { role: "user", content: input }
//         ]
//       }),
//     });

//     const data = await res.json();
//     const aiReply = { from: "ai", text: data.reply };

//     setMessages((prev) => [...prev, aiReply]);
//   } catch (err) {
//     console.error(err);
//   }
// };



// src/components/ChatBox.jsx
// import { useState, useRef, useEffect } from "react";

// const ChatBox = () => {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([
//     { from: "ai", text: "👋 Hi! Tell me your symptoms, and I’ll try to help." }
//   ]);
//   const [pendingAction, setPendingAction] = useState(null); // { action, messageId }
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages, pendingAction]);

//   const appendMessage = (msg) => setMessages(prev => [...prev, msg]);

//   const handleSend = async () => {
//     if (!input.trim()) return;
//     const userMessage = { from: "user", text: input };
//     appendMessage(userMessage);
//     setInput("");

//     // Build messages history for backend
//     const conversation = messages.concat([userMessage]).map(m => ({
//       role: m.from === "ai" ? "assistant" : "user",
//       content: m.text
//     }));

//     appendMessage({ from: "ai", text: "⏳ Thinking..." });

//     try {
//       const res = await fetch("/api/ai/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messages: conversation }),
//       });
//       const data = await res.json();

//       // Replace the "Thinking..." last AI message with actual reply
//       setMessages(prev => {
//         const copy = [...prev];
//         // find last AI message "Thinking..." and replace
//         const idx = [...copy].reverse().findIndex(m => m.from === "ai" && m.text.includes("Thinking"));
//         if (idx !== -1) {
//           const realIdx = copy.length - 1 - idx;
//           copy[realIdx] = { from: "ai", text: data.message };
//           return copy;
//         }
//         return [...copy, { from: "ai", text: data.message }];
//       });

//       // If AI returned an action, set it as pending (ask user to confirm)
//       if (data.action) {
//         setPendingAction({ action: data.action, aiMessage: data.message });
//       } else {
//         setPendingAction(null);
//       }
//     } catch (err) {
//       console.error(err);
//       appendMessage({ from: "ai", text: "Sorry — something went wrong calling the AI." });
//     }
//   };

//   // Confirm action (user accepts AI suggestion)
//   const confirmAction = async (confirm) => {
//     if (!pendingAction) return;
//     if (!confirm) {
//       appendMessage({ from: "ai", text: "Okay — not proceeding." });
//       setPendingAction(null);
//       return;
//     }

//     const { action } = pendingAction;

//     // Show progress message
//     appendMessage({ from: "ai", text: `✅ OK — I'm performing the action: ${action.name} ...` });

//     try {
//       let resp;
//       if (action.name === "book_appointment") {
//         // call appointments API (requires auth)
//         resp = await fetch("/api/appointments", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`
//           },
//           body: JSON.stringify(action.params)
//         });
//       } else if (action.name === "place_order") {
//         resp = await fetch("/api/medication/order", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`
//           },
//           body: JSON.stringify(action.params)
//         });
//       } else {
//         // unknown action, inform user
//         appendMessage({ from: "ai", text: `I don't know how to perform "${action.name}" yet.`});
//         setPendingAction(null);
//         return;
//       }

//       const result = await resp.json();

//       if (!resp.ok) {
//         appendMessage({ from: "ai", text: `⚠️ Action failed: ${result.message || JSON.stringify(result)}` });
//       } else {
//         appendMessage({ from: "ai", text: `✅ Done: ${result.message || "Action completed."}` });
//         // Optionally append order/appointment details
//         appendMessage({ from: "ai", text: `Here are the details:\n${JSON.stringify(result.order || result.appointment || result, null, 2)}` });
//       }
//     } catch (err) {
//       console.error(err);
//       appendMessage({ from: "ai", text: "⚠️ Error performing action." });
//     } finally {
//       setPendingAction(null);
//     }
//   };

//   return (
//     <div className="bg-white/80 rounded-2xl p-4 flex flex-col h-[480px]">
//       <div className="flex-1 overflow-y-auto pr-2 mb-3 space-y-3">
//         {messages.map((msg, i) => (
//           <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
//             {msg.from === "ai" && <div className="mr-2 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">🤖</div>}
//             <div className={`px-4 py-2 rounded-2xl max-w-[75%] ${msg.from==="ai" ? "bg-blue-50 text-blue-900" : "bg-green-100 text-green-900"}`}>
//               <pre className="whitespace-pre-wrap">{msg.text}</pre>
//             </div>
//             {msg.from === "user" && <div className="ml-2 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">🧑</div>}
//           </div>
//         ))}

//         {pendingAction && (
//           <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-md mt-2">
//             <div className="mb-2 text-sm text-gray-800">{pendingAction.aiMessage}</div>
//             <div className="mb-2 text-xs text-gray-600">AI proposes: <strong>{pendingAction.action.name}</strong></div>
//             <pre className="bg-white p-2 rounded text-xs overflow-x-auto">{JSON.stringify(pendingAction.action.params, null, 2)}</pre>
//             <div className="mt-2 flex gap-2">
//               <button onClick={() => confirmAction(true)} className="bg-green-600 text-white px-3 py-1 rounded">Confirm</button>
//               <button onClick={() => confirmAction(false)} className="bg-gray-200 px-3 py-1 rounded">Cancel</button>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       <div className="flex gap-2">
//         <input
//           className="flex-1 px-4 py-2 rounded-xl border"
//           placeholder="Describe your symptoms..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded-xl">Send</button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;
