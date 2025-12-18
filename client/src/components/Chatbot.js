// // // import React, { useState, useRef, useEffect } from "react";

// // // const Chatbot = () => {
// // //   const [isOpen, setIsOpen] = useState(false);
// // //   const [messages, setMessages] = useState([]);
// // //   const [input, setInput] = useState("");
// // //   const messagesEndRef = useRef(null);

// // //   useEffect(() => {
// // //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// // //   }, [messages]);

// // //   const toggleChat = () => setIsOpen(!isOpen);

// // //   const sendMessage = async () => {
// // //     if (!input.trim()) return;

// // //     const userMessage = { sender: "user", text: input };
// // //     setMessages((prev) => [...prev, userMessage]);
// // //     setInput("");

// // //     // Placeholder for backend call
// // //     const botReply = { sender: "bot", text: "Thinking..." };
// // //     setMessages((prev) => [...prev, botReply]);
// // //   };

// // //   return (
// // //     <>
// // //       {/* Floating Icon */}
// // //       {!isOpen && (
// // //         <button
// // //           onClick={toggleChat}
// // //           className="fixed bottom-4 right-4 bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition"
// // //         >
// // //           💬
// // //         </button>
// // //       )}

// // //       {/* Chat Window */}
// // //       {isOpen && (
// // //         <div className="fixed bottom-4 right-4 w-full max-w-xs md:max-w-sm lg:max-w-md shadow-lg rounded-xl overflow-hidden flex flex-col h-[500px] md:h-[600px] bg-white">
// // //           {/* Header */}
// // //           <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
// // //             <h3 className="font-semibold text-lg">Bike Rental Chatbot</h3>
// // //             <button onClick={toggleChat} className="text-white text-lg font-bold">
// // //               ✕
// // //             </button>
// // //           </div>

// // //           {/* Messages */}
// // //           <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
// // //             {messages.map((msg, idx) => (
// // //               <div
// // //                 key={idx}
// // //                 className={`flex ${
// // //                   msg.sender === "user" ? "justify-end" : "justify-start"
// // //                 }`}
// // //               >
// // //                 <div
// // //                   className={`p-3 rounded-xl max-w-[80%] ${
// // //                     msg.sender === "user"
// // //                       ? "bg-blue-500 text-white rounded-br-none"
// // //                       : "bg-gray-200 text-gray-900 rounded-bl-none"
// // //                   }`}
// // //                 >
// // //                   {msg.text}
// // //                 </div>
// // //               </div>
// // //             ))}
// // //             <div ref={messagesEndRef} />
// // //           </div>

// // //           {/* Input */}
// // //           <div className="flex border-t border-gray-300 p-2">
// // //             <input
// // //               type="text"
// // //               value={input}
// // //               onChange={(e) => setInput(e.target.value)}
// // //               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// // //               placeholder="Type your message..."
// // //               className="flex-1 p-2 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
// // //             />
// // //             <button
// // //               onClick={sendMessage}
// // //               className="bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600 transition"
// // //             >
// // //               Send
// // //             </button>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </>
// // //   );
// // // };

// // // export default Chatbot;


// // import React, { useState, useRef, useEffect } from "react";

// // const Chatbot = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState("");
// //   const messagesEndRef = useRef(null);

// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
// //   }, [messages]);

// //   const toggleChat = () => setIsOpen(!isOpen);

// //   const sendMessage = async () => {
// //     if (!input.trim()) return;

// //     const userMessage = { sender: "user", text: input };
// //     setMessages((prev) => [...prev, userMessage]);
// //     setInput("");

// //     // Placeholder bot reply
// //     setTimeout(() => {
// //       const botReply = { sender: "bot", text: "Thinking..." };
// //       setMessages((prev) => [...prev, botReply]);
// //     }, 500);
// //   };

// //   return (
// //     <>
// //       {/* Floating Icon */}
// //       {!isOpen && (
// //         <button
// //           onClick={toggleChat}
// //           className="fixed bottom-4 right-4 bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition"
// //         >
// //           💬
// //         </button>
// //       )}

