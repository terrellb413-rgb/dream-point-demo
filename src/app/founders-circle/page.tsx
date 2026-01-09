import { mockDb } from "@/lib/mock-db";
import { Zap, MessageSquare, Star, Crown, Megaphone, Sparkles } from "lucide-react";
import ShareButton from "./ShareButton";
import FeedbackLoop from "./FeedbackLoop";
import CoachChat from "../coach/CoachChat";
import { getPlatformUpdatesAction } from "@/app/actions";

export default async function FoundersCirclePage() {
    // In real app, we would verify session 'founder' status here
    const allFounders = (await mockDb.getAllShops())
        .filter(s => s.shop.status === 'founder')
        .sort((a, b) => (b.profile?.engagement_score || 0) - (a.profile?.engagement_score || 0));

    const updates = await getPlatformUpdatesAction();

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8 font-work relative overflow-hidden">

            {/* DREAM LAYER: Atmosphere - More Intense for Hub */}
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-dream-sky/20 to-dream-pink/20 pointer-events-none" />
            <div className="fixed top-1/2 left-1/2 w-[800px] h-[800px] bg-white opacity-40 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />

            {/* THE HUB (Business Layer) */}
            <div className="max-w-6xl mx-auto relative z-10">

                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-block p-4 rounded-full border-4 border-blueprint bg-white mb-6 shadow-[0px_0px_40px_rgba(37,99,235,0.3)]">
                        <Crown className="text-blueprint" size={48} />
                    </div>
                    <h1 className="font-space font-bold text-5xl uppercase tracking-tighter text-concrete-900 leading-none">
                        Founders Circle <span className="text-blueprint text-2xl align-top block sm:inline sm:align-baseline">(Day One)</span>
                    </h1>
                    <p className="text-concrete-900 font-bold max-w-lg mx-auto mt-4 text-lg">
                        You are the architects. We are building this platform around your feedback. Your input shapes the concrete.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* LEFT: SOCIAL & FEEDBACK (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white border-2 border-concrete-900 p-6 shadow-[8px_8px_0px_#e9d5ff]">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="font-space font-bold uppercase text-xl">Active Prompt</h2>
                                <span className="bg-blueprint text-white px-2 py-0.5 text-[10px] uppercase font-bold">Expires in 2d</span>
                            </div>
                            <p className="font-bold text-lg mb-4">"Show us your workspace setup."</p>
                            <p className="text-sm text-steel mb-6">Take a photo of where you work (or plan to work) and tag #DreamPointFounder.</p>
                            <ShareButton />
                        </div>

                        <FeedbackLoop />

                        {/* PLATFORM UPDATES (Admin driven) */}
                        <div className="bg-concrete-50 border-2 border-concrete-900 p-6 shadow-[8px_8px_0px_#000]">
                            <h2 className="font-space font-bold uppercase text-xl mb-6 flex items-center gap-2">
                                <Megaphone className="text-blueprint" size={20} /> Platform Blueprint
                            </h2>
                            <div className="space-y-6">
                                {updates.length === 0 && (
                                    <p className="text-steel text-sm italic italic">No updates posted yet.</p>
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

                    {/* MIDDLE: AI COACH (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col">
                        <div className="bg-concrete-900 text-white p-4 font-space font-bold uppercase text-sm flex items-center gap-2 border-2 border-concrete-900 border-b-0">
                            <Sparkles size={16} className="text-yellow-400" /> Executive AI Coach
                        </div>
                        <CoachChat compact />
                    </div>

                    {/* RIGHT: LEADERBOARD (4 cols) */}
                    <div className="lg:col-span-4 bg-concrete-900 text-white p-6 shadow-[8px_8px_0px_#2563eb]">
                        <h2 className="font-space font-bold uppercase text-xl mb-6 flex items-center gap-2">
                            <Zap className="text-yellow-400" /> Impact Ranking
                        </h2>

                        <div className="space-y-4">
                            {allFounders.length === 0 && (
                                <p className="text-gray-500 text-sm">No founders inducted yet. Be the first.</p>
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

                            {/* FAKE DEMO DATA FOR DEPTH */}
                            {allFounders.length < 5 && [1, 2, 3].map(i => (
                                <div key={`empty-${i}`} className="flex items-center justify-between p-3 bg-white/5 opacity-50 rounded-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="font-mono font-bold">#{allFounders.length + i}</div>
                                        <div className="font-bold text-sm">Future Founder...</div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs font-bold">
                                        0 <Star size={10} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
