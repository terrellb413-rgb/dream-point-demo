"use client";

import { useState } from "react";
import { Sparkles, ArrowRight, Crown } from "lucide-react";
import CoachChat from "./CoachChat";

export default function CoachPage() {
    const [showConversion, setShowConversion] = useState(false);

    // We can still trigger showConversion if we want, but for now let's simplify
    // In a real app we'd pass a callback to CoachChat

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8 font-work relative overflow-hidden flex flex-col items-center justify-center">

            {/* DREAM LAYER: Atmosphere */}
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-dream-sky/20 to-dream-pink/20 pointer-events-none" />
            <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white opacity-30 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-dream-sky opacity-20 blur-[100px] rounded-full pointer-events-none" />

            {/* COACH HEADER */}
            <div className="relative z-10 w-full max-w-2xl text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/40 shadow-sm mb-4">
                    <Sparkles className="text-blueprint animate-pulse" size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-concrete-900">Dreampoint AI</span>
                </div>
                <h1 className="font-space font-bold text-4xl uppercase tracking-tighter text-concrete-900">Strategy One.</h1>
                <p className="text-steel text-sm mt-2">Your embedded business strategist. Always on, evolving with your business.</p>
            </div>

            {/* CHAT INTERFACE */}
            <div className="relative z-10 w-full max-w-2xl">
                <CoachChat />
            </div>

            {/* CONVERSION OVERLAY */}
            {showConversion && (
                <div className="relative z-20 mt-6 w-full max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
                    <div className="bg-[#8A2BE2] text-white p-6 border-2 border-concrete-900 shadow-[8px_8px_0px_#000] flex flex-col md:flex-row items-center gap-6">
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="font-space font-bold text-xl uppercase mb-1 flex items-center justify-center md:justify-start gap-2">
                                <Crown size={20} className="text-yellow-400" /> Join the Circle
                            </h3>
                            <p className="text-sm opacity-90 leading-tight">
                                Loved the advice? You're ready for the Founders Circle. Join now to help shape the future of beauty business.
                            </p>
                        </div>
                        <a
                            href="/"
                            className="whitespace-nowrap bg-white text-[#8A2BE2] font-bold uppercase px-6 py-3 hover:bg-concrete-50 transition-colors flex items-center gap-2 group shadow-[4px_4px_0px_#000]"
                        >
                            Claim Your Spot <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            )}

            <a href="/" className="mt-8 relative z-10 text-[10px] font-bold uppercase text-steel hover:text-concrete-900 tracking-widest">
                ← Back to Foundation
            </a>
        </div>
    );
}
