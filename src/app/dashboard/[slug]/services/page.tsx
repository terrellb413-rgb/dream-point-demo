"use client";

import { useState, useEffect } from "react";
import { Service, Profile } from "@/lib/types";
import { addServiceAction, getServicesAction, getShopAction } from "@/app/actions";
import { Plus, Trash2, Clock, DollarSign, Sparkles, Calendar } from "lucide-react";
import { getSuggestedServices, SuggestedService } from "@/lib/suggested-services";
import { clsx } from "clsx";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function ServicesPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const [slug, setSlug] = useState("");
    const [services, setServices] = useState<Service[]>([]);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState<SuggestedService[]>([]);

    useEffect(() => {
        params.then((p) => {
            setSlug(p.slug);
            loadServices(p.slug);
        });
    }, [params]);

    const loadServices = async (s: string) => {
        const [servicesRes, shopRes] = await Promise.all([
            getServicesAction(s),
            getShopAction(s)
        ]);

        setServices(servicesRes);
        if (shopRes) {
            setProfile(shopRes.profile || null);
            if (shopRes.profile?.vibe) {
                setSuggestions(getSuggestedServices(shopRes.profile.vibe));
            }
        }
        setLoading(false);
    };

    const [form, setForm] = useState({
        title: "",
        price: "",
        duration: "30",
        description: "",
        available_days: [] as string[]
    });
    const [adding, setAdding] = useState(false);

    const quickAdd = (suggested: SuggestedService) => {
        setForm({
            title: suggested.title,
            price: String(suggested.price),
            duration: String(suggested.duration_mins),
            description: suggested.description || "",
            available_days: suggested.available_days || []
        });
        // Optionally auto-scroll to form
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        // Critical Validation
        if (!slug) {
            alert("Error: Shop ID (slug) is missing. Try reloading.");
            return;
        }
        if (!form.title || !form.price) {
            alert("Please fill in Title and Price.");
            return;
        }

        setAdding(true);
        try {
            const result = await addServiceAction(slug, {
                title: form.title,
                price: Number(form.price),
                duration_mins: Number(form.duration) || 30,
                description: form.description,
                available_days: form.available_days
            });

            if (result.success) {
                setForm({ title: "", price: "", duration: "30", description: "", available_days: [] });
                await loadServices(slug); // Verify we get the new list
            } else {
                alert(`Failed to add service: ${result.error}`);
            }
        } catch (err) {
            alert("An unexpected error occurred.");
            console.error(err);
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8 font-work relative overflow-hidden">

            {/* DREAM LAYER: Atmosphere */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-dream-sky opacity-10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

            {/* THE OFFICE (Business Layer) */}
            <div className="max-w-5xl mx-auto relative z-10 text-concrete-900">

                <div className="mb-8 border-b-2 border-concrete-900 pb-6">
                    <div className="flex justify-between items-start mb-4">
                        <a href={`/dashboard/${slug}`} className="group flex items-center gap-2 font-bold uppercase text-sm border-2 border-concrete-900 bg-white px-4 py-2 hover:bg-concrete-900 hover:text-white transition-all shadow-[4px_4px_0px_#e5e7eb] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]">
                            ← Return to Checklist
                        </a>
                        <div className="text-right">
                            <div className="font-space font-bold text-3xl text-concrete-900">{services.length} / 3</div>
                            <div className="text-[10px] uppercase font-bold text-steel tracking-widest">Slots Filled</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <h1 className="font-space font-bold text-4xl uppercase tracking-tighter text-concrete-900 leading-none">Service Inventory</h1>
                            <p className="text-steel mt-2 max-w-md">Add at least 1 service to complete this checklist item (Maximum 3).</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

                    {/* Left: Service List */}
                    <div className="space-y-4">
                        {loading && <div className="p-8 text-center text-steel">Loading manifest...</div>}

                        {!loading && services.length === 0 && (
                            <div className="border-2 border-dashed border-concrete-900/20 p-8 text-center rounded-sm bg-white/50">
                                <p className="text-steel font-bold uppercase text-sm">No inventory yet.</p>
                                <p className="text-xs text-gray-400 mt-1">Fill out the form to create your first card.</p>
                            </div>
                        )}

                        {services.map((svc) => (
                            <div key={svc.id} className="bg-white border-2 border-concrete-900 p-6 shadow-[4px_4px_0px_#e5e7eb] group hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-space font-bold text-xl leading-tight text-concrete-900">{svc.title}</h3>
                                        <div className="flex gap-4 mt-2 text-xs font-bold uppercase text-blueprint">
                                            <span className="flex items-center gap-1"><DollarSign size={14} /> {svc.price}</span>
                                            <span className="flex items-center gap-1"><Clock size={14} /> {svc.duration_mins}m</span>
                                        </div>
                                    </div>
                                    <button className="text-gray-300 hover:text-brick transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </div>

                                {svc.description && (
                                    <div className="mb-4 pt-4 border-t border-concrete-100 italic text-steel text-sm">
                                        "{svc.description}"
                                    </div>
                                )}

                                {svc.available_days && svc.available_days.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-auto">
                                        {DAYS.map(day => {
                                            const isActive = svc.available_days?.includes(day);
                                            return (
                                                <div
                                                    key={day}
                                                    className={clsx(
                                                        "text-[9px] font-bold px-1.5 py-0.5 rounded-sm border",
                                                        isActive
                                                            ? "border-blueprint bg-blue-50 text-blueprint"
                                                            : "border-concrete-100 bg-white text-gray-200"
                                                    )}
                                                >
                                                    {day[0]}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Right: Add Form */}
                    <div className="bg-concrete-900 text-white p-6 shadow-[8px_8px_0px_#4b5563]">
                        <h2 className="font-space font-bold text-xl uppercase mb-6 flex items-center gap-2">
                            <Plus className="text-blueprint" size={24} /> New Service
                        </h2>

                        <form onSubmit={handleAdd} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase text-concrete-200 mb-2">Service Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Signature Haircut"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    className="w-full p-3 font-bold text-concrete-900 bg-white outline-none border-2 border-transparent focus:border-blueprint placeholder:text-gray-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-concrete-200 mb-2">What's included in this service?</label>
                                <textarea
                                    placeholder="Describe the experience, tools used, or specific results..."
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                    className="w-full p-3 font-medium text-sm text-concrete-900 bg-white outline-none border-2 border-transparent focus:border-blueprint placeholder:text-gray-400 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase text-concrete-200 mb-2 flex justify-between">
                                    Weekly Availability
                                    <span className="text-[10px] text-blueprint tracking-widest">{form.available_days.length} Days Selected</span>
                                </label>
                                <div className="flex gap-1">
                                    {DAYS.map(day => {
                                        const isActive = form.available_days.includes(day);
                                        return (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => {
                                                    const next = isActive
                                                        ? form.available_days.filter(d => d !== day)
                                                        : [...form.available_days, day];
                                                    setForm({ ...form, available_days: next });
                                                }}
                                                className={clsx(
                                                    "flex-1 py-3 border-2 font-bold text-xs transition-all",
                                                    isActive
                                                        ? "bg-blueprint border-blueprint text-white"
                                                        : "bg-concrete-800 border-concrete-700 text-concrete-400 hover:border-concrete-600"
                                                )}
                                            >
                                                {day[0]}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-1 relative">
                                    <label className="block text-xs font-bold uppercase text-concrete-200 mb-2">Price ($)</label>
                                    <span className="absolute left-3 top-[34px] z-10 text-gray-500 font-bold">$</span>
                                    <input
                                        type="number"
                                        placeholder="45"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        className="w-full p-3 pl-8 font-bold text-concrete-900 bg-white outline-none border-2 border-transparent focus:border-blueprint placeholder:text-gray-400"
                                    />
                                </div>
                                <div className="flex-1 relative">
                                    <label className="block text-xs font-bold uppercase text-concrete-200 mb-2">Duration (Min)</label>
                                    <input
                                        type="number"
                                        placeholder="30"
                                        value={form.duration}
                                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                                        className="w-full p-3 font-bold text-concrete-900 bg-white outline-none border-2 border-transparent focus:border-blueprint placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={adding}
                                className="w-full bg-blueprint text-white font-space font-bold uppercase py-4 mt-2 hover:bg-white hover:text-blueprint hover:shadow-[4px_4px_0px_#000] transition-all disabled:opacity-50 disabled:hover:shadow-none"
                            >
                                {adding ? "Stocking..." : "Add to Shelf"}
                            </button>
                        </form>

                        {/* Suggestions Block */}
                        {suggestions.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-concrete-700">
                                <h3 className="text-[10px] font-bold uppercase tracking-widest text-concrete-400 mb-4 flex items-center gap-2">
                                    <Sparkles size={12} className="text-blueprint" /> Suggested for your {profile?.craft} Shop
                                </h3>
                                <div className="space-y-2">
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => quickAdd(s)}
                                            className="w-full text-left p-3 border border-concrete-700 hover:border-blueprint hover:bg-concrete-800 transition-all group flex justify-between items-center"
                                        >
                                            <div>
                                                <div className="font-bold text-sm">{s.title}</div>
                                                <div className="text-[10px] text-concrete-400 uppercase font-bold">${s.price} • {s.duration_mins}m</div>
                                            </div>
                                            <Plus size={14} className="opacity-0 group-hover:opacity-100 text-blueprint transition-opacity" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                </div>
            </div>
        </div>
    );
}
