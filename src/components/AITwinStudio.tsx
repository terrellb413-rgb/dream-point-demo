"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Send, Bot, User, Brain, Play, Save, Info } from "lucide-react";
import { getAITwinResponseAction } from "@/app/actions";
import clsx from "clsx";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

export default function AITwinStudio({ shopContext }: { shopContext: any }) {
    const [mode, setMode] = useState<"trainer" | "simulator">("trainer");
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [progress, setProgress] = useState(12); // Starting baseline
    const [synapses, setSynapses] = useState(1024);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial greeting based on mode
    useEffect(() => {
        if (mode === "trainer") {
            setMessages([{
                id: "initial",
                role: "assistant",
                content: `Greetings, Founder. I am your AI Twin's neural core. I'm currently in **Trainer Mode**. How should I represent your brand \"${shopContext.name}\" to the world?`
            }]);
        } else {
            setMessages([{
                id: "initial",
                role: "assistant",
                content: `*System: Simulation Started.*\n\n"Welcome to ${shopContext.name}! How can I help you today?"`
            }]);
        }
    }, [mode, shopContext.name]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
        const newMessages = [...messages, userMsg];

        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        try {
            const apiMessages = newMessages.map(({ role, content }) => ({ role, content }));
            const aiResponse = await getAITwinResponseAction(apiMessages, shopContext);
            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: aiResponse.content };
            setMessages(prev => [...prev, aiMsg]);

            // Increment progress if in trainer mode
            if (mode === "trainer") {
                setProgress(prev => Math.min(prev + 4, 100));
                setSynapses(prev => prev + Math.floor(Math.random() * 50) + 10);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col bg-white border-2 border-concrete-900 shadow-[12px_12px_0px_#2563eb] h-[600px] animate-scale-in">
            {/* STUDIO HEADER */}
            <div className="bg-concrete-900 text-white p-4 flex justify-between items-center border-b-2 border-concrete-900">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blueprint rounded-full flex items-center justify-center border border-white/20">
                        <Brain className="text-white" size={20} />
                    </div>
                    <div>
                        <h2 className="font-space font-bold uppercase tracking-tight text-sm">Intelligence Studio</h2>
                        <p className="text-[10px] text-blueprint font-mono uppercase tracking-widest">Version 0.1 Alpha</p>
                    </div>
                </div>

                <div className="flex bg-black/20 p-1 rounded-sm border border-white/10">
                    <button
                        onClick={() => setMode("trainer")}
                        className={clsx(
                            "px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                            mode === "trainer" ? "bg-white text-concrete-900 shadow-sm" : "text-white/50 hover:text-white"
                        )}
                    >
                        <Save size={12} /> Trainer
                    </button>
                    <button
                        onClick={() => setMode("simulator")}
                        className={clsx(
                            "px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                            mode === "simulator" ? "bg-blueprint text-white shadow-sm" : "text-white/50 hover:text-white"
                        )}
                    >
                        <Play size={12} /> Simulate
                    </button>
                </div>
            </div>

            {/* STATUS BAR */}
            <div className="bg-concrete-100 border-b-2 border-concrete-900 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1">
                    <div className="flex flex-col gap-1 flex-1 max-w-[200px]">
                        <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest text-concrete-500">
                            <span>Neural Integrity</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="h-2 bg-concrete-200 border border-concrete-900 overflow-hidden">
                            <div
                                className="h-full bg-blueprint transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                    <div className="h-8 w-[1px] bg-concrete-300 hidden sm:block" />
                    <div className="flex flex-col">
                        <span className="text-[8px] font-bold uppercase tracking-widest text-concrete-500">Synapse Connections</span>
                        <span className="text-[10px] font-mono font-bold text-blueprint">{synapses.toLocaleString()}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase text-concrete-600 tracking-tighter">
                        {mode === "trainer" ? "Neural Link Active" : "Shopper Simulation Running"}
                    </span>
                </div>
            </div>

            {/* CHAT AREA */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
                {messages.map((m) => (
                    <div key={m.id} className={clsx("flex gap-4 animate-scale-in", m.role === 'user' ? 'flex-row-reverse' : 'flex-row')}>
                        <div className={clsx(
                            "w-8 h-8 rounded-full border-2 border-concrete-900 flex items-center justify-center shrink-0 mt-1 shadow-[2px_2px_0px_#000]",
                            m.role === 'user' ? "bg-blueprint text-white" : "bg-white text-concrete-900"
                        )}>
                            {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={clsx(
                            "p-4 max-w-[80%] text-sm leading-relaxed whitespace-pre-wrap border-2 border-concrete-900",
                            m.role === 'user'
                                ? "bg-concrete-900 text-white shadow-[4px_4px_0px_#2563eb]"
                                : "bg-white text-concrete-900 shadow-[4px_4px_0px_#1f2937]"
                        )}>
                            {m.content}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-4 animate-pulse">
                        <div className="w-8 h-8 rounded-full bg-white border-2 border-concrete-900 flex items-center justify-center">
                            <Bot size={16} className="text-concrete-400" />
                        </div>
                        <div className="bg-white/50 border-2 border-concrete-200 p-4 rounded-sm flex gap-1 items-center">
                            <div className="w-1 h-1 bg-concrete-400 rounded-full animate-bounce" />
                            <div className="w-1 h-1 bg-concrete-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-1 h-1 bg-concrete-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                )}
            </div>

            {/* INPUT AREA */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t-2 border-concrete-900 flex gap-3">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === "trainer" ? "Tell your twin about your brand..." : "Type a shopper message..."}
                    className="flex-1 p-4 bg-concrete-50 border-2 border-concrete-200 outline-none focus:border-blueprint font-space font-bold transition-all"
                />
                <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="bg-concrete-900 text-white px-6 py-4 hover:shadow-[4px_4px_0px_#2563eb] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
}
