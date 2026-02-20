"use client";

import { useState } from "react";
import { Send, Lightbulb, Check } from "lucide-react";
import { postFounderIdeaAction } from "@/app/actions";
import { clsx } from "clsx";

export default function IdeaBox() {
    const [text, setText] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!text.trim() || status !== "idle") return;

        setStatus("loading");
        try {
            // In a real app, we'd get the username from session
            await postFounderIdeaAction("demo", text);
            setStatus("success");
            setText("");
            setTimeout(() => setStatus("idle"), 3000);
        } catch (err) {
            console.error(err);
            setStatus("idle");
        }
    };

    return (
        <div className="bg-white border-2 border-concrete-900 p-6 shadow-[8px_8px_0px_#fde68a] relative overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-space font-bold uppercase text-xl flex items-center gap-2">
                    <Lightbulb className="text-yellow-500" size={20} /> Founder Idea Box
                </h2>
            </div>

            <p className="text-xs text-steel mb-4 leading-relaxed">
                What should we build next? Share your vision, preferences, or a feature you're dreaming of.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="I think it would be cool if..."
                    disabled={status === "success"}
                    className="w-full bg-concrete-50 border-2 border-concrete-900 p-4 min-h-[100px] font-work text-sm outline-none focus:border-blueprint transition-all resize-none"
                />

                <button
                    type="submit"
                    disabled={!text.trim() || status !== "idle"}
                    className={clsx(
                        "w-full py-3 font-bold uppercase transition-all flex items-center justify-center gap-2 border-2 border-concrete-900",
                        status === "success"
                            ? "bg-green-500 text-white border-green-600"
                            : "bg-concrete-900 text-white hover:bg-blueprint hover:border-blueprint"
                    )}
                >
                    {status === "loading" ? (
                        "Transmitting..."
                    ) : status === "success" ? (
                        <>
                            Idea Received! <Check size={18} />
                        </>
                    ) : (
                        <>
                            Post to Circle <Send size={16} />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
