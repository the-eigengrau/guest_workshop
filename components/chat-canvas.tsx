"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChatInput } from "@/components/chat-input";
import { cn } from "@/lib/utils";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

type ChatCanvasProps = {
  messages: Message[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
};

function WelcomeSection() {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image src="/logo.png" alt="Logo" width={32} height={32} />
      <h1 className="text-[32px] font-medium leading-10 tracking-[-0.64px] text-[var(--text-body-secondary)]">
        Welcome, John Doe
      </h1>
      <p className="text-xl font-medium leading-7 tracking-[-0.4px] text-[var(--neutral-500)]">
        How can I assist you today?
      </p>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex w-full", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-[var(--color-purple-600)] text-white"
            : "bg-[var(--neutral-100)] text-[var(--text-body-secondary)]"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

export function ChatCanvas({
  messages,
  inputValue,
  onInputChange,
  onSend,
}: ChatCanvasProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col items-center rounded-2xl border border-[var(--neutral-100)] bg-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
      {hasMessages ? (
        <>
          <div
            ref={scrollRef}
            className="flex w-full flex-1 flex-col gap-3 overflow-y-auto px-6 py-6"
          >
            <div className="mx-auto flex w-full max-w-[600px] flex-col gap-3">
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}
            </div>
          </div>
          <div className="w-full px-6 pb-6">
            <div className="mx-auto max-w-[600px]">
              <ChatInput value={inputValue} onChange={onInputChange} onSend={onSend} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-8">
          <div className="flex w-[600px] flex-col items-center gap-8">
            <WelcomeSection />
            <ChatInput value={inputValue} onChange={onInputChange} onSend={onSend} />
          </div>
        </div>
      )}
    </div>
  );
}
