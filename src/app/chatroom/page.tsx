"use client";

import React, { useState, useEffect } from "react";
import { Send, User } from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function ChatApp() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const messagesList = useQuery(api.messages.get);
  const saveMessage = useMutation(api.messages.saveMessage);

  const handleSend = () => {
    if (message.trim()) {
      saveMessage({ body: message, user: userId });
      setMessage("");
    }
  };

  useEffect(() => {
    const id: string = localStorage.getItem("user_id") as string;
    const name: string = localStorage.getItem("user_name") as string;
    setUserId(id);
    setUserName(name);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Chat App</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messagesList?.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.user === userId ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.user === userId ? "bg-blue-500 text-white" : "bg-gray-300"
                }`}
              >
                <div className="flex items-center mb-1">
                  <User className="w-4 h-4 mr-2" />
                  <p className="font-semibold">
                    {msg.user === userId ? userName : "other"}
                  </p>
                </div>
                <p>{msg.body}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
}
