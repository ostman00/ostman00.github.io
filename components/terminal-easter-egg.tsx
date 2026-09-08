"use client";

import { useState, useRef, useEffect } from "react";

type LogLine = {
  id: string;
  type: "input" | "output" | "error";
  content: string;
};

export function TerminalEasterEgg() {
  const [input, setInput] = useState("");
  const [isHacked, setIsHacked] = useState(false);
  const [logs, setLogs] = useState<LogLine[]>([
    { id: "1", type: "output", content: "Interactive terminal initialized. Type 'help' to see available commands." }
  ]);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Matrix Hack Effect
  useEffect(() => {
    if (isHacked) {
      let count = 0;
      const interval = setInterval(() => {
        setLogs((prev) => [
          ...prev,
          { 
            id: Date.now() + Math.random().toString(), 
            type: "output", 
            content: Array.from({length: 50}, () => Math.floor(Math.random() * 2)).join("") 
          }
        ]);
        count++;
        if (count > 25) {
          clearInterval(interval);
          setLogs((prev) => [
            ...prev,
            { id: Date.now() + "done", type: "error", content: ">> ROOT ACCESS GRANTED <<" }
          ]);
          // Revert hack effect after 4 seconds
          setTimeout(() => setIsHacked(false), 4000);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHacked]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    
    if (!cmd || isHacked) return;

    // Add user input to log
    const newLogs: LogLine[] = [
      ...logs,
      { id: Date.now().toString(), type: "input", content: `> ${input}` }
    ];

    // Process command
    switch (cmd) {
      case "help":
        newLogs.push({ id: Date.now() + "-1", type: "output", content: "Available commands: help, whoami, clear, skills, contact, sudo" });
        break;
      case "whoami":
        newLogs.push({ id: Date.now() + "-1", type: "output", content: "OSMAN - Software Engineer. Building reliable systems and solving complex problems." });
        break;
      case "clear":
        setLogs([]);
        setInput("");
        return;
      case "skills":
        newLogs.push({ id: Date.now() + "-1", type: "output", content: "[JavaScript, TypeScript, React, Next.js, Node.js, System Architecture]" });
        break;
      case "contact":
        newLogs.push({ id: Date.now() + "-1", type: "output", content: "Email: root@localhost | Run './send_message.sh' on the contact page." });
        break;
      case "sudo":
        newLogs.push({ id: Date.now() + "-1", type: "error", content: "INITIATING PRIVILEGE ESCALATION..." });
        setLogs(newLogs);
        setInput("");
        setIsHacked(true);
        return;
      default:
        newLogs.push({ id: Date.now() + "-1", type: "error", content: `Command not found: ${cmd}. Type 'help' for available commands.` });
    }

    setLogs(newLogs);
    setInput("");
  };

  return (
    <div className={`mt-16 mb-8 border border-[var(--color-border-default)] p-4 font-mono text-sm shadow-xl relative overflow-hidden transition-colors duration-300 ${isHacked ? 'bg-[#002200]' : 'bg-[#050505]'}`}>
      <div className="absolute top-0 left-0 w-full h-1 bg-[var(--color-border-default)]"></div>
      <div className={`mb-2 flex justify-between items-center border-b pb-2 ${isHacked ? 'border-[#37F712] text-[#37F712]' : 'border-[var(--color-border-strong)] text-[var(--color-text-tertiary)]'}`}>
        <span>root@localhost:~#</span>
        <span className="text-[10px]">EASTER_EGG_TERMINAL</span>
      </div>
      
      <div className="max-h-60 overflow-y-auto mb-2 space-y-1">
        {logs.map((log) => (
          <div 
            key={log.id} 
            className={`
              ${log.type === "input" ? "text-[var(--color-text-secondary)]" : ""}
              ${log.type === "output" ? (isHacked ? "text-[#37F712]" : "text-[var(--color-action-primary)]") : ""}
              ${log.type === "error" ? (isHacked ? "text-[#37F712] font-bold" : "text-[var(--color-action-destructive)]") : ""}
            `}
          >
            {log.content}
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={handleCommand} className="flex items-center">
        <span className={`${isHacked ? 'text-[#37F712]' : 'text-[var(--color-action-primary)]'} mr-2`}>$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isHacked}
          className="flex-1 bg-transparent outline-none text-[var(--color-text-primary)] border-none disabled:opacity-50"
          placeholder="enter command... (e.g. 'help')"
          autoComplete="off"
          spellCheck="false"
        />
      </form>
    </div>
  );
}