// //       {/* Chat Window with smooth transition */}
// //       <div
// //         className={`fixed bottom-4 right-4 w-full max-w-xs md:max-w-sm lg:max-w-md shadow-lg rounded-xl overflow-hidden flex flex-col h-[500px] md:h-[600px] bg-white transform transition-all duration-300 ${
// //           isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
// //         }`}
// //       >
// //         {/* Header */}
// //         <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
// //           <h3 className="font-semibold text-lg">Bike Rental Chatbot</h3>
// //           <button
// //             onClick={toggleChat}
// //             className="text-white text-lg font-bold hover:text-gray-200"
// //           >
// //             ✕
// //           </button>
// //         </div>

// //         {/* Messages */}
// //         <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
// //           {messages.map((msg, idx) => (
// //             <div
// //               key={idx}
// //               className={`flex ${
// //                 msg.sender === "user" ? "justify-end" : "justify-start"
// //               }`}
// //             >
// //               <div
// //                 className={`p-3 rounded-xl max-w-[80%] ${
// //                   msg.sender === "user"
// //                     ? "bg-blue-500 text-white rounded-br-none"
// //                     : "bg-gray-200 text-gray-900 rounded-bl-none"
// //                 }`}
// //               >
// //                 {msg.text}
// //               </div>
// //             </div>
// //           ))}
// //           <div ref={messagesEndRef} />
// //         </div>

// //         {/* Input */}
// //         <div className="flex border-t border-gray-300 p-2">
// //           <input
// //             type="text"
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
// //             placeholder="Type your message..."
// //             className="flex-1 p-2 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
// //           />
// //           <button
// //             onClick={sendMessage}
// //             className="bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600 transition"
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Chatbot;


// import React, { useState, useRef, useEffect } from "react";

// const Chatbot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const toggleChat = () => setIsOpen(!isOpen);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     // Fake bot reply (we'll replace with backend later)
//     setTimeout(() => {
//       const botReply = { sender: "bot", text: "Thinking..." };
//       setMessages((prev) => [...prev, botReply]);
//     }, 800);
//   };

//   return (
//     <>
//       {/* Floating Icon */}
//       {!isOpen && (
//         <button
//           onClick={toggleChat}
//           className="fixed bottom-4 right-4 bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-700 transition"
//         >
//           💬
//         </button>
//       )}

//       {/* Chat Window with slide animation */}
//       <div
//         className={`fixed bottom-4 right-4 w-full max-w-xs md:max-w-sm lg:max-w-md shadow-lg rounded-xl overflow-hidden flex flex-col h-[500px] md:h-[600px] bg-white transform transition-all duration-500 ease-in-out ${
//           isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
//         }`}
//       >
//         {/* Header */}
//         <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
//           <h3 className="font-semibold text-lg">Bike Rental Chatbot</h3>
//           <button
//             onClick={toggleChat}
//             className="text-white text-lg font-bold hover:text-gray-200"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               }`}
//             >
//               <div
//                 className={`p-3 rounded-xl max-w-[80%] ${
//                   msg.sender === "user"
//                     ? "bg-blue-500 text-white rounded-br-none"
//                     : "bg-gray-200 text-gray-900 rounded-bl-none"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* Input */}
//         <div className="flex border-t border-gray-300 p-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             placeholder="Type your message..."
//             className="flex-1 p-2 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600 transition"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chatbot;



import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I'm BikeBuddy! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Call backend API
      const res = await fetch("https://bike-rental-system-api.vercel.app/api/chatbot/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Sorry, I'm having trouble connecting to the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5">
      {/* Floating Icon */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-blue-600 p-4 rounded-full shadow-lg text-white hover:bg-blue-700 transition"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`fixed bottom-5 right-5 w-80 h-96 bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
      >
        <div className="flex justify-between items-center bg-blue-600 text-white p-3">
          <span>BikeBuddy</span>
          <button onClick={toggleChat}>
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 overflow-y-auto space-y-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-[75%] ${msg.sender === "user"
                ? "ml-auto bg-blue-100 text-right"
                : "mr-auto bg-gray-200"
                }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="text-gray-500 text-sm italic">BikeBuddy is typing…</div>
          )}
        </div>

        {/* Input */}
        <div className="p-2 border-t flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg text-sm"
          />
          <button
            onClick={sendMessage}
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
