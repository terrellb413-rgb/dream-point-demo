"use client";

import { useState, useEffect } from "react";
import { Hammer, CircleDashed, CheckCircle2, Lock, ArrowRight, Flag, Target, RotateCcw } from "lucide-react";
import { getShopAction, updateChecklistAction, resetShopAction } from "@/app/actions";

export default function LeasingOfficePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // State
    const [initializing, setInitializing] = useState(true);
    const [slug, setSlug] = useState("");
    const [checklist, setChecklist] = useState({
        services_stocked: false,
        goal_set: null as string | null,
        flag_planted: null as string | null
    });

    // Form States
    const [goalInput, setGoalInput] = useState("");
    const [flagInput, setFlagInput] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        params.then(async (p) => {
            console.log(`[Dashboard] Loading for slug: ${p.slug}`);
            setSlug(p.slug);
            // Fetch initial data to hydrate state
            // Retry logic for fetching shop data
            let attempts = 0;
            let data = null;

            while (attempts < 3) {
                data = await getShopAction(p.slug);
                if (data && data.shop) break; // Found it!

                console.log(`[Dashboard] Shop not found, retrying... (${attempts + 1}/3)`);
                await new Promise(r => setTimeout(r, 1500)); // Wait 1.5s
                attempts++;
            }

            console.log(`[Dashboard] Final getShopAction result:`, data);

            if (!data || !data.shop) {
                console.warn(`[Dashboard] Shop not found after retries! Redirecting to claim...`);
                // Shop doesn't exist (Zombie state or invalid URL)
                window.location.href = "/claim";
                return;
            }

            if (data?.shop?.checklist) {
                console.log(`[Dashboard] Hydrating checklist:`, data.shop.checklist);
                setChecklist(data.shop.checklist);

                const complete = data.shop.checklist.services_stocked &&
                    data.shop.checklist.goal_set &&
                    data.shop.checklist.flag_planted;

                // Auto-redirect removed per user request (Step 517)
                // Users now click "Enter" manually.

                // Pre-fill inputs if existing
                if (data.shop.checklist.goal_set) setGoalInput(data.shop.checklist.goal_set);
                if (data.shop.checklist.flag_planted) setFlagInput(data.shop.checklist.flag_planted);
            } else {
                console.warn(`[Dashboard] No checklist data found!`);
            }
            setInitializing(false);
        });
    }, [params]);

    const handleSaveGoal = async () => {
        if (!goalInput) return;
        setLoading(true);
        await updateChecklistAction(slug, { goal_set: goalInput });
        setChecklist(prev => ({ ...prev, goal_set: goalInput }));
        setLoading(false);
    };

    const handleSaveFlag = async () => {
        if (!flagInput) return;
        setLoading(true);
        await updateChecklistAction(slug, { flag_planted: flagInput });
        setChecklist(prev => ({ ...prev, flag_planted: flagInput }));
        setLoading(false);
    };

    const handleReset = async () => {
        if (!confirm("Start over as a new viewer? This will wipe your progress.")) return;
        setLoading(true);
        await resetShopAction(slug);
        window.location.href = "/";
    };

    const isComplete = checklist.services_stocked && checklist.goal_set && checklist.flag_planted;

    const handleEnter = () => {
        if (initializing) return;
        if (!isComplete) {
            const missing = [];
            if (!checklist.services_stocked) missing.push("Stock Services");
            if (!checklist.goal_set) missing.push("Set Future Goal");
            if (!checklist.flag_planted) missing.push("Plant Your Flag");
            alert(`Construction Halted. Missing items:\n- ${missing.join("\n- ")}`);
            return;
        }
        window.location.href = "/founders-circle";
    };

    if (initializing) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-dream-sky text-concrete-900 font-bold uppercase tracking-widest animate-pulse">
                Accessing Files...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8 font-work relative overflow-hidden">

            {/* DREAM LAYER: Atmosphere */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-dream-sky opacity-10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-3xl mx-auto relative z-10">

                {/* HEADLINE & CONTEXT */}
                <div className="text-center mb-12">
                    <span className="bg-concrete-900 text-white px-3 py-1 text-xs font-bold uppercase tracking-widest border border-white shadow-md">
                        Leasing Office
                    </span>
                    <h1 className="font-space font-bold text-4xl md:text-5xl uppercase tracking-tighter text-concrete-900 mt-4 leading-none">
                        Your Plot is Secured.
                    </h1>
                    <div className="mt-6 max-w-xl mx-auto space-y-4 text-steel">
                        <p>
                            You've secured your space at <span className="font-mono font-bold text-blueprint uppercase">{slug}</span>. This isn't just a placeholder; it's the ground floor of your digital legacy.
                        </p>
                        <p className="text-sm">
                            We’re currently in the <span className="font-bold text-concrete-900 uppercase tracking-tighter">Early Construction</span> phase, hand-selecting a collective of builders who are ready to redefine their craft. By completing this checklist, you join the <span className="font-bold text-concrete-900">Founders Circle</span>—our day-one community. You aren't just using a tool; you're helping us pour the foundation.
                        </p>
                    </div>
                </div>

                {/* THE CHECKLIST CARD */}
                <div className="bg-white border-2 border-concrete-900 shadow-[8px_8px_0px_#1f2937] p-8 mb-12">
                    {/* ... (checklist content remains same) */}
                    <div className="space-y-8">
                        {/* ITEM 1: CLAIM (DONE) */}
                        <div className="flex gap-4 opacity-50">
                            <div className="mt-1">
                                <CheckCircle2 className="text-concrete-900" size={24} />
                            </div>
                            <div>
                                <h3 className="font-space font-bold text-lg uppercase line-through text-steel">1. Secure Location</h3>
                                <p className="text-xs text-steel">Permit issued for dreampoint.com/{slug}</p>
                            </div>
                        </div>

                        {/* ITEM 2: SERVICES */}
                        <div className="flex gap-4">
                            <div className="mt-1">
                                {checklist.services_stocked ? (
                                    <CheckCircle2 className="text-blueprint" size={24} />
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-concrete-900 flex items-center justify-center text-xs font-bold">2</div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-space font-bold text-lg uppercase text-concrete-900">2. Verify Service Menu</h3>
                                <p className="text-sm text-steel mb-3">List at least 1 service to prove active business status. (Draft Mode)</p>

                                {checklist.services_stocked ? (
                                    <div className="text-xs font-bold uppercase text-blueprint">Verified</div>
                                ) : (
                                    <a href={`/dashboard/${slug}/services`} className="inline-flex items-center gap-2 bg-concrete-100 border border-concrete-900 px-4 py-2 text-xs font-bold uppercase hover:bg-blueprint hover:text-white transition-colors">
                                        Open Service Editor <ArrowRight size={14} />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* ITEM 3: SET GOAL */}
                        <div className="flex gap-4">
                            <div className="mt-1">
                                {checklist.goal_set ? (
                                    <CheckCircle2 className="text-blueprint" size={24} />
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-concrete-900 flex items-center justify-center text-xs font-bold">3</div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-space font-bold text-lg uppercase text-concrete-900">3. Capture Vision</h3>
                                <p className="text-sm text-steel mb-3">Where will this empire be in 12 months? Lock it in.</p>

                                {checklist.goal_set ? (
                                    <div className="bg-blue-50 p-3 italic text-concrete-900 border-l-2 border-blueprint text-sm">
                                        "{checklist.goal_set}"
                                    </div>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="e.g. Quitting my day job..."
                                            value={goalInput}
                                            onChange={(e) => setGoalInput(e.target.value)}
                                            className="w-full border border-concrete-900 p-2 font-work text-sm outline-none focus:border-blueprint"
                                        />
                                        <button
                                            onClick={handleSaveGoal}
                                            disabled={!goalInput || loading}
                                            className="bg-concrete-900 text-white px-4 py-2 text-xs font-bold uppercase disabled:opacity-50"
                                        >
                                            Save
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ITEM 4: PLANT FLAG */}
                        <div className="flex gap-4">
                            <div className="mt-1">
                                {checklist.flag_planted ? (
                                    <CheckCircle2 className="text-blueprint" size={24} />
                                ) : (
                                    <div className="w-6 h-6 rounded-full border-2 border-concrete-900 flex items-center justify-center text-xs font-bold">4</div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-space font-bold text-lg uppercase text-concrete-900">4. Signal Readiness</h3>
                                <p className="text-sm text-steel mb-3">Share your reserved URL to signal you are a day-one founder.</p>

                                {checklist.flag_planted ? (
                                    <div className="text-xs font-bold uppercase text-blueprint truncate max-w-[200px]">{checklist.flag_planted}</div>
                                ) : (
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="https://instagram.com/p/..."
                                            value={flagInput}
                                            onChange={(e) => setFlagInput(e.target.value)}
                                            className="w-full border border-concrete-900 p-2 font-work text-sm outline-none focus:border-blueprint"
                                        />
                                        <button
                                            onClick={handleSaveFlag}
                                            disabled={!flagInput || loading}
                                            className="bg-concrete-900 text-white px-4 py-2 text-xs font-bold uppercase disabled:opacity-50"
                                        >
                                            Verify
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="mt-12 pt-8 border-t border-concrete-100 space-y-4">
                        <button
                            onClick={handleEnter}
                            className={`w-full py-4 text-center font-space font-bold uppercase text-lg flex items-center justify-center gap-2 transition-all
                            ${isComplete ? 'bg-blueprint text-white hover:bg-concrete-900 hover:shadow-[4px_4px_0px_#000]' : 'bg-concrete-100 text-steel cursor-pointer hover:bg-concrete-200'}`}
                        >
                            {!isComplete ? <Lock size={18} /> : <Target size={18} />}
                            {isComplete ? "Access Founder Hub" : "Complete Checklist to Enter"}
                        </button>

                        <button
                            onClick={handleReset}
                            className="w-full text-center text-xs font-bold uppercase text-steel hover:text-brick flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={12} /> Test Mode: Reset Demo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
