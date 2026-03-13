"use client";

import { useState, useCallback } from "react";
import { Sidebar } from "@/components/sidebar";
import { ChatCanvas, type Message } from "@/components/chat-canvas";

const cannedResponses = [
  "That's a great question! Based on the information I have, I'd suggest starting with a clear plan and breaking the problem into smaller pieces.",
  "I'd be happy to help with that. Could you provide a bit more context so I can give you a more tailored answer?",
  "Here's what I think: the best approach depends on your specific constraints. Let me know more about your situation.",
  "Interesting! I've seen similar questions before. The most common solution involves iterating on the core idea and testing frequently.",
  "Good thinking. Let me walk you through a few options that might work well for your use case.",
  "That's definitely achievable. The key is to focus on the fundamentals first and build from there.",
];

function getRandomResponse(): string {
  return cannedResponses[Math.floor(Math.random() * cannedResponses.length)];
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [activeNav, setActiveNav] = useState("chat");

  const handleSend = useCallback(() => {
    const text = inputValue.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: getRandomResponse() },
      ]);
    }, 800);
  }, [inputValue]);

  return (
    <div className="flex h-screen gap-3 bg-[var(--neutral-50)] p-3">
      <Sidebar activeItem={activeNav} onItemClick={setActiveNav} />
      <ChatCanvas
        messages={messages}
        inputValue={inputValue}
        onInputChange={setInputValue}
        onSend={handleSend}
      />
    </div>
  );
}
