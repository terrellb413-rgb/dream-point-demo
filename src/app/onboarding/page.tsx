"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createShopAction } from "../actions"; // Import Server Action
import { Hammer, Key } from "lucide-react";
import clsx from "clsx";

// Suspense boundary wrapper
export default function OnboardingPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-concrete-100 flex items-center justify-center">Loading...</div>}>
            <OnboardingFlow />
        </Suspense>
    );
}

const SPECIALTY_MAPPING: Record<string, string[]> = {
    "Barber": ["Sharp Fades", "Beard Specialist", "Classic Cuts", "Hair Graphics", "Luxury Shaves"],
    "Hair Stylist": ["Wig Installs", "Braider", "Ponytail Artist", "Loctician", "Color Specialist", "Natural Hair"],
    "Nail Tech": ["Acrylic Sets", "Gel Art", "Natural Nails", "Pedicures", "3D Art", "Russian Manicure"],
    "MUA": ["Bridal", "Editorial", "Glam", "SFX", "Soft Glam", "Natural Beat"],
    "Lash Tech": ["Classic", "Hybrid", "Volume", "Mega Volume", "Lash Lift", "Wispy"],
    "Esthetician": ["Facials", "Body Waxing", "Chemical Peels", "Acne Specialist", "Med-Spa"],
    "Brow Enhancer": ["Microblading", "Ombre Brows", "Lamination", "Threading", "Tinting"],
    "Skincare Formulator": ["Face Serums", "Body Care", "Hair Care", "Herbal", "Small Batch"],
    "Tattoo Artist": ["Fine Line", "Traditional", "Realism", "Blackwork", "Piercings"],
    "Tufting Artist": ["Rug Art", "Wall Hangings", "Custom Logos", "Soft Goods"],
    "Woodworking": ["Furniture", "Resin Art", "Home Decor", "CNC", "Carpentry"],
    "Jewelry Maker": ["Handcrafted", "Fine Jewelry", "Beaded", "Minimalist", "Bold Statement"],
    "Photographer": ["Portrait", "Wedding", "Product", "Fashion", "Street"],
    "Content Creator": ["Lifestyle", "Tech", "Beauty", "Educational", "Humor"],
    "Brand Designer": ["Logo Design", "Web Design", "Packaging", "Content Kit", "Typography"],
    "Visual Artist": ["Canvas", "Mural", "Digital Art", "Abstract", "Illustration"],
    "Florist": ["Weddings", "Events", "Dried Florals", "Subscriptions", "Modern"],
    "Sneaker Designer": ["Customs", "Restoration", "Conceptual", "Y2K Style", "Hypebeast", "Sustainable"],
    "Digital Arts": ["NFT Art", "3D Modeling", "Animation", "UI/UX", "Graphic Design"]
};

const DEFAULT_SPECIALTIES = ["Generalist", "Conceptual", "Modern", "Classic"];

