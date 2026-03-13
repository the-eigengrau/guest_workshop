"use client";

import { useRef, useCallback, type KeyboardEvent } from "react";
import { Lightbulb, FileText, Target, SendHorizonal } from "lucide-react";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
};

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-[26px] w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[var(--border-primary)] bg-[var(--surface-action-2)] transition-colors hover:bg-[var(--neutral-50)]"
    >
      {children}
    </button>
  );
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend]
  );

  const handleInput = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  }, []);

  return (
    <div className="flex w-full max-w-[600px] flex-col gap-4 rounded-2xl bg-[var(--neutral-100)] p-4">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Ask me anything"
        rows={1}
        className="w-full resize-none bg-transparent text-sm leading-5 text-[var(--foreground)] outline-none placeholder:text-[var(--text-label)]"
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ActionButton>
            <Lightbulb className="size-4 text-[var(--neutral-500)]" />
          </ActionButton>
          <ActionButton>
            <FileText className="size-4 text-[var(--neutral-500)]" />
          </ActionButton>
          <ActionButton>
            <Target className="size-4 text-[var(--neutral-500)]" />
          </ActionButton>
        </div>
        <button
          type="button"
          onClick={onSend}
          className="flex h-[26px] w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[var(--color-purple-600)] transition-opacity hover:opacity-90"
        >
          <SendHorizonal className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
}
