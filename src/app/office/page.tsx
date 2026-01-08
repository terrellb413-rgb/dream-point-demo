"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";

export default function OfficeLobbyPage() {
    const router = useRouter();
    const [slug, setSlug] = useState("");
    const [loading, setLoading] = useState(false);

    const handleEnter = (e: React.FormEvent) => {
        e.preventDefault();
        if (!slug) return;
        setLoading(true);
        // In a real app, we'd verify auth here. For MVP, we just route them.
        router.push(`/dashboard/${slug}`);
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 font-work relative overflow-hidden">
            {/* DREAM LAYER: Atmosphere */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-dream-sky opacity-20 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-dream-pink opacity-20 blur-[100px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2" />

            {/* BUSINESS LAYER: The Lobby Card */}
            <div className="w-full max-w-md bg-white border-2 border-concrete-900 shadow-[8px_8px_0px_#1f2937] p-8 relative z-10">

                <div className="mb-8 text-center">
                    <div className="w-16 h-16 bg-concrete-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-concrete-900">
                        <Lock className="text-concrete-900" size={24} />
                    </div>
                    <h1 className="font-space font-bold text-2xl uppercase tracking-tight text-concrete-900">The Lobby</h1>
                    <p className="text-steel text-sm mt-2">Enter your secure credentials to access your office.</p>
                </div>

                <form onSubmit={handleEnter} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-steel mb-1">Shop Slug</label>
                        <div className="relative">
                            <span className="absolute left-3 top-3.5 text-gray-400 font-mono text-sm">dreampoint.com/</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="demo"
                                className="w-full pl-[135px] p-3 border border-concrete-900 font-bold outline-none focus:bg-blue-50 transition-colors"
                                autoFocus
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !slug}
                        className="w-full bg-concrete-900 text-white font-space font-bold uppercase py-4 hover:bg-blueprint transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? "Verifying..." : "Enter Office"}
                        {!loading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <a href="/" className="text-xs font-bold uppercase text-steel hover:text-concrete-900 underline">
                        Back to Street
                    </a>
                </div>

            </div>
        </div>
    );
}