function OnboardingFlow() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSlug = searchParams.get("slug") || "";

    const [step, setStep] = useState<"details" | "building" | "success">("details");
    const [formData, setFormData] = useState({
        slug: initialSlug,
        fullName: "",
        craft: "Barber",
        vibe: "Sharp Fades", // Defaulting to first specialty of first craft
    });
    const [loadingText, setLoadingText] = useState("Pouring Foundation...");

    const crafts = Object.keys(SPECIALTY_MAPPING);
    const specialties = SPECIALTY_MAPPING[formData.craft] || DEFAULT_SPECIALTIES;

    // Reset specialty when craft changes
    useEffect(() => {
        const available = SPECIALTY_MAPPING[formData.craft] || DEFAULT_SPECIALTIES;
        if (!available.includes(formData.vibe)) {
            setFormData(prev => ({ ...prev, vibe: available[0] }));
        }
    }, [formData.craft]);

    const handleBuild = async () => {
        setStep("building");

        // Animation Sequence simulating backend tasks
        const tasks = ["Pouring concrete...", "Installing locks...", "Painting signage...", "Opening doors..."];
        for (let i = 0; i < tasks.length; i++) {
            setLoadingText(tasks[i]);
            await new Promise(r => setTimeout(r, 800));
        }

        // Call Server Action (Runs on Server)
        await createShopAction({
            slug: formData.slug,
            fullName: formData.fullName,
            craft: formData.craft,
            vibe: formData.vibe
        });

        setStep("success");
    };

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center p-4 font-work relative overflow-hidden">

            {/* DREAM LAYER: Atmosphere */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-dream-pink opacity-20 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-dream-sky opacity-20 blur-[100px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2" />

            {/* BUSINESS LAYER: The Wizard Container */}
            <div className="w-full max-w-2xl bg-white border-2 border-concrete-900 shadow-[8px_8px_0px_#1f2937] p-8 relative z-10">

                {/* Progress Bar */}
                <div className="flex justify-between items-center mb-8 border-b border-concrete-100 pb-4">
                    <div className={clsx("flex items-center gap-2 font-bold uppercase text-sm", step === "details" ? "text-blueprint" : "text-concrete-900")}>
                        <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center border-2", step === "details" ? "border-blueprint bg-blueprint text-white" : "border-concrete-900 bg-concrete-100")}>1</div>
                        Permit
                    </div>
                    <div className={clsx("h-0.5 w-12", step === "building" || step === "success" ? "bg-blueprint" : "bg-concrete-100")}></div>
                    <div className={clsx("flex items-center gap-2 font-bold uppercase text-sm", step === "building" ? "text-blueprint" : "text-concrete-900")}>
                        <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center border-2", step === "building" ? "border-blueprint bg-blueprint text-white" : "border-concrete-900 bg-concrete-100")}>2</div>
                        Build
                    </div>
                    <div className={clsx("h-0.5 w-12", step === "success" ? "bg-blueprint" : "bg-concrete-100")}></div>
                    <div className={clsx("flex items-center gap-2 font-bold uppercase text-sm", step === "success" ? "text-blueprint" : "text-concrete-900")}>
                        <div className={clsx("w-6 h-6 rounded-full flex items-center justify-center border-2", step === "success" ? "border-blueprint bg-blueprint text-white" : "border-concrete-900 bg-concrete-100")}>3</div>
                        Keys
                    </div>
                </div>

                {/* STEP 1: DETAILS */}
                {step === "details" && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h1 className="font-space font-bold text-2xl uppercase mb-6 flex items-center gap-2">
                            <Hammer className="text-blueprint" /> Builder's Permit
                        </h1>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-steel mb-1">Shop URL</label>
                                <input
                                    type="text"
                                    disabled
                                    value={`dreampoint.com/${formData.slug}`}
                                    className="w-full bg-concrete-100 border border-concrete-900 p-3 font-mono text-sm opacity-70 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-steel mb-1">Owner Name</label>
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    placeholder="e.g. Jay Smith"
                                    className="w-full border border-concrete-900 p-3 font-bold text-lg outline-none focus:bg-blue-50"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-steel mb-1">Craft</label>
                                <select
                                    value={formData.craft}
                                    onChange={(e) => setFormData({ ...formData, craft: e.target.value })}
                                    className="w-full border border-concrete-900 p-3 bg-white font-bold text-lg outline-none"
                                >
                                    {crafts.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-steel mb-1">Your Specialty</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {specialties.map(s => (
                                        <button
                                            key={s}
                                            onClick={() => setFormData({ ...formData, vibe: s })}
                                            className={clsx(
                                                "p-3 border border-concrete-900 font-bold transition-all text-sm",
                                                formData.vibe === s
                                                    ? "bg-blueprint text-white shadow-[2px_2px_0px_#1f2937] translate-x-[-1px] translate-y-[-1px]"
                                                    : "bg-white hover:bg-concrete-100"
                                            )}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleBuild}
                            disabled={!formData.fullName}
                            className="w-full mt-8 bg-concrete-900 text-white font-space font-bold text-xl uppercase py-4 shadow-[4px_4px_0px_#2563eb] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_#2563eb] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Pour Foundation
                        </button>
                    </div>
                )}

                {/* STEP 2: ANIMATION */}
                {step === "building" && (
                    <div className="text-center animate-in fade-in duration-500 py-12">
                        <div className="text-6xl mb-6 animate-bounce">🏗️</div>
                        <h2 className="font-space font-bold text-3xl uppercase tracking-tight mb-2">{loadingText}</h2>
                        <p className="text-steel text-sm uppercase tracking-widest">Do not close this window</p>
                    </div>
                )}

                {/* STEP 3: SUCCESS */}
                {step === "success" && (
                    <div className="animate-in zoom-in-95 duration-500">
                        <div className="h-2 bg-blueprint w-full absolute top-0 left-0"></div>
                        <div className="text-center flex flex-col items-center pt-8">
                            <div className="w-16 h-16 bg-concrete-900 text-white rounded-full flex items-center justify-center mb-6 border-4 border-blueprint">
                                <Key size={32} />
                            </div>

                            <h1 className="font-space font-bold text-3xl uppercase leading-none mb-2">Spot Secured.</h1>
                            <div className="bg-concrete-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-concrete-900 mb-6 border border-concrete-900">
                                Founding Member #042
                            </div>

                            <p className="text-steel mb-8 text-sm max-w-xs mx-auto">
                                You have reserved a location on the first block. Your storefront is now under construction.
                            </p>

                            <div className="w-full bg-concrete-100 border border-concrete-900 p-4 mb-8 relative group">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-[10px] font-bold uppercase text-blueprint border border-blueprint">Deed of Ownership</div>
                                <div className="font-mono text-xl font-bold text-concrete-900">dreampoint.com/{formData.slug}</div>
                            </div>

                            <button
                                onClick={() => router.push(`/dashboard/${formData.slug}`)}
                                className="w-full bg-concrete-900 text-white font-space font-bold uppercase py-4 hover:bg-blueprint transition-colors"
                            >
                                Enter Office
                            </button>

                            <p className="mt-4 text-xs text-steel uppercase font-bold">Mock Mode: Database Updated</p>
                        </div>
                    </div>
                )}

            </div>

        </div>
    );
}
