"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Check, X, Sparkles, ShieldCheck, Lock as LockIcon } from "lucide-react";
import { checkSlugAction } from "../actions"; // Server Action
import clsx from "clsx";

export default function ClaimPage() {
    const router = useRouter();
    const [slug, setSlug] = useState("");
    const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const checkAvailability = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!slug) return;

        setStatus("checking");
        setErrorMessage("");

        // Call Server Action
        const result = await checkSlugAction(slug);

        if (result.error) {
            setStatus("error");
            setErrorMessage(result.error.message || "Database connection failure.");
        } else if (result.available) {
            setStatus("available");
        } else {
            setStatus("taken");
        }
    };

    const handleClaim = () => {
        // Navigate to Onboarding with the reserved slug
        router.push(`/onboarding?slug=${slug}`);
    };

    return (
        <div className="min-h-screen grid grid-rows-[60px_1fr] font-work relative overflow-hidden">
            {/* DREAM LAYER: Atmosphere */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-dream-sky opacity-15 blur-[120px] rounded-full pointer-events-none translate-x-1/3 -translate-y-1/3" />

            {/* Header */}
            <header className="px-6 flex items-center border-b border-concrete-900 bg-white/80 backdrop-blur-sm relative z-20 sticky top-0">
                <div className="font-space font-bold tracking-tight uppercase">DreamPoint</div>
            </header>

            {/* Main Content */}
            <main className="flex flex-col items-center justify-center p-6 max-w-lg mx-auto w-full relative z-10">

                <div className="text-center mb-10 w-full">
                    <div className="inline-block border border-concrete-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-concrete-900 mb-4 bg-concrete-100">
                        Phase 1: Founder Access
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-space font-bold mb-4 uppercase leading-none">
                        Secure Your<br /><span className="text-blueprint">Plot.</span>
                    </h1>
                    <p className="text-steel text-lg">
                        This reserves your permanent Founder URL. The builder tools will unlock in phases.
                    </p>
                </div>

                <form onSubmit={checkAvailability} className="w-full relative group">
                    <div className="relative flex items-center">
                        <span className="absolute left-4 font-mono text-steel z-10">dreampoint.com/</span>
                        <input
                            type="text"
                            value={slug}
                            onChange={(e) => {
                                setSlug(e.target.value.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase());
                                setStatus("idle");
                                setErrorMessage("");
                            }}
                            placeholder="your-shop-name"
                            className={clsx(
                                "w-full pl-[150px] pr-12 py-4 border-2 border-concrete-900 bg-white font-space font-bold text-xl outline-none transition-all",
                                "focus:shadow-[4px_4px_0px_#1f2937]",
                                (status === "taken" || status === "error") && "border-brick text-brick",
                                status === "available" && "border-blueprint text-blueprint"
                            )}
                        />
                        <div className="absolute right-4">
                            {status === "checking" && <Loader2 className="animate-spin text-concrete-900" />}
                            {(status === "taken" || status === "error") && <X className="text-brick" />}
                            {status === "available" && <Check className="text-blueprint" />}
                        </div>
                    </div>

                    {/* Feedback Text */}
                    <div className="min-h-[24px] mt-4 text-sm font-bold text-center">
                        {status === "taken" && (
                            <span className="text-brick animate-scale-in">
                                This plot is already claimed. <a href="/office" className="underline hover:text-black">Already secured? Enter Office.</a>
                            </span>
                        )}
                        {status === "error" && (
                            <div className="flex flex-col gap-1 animate-scale-in">
                                <span className="text-brick uppercase">⚠️ Connection Error</span>
                                <span className="text-steel font-mono text-[10px]">{errorMessage}</span>
                                <span className="text-steel text-[10px] normal-case">If you suspect you've run out of credits or need a reset, please check your Supabase dashboard or contact support.</span>
                            </div>
                        )}
                        {status === "available" && (
                            <span className="text-blueprint uppercase tracking-widest animate-scale-in flex items-center justify-center gap-2">
                                <Sparkles size={14} className="animate-pulse" /> Plot Authenticated & Available
                            </span>
                        )}
                    </div>

                    {/* MOMENTOUS SUCCESS STATE: THE PERMIT PREVIEW */}
                    {status === "available" && (
                        <div className="mt-8 w-full animate-scale-in animate-float">
                            <div className="bg-white border-2 border-concrete-900 p-1 relative overflow-hidden shadow-[12px_12px_0px_#2563eb]">
                                {/* Blueprint Background Pattern */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '10px 10px' }} />

                                <div className="border border-concrete-900/10 p-6 flex flex-col items-center relative z-10">
                                    <div className="flex justify-between w-full mb-8">
                                        <div className="text-[10px] font-mono text-steel uppercase tracking-tighter">Issue No. DP-2024-F</div>
                                        <div className="text-[10px] font-mono text-steel uppercase tracking-tighter">Status: UNCLAIMED</div>
                                    </div>

                                    <div className="w-16 h-16 bg-blueprint/10 rounded-full flex items-center justify-center mb-4 relative">
                                        <ShieldCheck className="text-blueprint animate-pulse" size={32} />
                                        <div className="absolute inset-0 animate-shimmer rounded-full" />
                                    </div>

                                    <h3 className="font-space font-bold text-2xl uppercase tracking-tighter text-concrete-900 mb-1">
                                        Founder Permit
                                    </h3>
                                    <p className="text-[10px] text-steel uppercase tracking-[0.3em] font-work mb-6">
                                        Digital Street 01
                                    </p>

                                    <div className="w-full bg-concrete-100 p-3 border border-concrete-200 font-mono text-xs mb-6 text-center">
                                        dreampoint.com/<span className="text-blueprint font-bold">{slug}</span>
                                    </div>

                                    <p className="text-[9px] text-steel text-center max-w-[200px] leading-tight uppercase font-work">
                                        This permit grants architectural priority within the Street 01 expansion.
                                    </p>
                                </div>
                                <div className="absolute top-0 right-0 p-2">
                                    <div className="w-8 h-8 border-t-2 border-r-2 border-blueprint opacity-30" />
                                </div>
                                <div className="absolute bottom-0 left-0 p-2">
                                    <div className="w-8 h-8 border-b-2 border-l-2 border-blueprint opacity-30" />
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleClaim}
                                className="w-full mt-8 bg-concrete-900 text-white font-space font-bold text-lg uppercase py-5 flex items-center justify-center gap-3 shadow-[8px_8px_0px_#2563eb] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[10px_10px_0px_#2563eb] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all group"
                            >
                                <LockIcon className="text-yellow-400 group-hover:scale-125 transition-transform" />
                                Secure This Permit <ArrowRight size={20} />
                            </button>
                        </div>
                    )}

                    {(status === "idle" || status === "error") && (
                        <button
                            type="submit"
                            className="w-full mt-6 border-2 border-concrete-900 text-concrete-900 font-space font-bold text-lg uppercase py-4 hover:bg-concrete-200 transition-colors shadow-[4px_4px_0px_#1f2937]"
                        >
                            Establish My Plot
                        </button>
                    )}

                </form>

            </main>
        </div>
    );
}

