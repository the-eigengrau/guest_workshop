"use client";

import { MessageSquare, Users, List, PenLine, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Chat", icon: MessageSquare, id: "chat" },
  { label: "Contacts", icon: Users, id: "contacts" },
  { label: "Details", icon: List, id: "details" },
  { label: "Notes", icon: PenLine, id: "notes" },
  { label: "Files", icon: FileText, id: "files" },
] as const;

type SidebarProps = {
  activeItem?: string;
  onItemClick?: (id: string) => void;
};

export function Sidebar({ activeItem = "chat", onItemClick }: SidebarProps) {
  return (
    <nav className="flex w-[111px] shrink-0 flex-col gap-2 px-1.5 py-3">
      {navItems.map(({ label, icon: Icon, id }) => {
        const isActive = activeItem === id;
        return (
          <button
            key={id}
            onClick={() => onItemClick?.(id)}
            className={cn(
              "flex h-8 items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium tracking-[-0.084px] transition-colors",
              isActive
                ? "bg-white text-[var(--neutral-700)] shadow-[0px_0px_2px_rgba(0,0,0,0.05),0px_4px_6px_rgba(0,0,0,0.02)]"
                : "text-[var(--neutral-500)] hover:text-[var(--neutral-700)]"
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
