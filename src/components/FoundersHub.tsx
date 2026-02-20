"use client";

import { useState } from "react";
import { Crown, Brain, Zap, Megaphone, Star, Sparkles, Layout, Video, Box } from "lucide-react";
import clsx from "clsx";
import AITwinStudio from "@/components/AITwinStudio";
import CoachChat from "../app/coach/CoachChat";
import ShareButton from "../app/founders-circle/ShareButton";
import FeedbackLoop from "../app/founders-circle/FeedbackLoop";
import IdeaBox from "./IdeaBox";

export default function FoundersHub({
    allFounders,
    updates,
    currentShopContext
}: {
    allFounders: any[],
    updates: any[],
    currentShopContext: any
}) {
    const [activeTab, setActiveTab] = useState<"hub" | "studio">("hub");

    return (
        <div className="max-w-6xl mx-auto relative z-10">
            {/* HUB HEADER */}
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="inline-block p-4 rounded-full border-4 border-blueprint bg-white mb-6 shadow-[0px_0px_40px_rgba(37,99,235,0.3)]">
                    <Crown className="text-blueprint" size={48} />
                </div>
                <h1 className="font-space font-bold text-5xl uppercase tracking-tighter text-concrete-900 leading-none">
                    Founders Circle <span className="text-blueprint text-2xl align-top block sm:inline sm:align-baseline">(Day One)</span>
                </h1>

                {/* TAB NAVIGATION */}
                <div className="mt-8 flex justify-center">
                    <div className="bg-white border-2 border-concrete-900 p-1 flex shadow-[8px_8px_0px_#000]">
                        <button
                            onClick={() => setActiveTab("hub")}
                            className={clsx(
                                "px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                                activeTab === "hub" ? "bg-concrete-900 text-white" : "text-concrete-900 hover:bg-concrete-50"
                            )}
                        >
                            <Layout size={14} /> The Hub
                        </button>
                        <button
                            onClick={() => setActiveTab("studio")}
                            className={clsx(
                                "px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2",
                                activeTab === "studio" ? "bg-blueprint text-white" : "text-concrete-900 hover:bg-concrete-50"
                            )}
                        >
                            <Brain size={14} /> Intelligence Studio
                        </button>
                    </div>
                </div>
            </div>

            {activeTab === "hub" ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in duration-500">
                    {/* LEFT: SOCIAL & FEEDBACK (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white border-2 border-concrete-900 p-6 shadow-[8px_8px_0px_#e9d5ff]">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-space font-bold uppercase text-xl">Daily Prompt</h2>
                                <span className="bg-blueprint text-white px-2 py-0.5 text-[10px] uppercase font-bold">Expires in 24h</span>
                            </div>

                            <p className="font-bold text-lg mb-4">"Show us your workspace setup."</p>
                            <p className="text-sm text-steel mb-6">Take a photo of where you work (or plan to work) and tag #DreamPointFounder.</p>

                            <div className="flex flex-col gap-2 mb-6 border-t border-concrete-100 pt-4">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-concrete-900 flex items-center gap-1">
                                    <Video size={12} className="text-blueprint" /> See Examples:
                                </span>
                                <div className="flex gap-4">
                                    <a
                                        href="https://www.tiktok.com/@dreampointapp?is_from_webapp=1&sender_device=pc"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] font-bold uppercase text-steel hover:text-blueprint transition-colors"
                                    >
                                        TikTok
                                    </a>
                                    <a
                                        href="https://www.instagram.com/dreampointapp?igsh=NXZkemIxd2s2dzVk&utm_source=qr"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] font-bold uppercase text-steel hover:text-blueprint transition-colors"
                                    >
                                        Instagram
                                    </a>
                                    <a
                                        href="https://youtube.com/@dreampointapp?si=Ey4Qd30AkqVnFb5G"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] font-bold uppercase text-steel hover:text-blueprint transition-colors"
                                    >
                                        YouTube
                                    </a>
                                </div>
                            </div>

                            <ShareButton />
                        </div>

                        <IdeaBox />

                        <FeedbackLoop />

                        <div className="bg-concrete-50 border-2 border-concrete-900 p-6 shadow-[8px_8px_0px_#000]">
                            <h2 className="font-space font-bold uppercase text-xl mb-6 flex items-center gap-2">
                                <Megaphone className="text-blueprint" size={20} /> Platform Blueprint
                            </h2>
                            <div className="space-y-6">
                                {updates.length === 0 && (
                                    <p className="text-steel text-sm italic">No updates posted yet.</p>
                                )}
                                {updates.map(u => (
                                    <div key={u.id} className="border-l-2 border-blueprint pl-4">
                                        <div className="text-[10px] font-bold text-blueprint uppercase mb-1">
                                            {new Date(u.date).toLocaleDateString()}
                                        </div>
                                        <h3 className="font-bold text-sm text-concrete-900 mb-1">{u.title}</h3>
                                        <p className="text-xs text-steel leading-relaxed">{u.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* MIDDLE: AI COACH & FLOOR PLAN (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        {/* MALL FLOOR PLAN / PLOT ASSIGNMENT */}
                        <div className="bg-white border-2 border-concrete-900 p-6 shadow-[8px_8px_0px_#2563eb] relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-2 bg-blueprint/5 border-b border-l border-blueprint/10 font-mono text-[8px] uppercase tracking-tighter text-blueprint">
                                Mall Level 01 // Blueprint Reveal
                            </div>
                            <h3 className="font-space font-bold uppercase text-xs tracking-widest text-blueprint mb-6 flex items-center gap-2">
                                <Box size={14} /> Plot Assignment
                            </h3>

                            <div className="grid grid-cols-5 gap-2 mb-6">
                                {[...Array(10)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={clsx(
                                            "aspect-square border-2 flex items-center justify-center text-[8px] font-bold uppercase transition-all",
                                            i === 0
                                                ? "bg-blueprint text-white border-concrete-900 shadow-[2px_2px_0px_#000] animate-pulse"
                                                : "bg-concrete-50 border-concrete-200 text-concrete-300 border-dashed"
                                        )}
                                    >
                                        {i === 0 ? "You" : `P-0${i + 1}`}
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-end border-b border-concrete-100 pb-2">
                                    <span className="text-[10px] font-bold uppercase text-steel">Assigned Plot</span>
                                    <span className="text-sm font-space font-bold uppercase text-concrete-900">Alpha-01</span>
                                </div>
                                <div className="flex justify-between items-end border-b border-concrete-100 pb-2">
                                    <span className="text-[10px] font-bold uppercase text-steel">Zoning Status</span>
                                    <span className="text-[10px] font-bold uppercase text-blueprint">High-Fidelity</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col flex-1">
                            <div className="bg-concrete-900 text-white p-4 font-space font-bold uppercase text-sm flex items-center gap-2 border-2 border-concrete-900 border-b-0">
                                <Sparkles size={16} className="text-yellow-400" /> Executive AI Coach
                            </div>
                            <CoachChat compact />
                        </div>
                    </div>

                    {/* RIGHT: LEADERBOARD (4 cols) */}
                    <div className="lg:col-span-4 bg-concrete-900 text-white p-6 shadow-[8px_8px_0px_#2563eb]">
                        <h2 className="font-space font-bold uppercase text-xl mb-6 flex items-center gap-2">
                            <Zap className="text-yellow-400" /> Impact Ranking
                        </h2>

                        <div className="space-y-4">
                            {allFounders.length === 0 && (
                                <p className="text-gray-400 text-xs italic">No founders currently ranked.</p>
                            )}
                            {allFounders.map((f, i) => (
                                <div key={f.shop.id} className="flex items-center justify-between p-3 bg-white/10 rounded-sm hover:bg-white/20 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="font-mono font-bold text-blueprint">#{i + 1}</div>
                                        <div className="font-bold text-sm">{f.profile?.username}</div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-bold text-yellow-400">
                                        {f.profile?.engagement_score} <Star size={10} fill="currentColor" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blueprint rounded-full flex items-center justify-center border-2 border-concrete-900 shadow-[4px_4px_0px_#000]">
                                <Brain className="text-white" size={24} />
                            </div>
                            <div>
                                <h2 className="font-space font-bold text-2xl uppercase tracking-tighter">Intelligence Studio</h2>
                                <p className="text-xs text-steel uppercase font-bold tracking-widest">Training your AI Twin ({currentShopContext.name})</p>
                            </div>
                        </div>
                        <div className="bg-blueprint/10 border border-blueprint text-blueprint text-[10px] font-bold px-3 py-1 uppercase tracking-widest animate-pulse">
                            Secure Link Active
                        </div>
                    </div>

                    <AITwinStudio shopContext={currentShopContext} />

                    <div className="mt-8 bg-white border-2 border-concrete-900 p-6 shadow-[8px_8px_0px_#e9d5ff]">
                        <h3 className="font-space font-bold uppercase text-lg mb-2">Studio Instructions</h3>
                        <p className="text-sm text-steel leading-relaxed">
                            Use the **Trainer** mode to provide context about your brand, values, and booking preferences. Switch to **Simulate** to interact with your Twin as if you were a customer visiting your storefront for the first time.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
