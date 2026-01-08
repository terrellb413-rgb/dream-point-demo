"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight, Check, X } from "lucide-react";
import { checkSlugAction } from "../actions"; // Server Action
import clsx from "clsx";

export default function ClaimPage() {
    const router = useRouter();
    const [slug, setSlug] = useState("");
    const [status, setStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");

    const checkAvailability = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!slug) return;

        setStatus("checking");

        // Call Server Action
        const isAvailable = await checkSlugAction(slug);

        if (isAvailable) {
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
                        This URL will be yours forever. Choose wisely.
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
                            }}
                            placeholder="your-shop-name"
                            className={clsx(
                                "w-full pl-[150px] pr-12 py-4 border-2 border-concrete-900 bg-white font-space font-bold text-xl outline-none transition-all",
                                "focus:shadow-[4px_4px_0px_#1f2937]",
                                status === "taken" && "border-brick text-brick",
                                status === "available" && "border-blueprint text-blueprint"
                            )}
                        />
                        <div className="absolute right-4">
                            {status === "checking" && <Loader2 className="animate-spin text-concrete-900" />}
                            {status === "taken" && <X className="text-brick" />}
                            {status === "available" && <Check className="text-blueprint" />}
                        </div>
                    </div>

                    {/* Feedback Text */}
                    <div className="h-6 mt-2 text-sm font-bold text-center">
                        {status === "taken" && (
                            <span className="text-brick">
                                Taken. <a href="/office" className="underline hover:text-black">Is this you? Enter Office.</a>
                            </span>
                        )}
                        {status === "available" && <span className="text-blueprint">This plot is available.</span>}
                    </div>

                    {/* Action Button */}
                    {status === "available" && (
                        <button
                            type="button"
                            onClick={handleClaim}
                            className="w-full mt-6 bg-concrete-900 text-white font-space font-bold text-lg uppercase py-4 flex items-center justify-center gap-2 shadow-[4px_4px_0px_#2563eb] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#2563eb] active:translate-x-[0px] active:translate-y-[0px] active:shadow-none transition-all"
                        >
                            Secure This Spot <ArrowRight size={20} />
                        </button>
                    )}

                    {status === "idle" && (
                        <button
                            type="submit"
                            className="w-full mt-6 border-2 border-concrete-900 text-concrete-900 font-space font-bold text-lg uppercase py-4 hover:bg-concrete-200 transition-colors"
                        >
                            Check Availability
                        </button>
                    )}

                </form>

            </main>
        </div>
    );
}
