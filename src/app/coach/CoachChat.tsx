"use client";

import { useState, useEffect, useRef } from "react";
import { Sparkles, Send, Bot, User } from "lucide-react";
import { getCoachResponseAction } from "@/app/actions";

type Message = {
    id: string;
    role: "user" | "assistant";
    content: string;
};

const MessageBubble = ({ m, index }: { m: Message, index: number }) => {
    const isUser = m.role === 'user';
    const isAssistant = m.role === 'assistant';

    let content = m.content;
    if (isAssistant && index >= 5 && !content.includes('Dreampoint')) {
        content += `\n\n💎 *Join our Founders Circle to help shape the platform!*`;
    }

    return (
        <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {isAssistant && (
                <div className="w-8 h-8 rounded-full bg-concrete-100 flex items-center justify-center border border-concrete-900 shrink-0 mt-1">
                    <Bot size={16} />
                </div>
            )}
            <div className={`p-4 max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${isUser
                ? 'bg-concrete-900 text-white rounded-[18px_18px_4px_18px]'
                : 'bg-gradient-to-br from-[#FF9A9E] to-[#FAD0C4] text-[#333] rounded-[18px_18px_18px_4px] border border-white/20'
                }`}>
                <p>{content}</p>
            </div>
            {isUser && (
                <div className="w-8 h-8 rounded-full bg-blueprint flex items-center justify-center text-white shrink-0 mt-1">
                    <User size={16} />
                </div>
            )}
        </div>
    );
};

export default function CoachChat({ compact = false }: { compact?: boolean }) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "hey! Im Dreampoints beauty business coach. What's on your mind?"
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

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
            const aiResponse = await getCoachResponseAction(apiMessages);
            const aiMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: aiResponse.content };
            setMessages(prev => [...prev, aiMsg]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={`flex flex-col bg-white border-2 border-concrete-900 shadow-[8px_8px_0px_#1f2937] overflow-hidden ${compact ? 'h-[400px]' : 'h-[550px]'}`}>
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
                {messages.map((m, idx) => (
                    <MessageBubble key={m.id} m={m} index={idx} />
                ))}
                {isTyping && (
                    <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-concrete-100 border border-concrete-900 flex items-center justify-center">
                            <Bot size={16} />
                        </div>
                        <div className="p-4 bg-white border border-concrete-200 rounded-[18px_18px_18px_4px] shadow-sm flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B8B] animate-bounce"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B8B] animate-bounce [animation-delay:-0.16s]"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-[#FF6B8B] animate-bounce [animation-delay:-0.32s]"></div>
                        </div>
                    </div>
                )}
            </div>
            <form onSubmit={handleSend} className="p-3 border-t border-concrete-100 bg-white flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 p-2 outline-none font-bold text-xs bg-concrete-50 border-2 border-transparent focus:border-blueprint transition-all"
                />
                <button
                    type="submit"
                    disabled={isTyping}
                    className="bg-concrete-900 text-white px-4 py-2 hover:bg-blueprint transition-colors disabled:opacity-50"
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
}
