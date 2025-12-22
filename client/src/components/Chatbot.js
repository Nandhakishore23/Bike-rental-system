import api from "../api/axios";
import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Sparkles, Bot } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Welcome to RideX! 🏍️ Need help finding your dream ride?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Get User Context
    const user = JSON.parse(localStorage.getItem("user")) || {};
    let age = "Unknown";
    let isVerified = false;

    if (user.dob) {
      const birthDate = new Date(user.dob);
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear(); // Approx age
    }

    if (user.licenseNumber && user.aadhaar) {
      isVerified = true;
    }

    try {
      // Call backend API
      const res = await api.post("/chatbot/ask", {
        message: input,
        userContext: {
          name: user.username || "Guest",
          age,
          isVerified,
          licenseExpiry: user.licenseExpiry || "N/A"
        }
      });

      const data = res.data;
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ System unreachable. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="group relative flex items-center justify-center w-16 h-16 bg-zinc-900 border border-zinc-700 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all duration-300 hover:scale-110 hover:border-yellow-500"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-black opacity-100 group-hover:opacity-0 transition-opacity"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <MessageSquare size={28} className="relative z-10 text-white group-hover:text-black transition-colors" />

          {/* Ping Animation */}
          <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-500 border-2 border-black"></span>
          </span>
        </button>
      )}

      {/* Glassmorphic Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col rounded-3xl overflow-hidden transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) shadow-2xl border border-white/10 backdrop-blur-2xl ${isOpen
          ? "opacity-100 translate-y-0 pointer-events-auto bg-black/80 supports-[backdrop-filter]:bg-zinc-900/60"
          : "opacity-0 translate-y-20 pointer-events-none scale-95"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-white/5 bg-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg shadow-yellow-500/20">
              <Bot size={16} className="text-black" />
            </div>
            <div>
              <h3 className="font-bold text-white text-md font-['Outfit'] tracking-tight">BikeBuddy</h3>
              <p className="text-[10px] text-brand-green-400 flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
              </p>
            </div>
          </div>
          <button
            onClick={toggleChat}
            className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "bot" && (
                <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center mr-2 border border-white/5 flex-shrink-0">
                  <Sparkles size={12} className="text-yellow-500" />
                </div>
              )}

              <div
                className={`p-3 max-w-[85%] text-xs md:text-sm leading-relaxed shadow-sm ${msg.sender === "user"
                  ? "bg-yellow-500 text-black rounded-2xl rounded-tr-sm font-medium"
                  : "bg-zinc-800/80 text-zinc-200 border border-white/5 rounded-2xl rounded-tl-sm backdrop-blur-sm"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center mr-2 border border-white/5 flex-shrink-0">
                <Sparkles size={14} className="text-yellow-500" />
              </div>
              <div className="bg-zinc-800/50 px-4 py-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1 items-center">
                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/5 bg-zinc-900/50 backdrop-blur-md">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about rental rates..."
              className="w-full bg-black/40 text-white placeholder-zinc-500 rounded-xl py-4 pl-4 pr-12 border border-white/10 focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 focus:outline-none transition-all text-sm"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="absolute right-2 p-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-yellow-500/20"
            >
              <Send size={18} className={input.trim() ? "translate-x-0.5" : ""} />
            </button>
          </div>
          <div className="text-center mt-3">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Powered by Gemini AI</p>
          </div>
        </div>
      </div>
    </div>
  );
}
