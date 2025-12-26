import React, { useState, useEffect, useRef } from "react";
import { Send, Mic, X, MessageCircle, Maximize2, Minimize2, Moon, Sun } from "lucide-react";

const loadHistory = () =>
  JSON.parse(localStorage.getItem("chatHistory") || "[]");
const saveHistory = (data) =>
  localStorage.setItem("chatHistory", JSON.stringify(data));

export default function LuxuryChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(loadHistory());
  const [botTyping, setBotTyping] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Dragging
  const chatRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const startDrag = (e) => {
    const element = chatRef.current;
    const rect = element.getBoundingClientRect();

    pos.current = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);
  };

  const drag = (e) => {
    const element = chatRef.current;
    element.style.left = `${e.clientX - pos.current.offsetX}px`;
    element.style.top = `${e.clientY - pos.current.offsetY}px`;
  };

  const stopDrag = () => {
    document.removeEventListener("mousemove", drag);
    document.removeEventListener("mouseup", stopDrag);
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    saveHistory(messages);
  }, [messages]);

  // 🔥 AI Ready Function
  const generateBotReply = async (text) => {
    return "This is AI placeholder response. Connect API to make it powerful 😎";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((p) => [...p, userMsg]);
    const query = input;
    setInput("");
    setBotTyping(true);

    const botReply = await generateBotReply(query);

    setTimeout(() => {
      const botMsg = { from: "bot", text: botReply };
      setMessages((p) => [...p, botMsg]);
      setBotTyping(false);
    }, 900);
  };

  const quickReplies = ["Pricing", "Show Services", "Portfolio", "Support"];

  const startVoice = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = (e) => setInput(e.results[0][0].transcript);
    recognition.start();
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-600 to-blue-500
           text-white p-5 rounded-full shadow-[0_0_30px_rgba(0,102,255,.8)]
           hover:scale-110 transition duration-300 animate-pulse"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {open && (
        <div
          ref={chatRef}
          className={`fixed ${
            fullscreen ? "bottom-0 right-0 w-full h-full" : "bottom-6 right-6 w-80 sm:w-96"
          } ${darkMode ? "bg-[#0b141a]" : "bg-white/85"}
           rounded-2xl shadow-2xl border overflow-hidden animate-popUp backdrop-blur-xl`}
        >
          {/* Header */}
          <div
            onMouseDown={startDrag}
            className={`flex justify-between items-center p-4 cursor-grab ${
              darkMode ? "bg-[#111b21] text-white" : "bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
            }`}
          >
            <div className="font-semibold tracking-wide">Predicto AI Assistant</div>

            <div className="flex gap-3 items-center">
              <button onClick={() => setDarkMode(!darkMode)}>
                {darkMode ? <Sun /> : <Moon />}
              </button>

              <button onClick={() => setFullscreen(!fullscreen)}>
                {fullscreen ? <Minimize2 /> : <Maximize2 />}
              </button>

              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            className={`h-80 ${
              fullscreen && "h-[85vh]"
            } p-4 overflow-y-auto space-y-3 ${
              darkMode ? "bg-[#0b141a]" : "bg-gray-100"
            }`}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[75%] px-3 py-2 rounded-xl text-sm shadow ${
                  msg.from === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : darkMode
                    ? "bg-[#202c33] text-white"
                    : "bg-white text-gray-800 border"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {botTyping && (
              <div
                className={`w-16 px-3 py-2 rounded-xl shadow flex gap-1 ${
                  darkMode ? "bg-[#202c33]" : "bg-gray-300"
                }`}
              >
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Quick Replies */}
          <div className={`p-3 flex flex-wrap gap-2 border-t ${darkMode ? "bg-[#111b21] text-white" : "bg-white"}`}>
            {quickReplies.map((q) => (
              <button
                key={q}
                onClick={() => {
                  setInput(q);
                  handleSend();
                }}
                className="px-3 py-1 text-xs bg-gray-200 rounded-full hover:bg-gray-300"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className={`p-3 border-t flex items-center gap-2 ${darkMode ? "bg-[#111b21]" : "bg-white"}`}>
            <button onClick={startVoice}>
              <Mic className={`${darkMode ? "text-white" : "text-gray-600"}`} />
            </button>

            <input
              className={`flex-1 px-3 py-2 text-sm border rounded-full outline-none ${
                darkMode ? "bg-[#202c33] text-white" : ""
              }`}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />

            <button
              onClick={handleSend}
              className="p-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-full"
            >
              <Send />
            </button>
          </div>

          {/* Animations */}
          <style>
            {`
            .animate-popUp { animation: pop .35s ease; }
            @keyframes pop {
              from { transform: scale(.8); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .typing-dot {
              width: 6px;
              height: 6px;
              background: white;
              border-radius: 50%;
              animation: blink 1.3s infinite;
            }
            @keyframes blink {
              0% { opacity: .2 }
              50% { opacity: 1 }
              100% { opacity: .2 }
            }
          `}
          </style>
        </div>
      )}
    </>
  );
}
