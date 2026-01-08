import { MapPin, Sparkles, Crown, Zap, ArrowRight, Building2, Users } from "lucide-react";

export default function VisionPage() {
    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8 font-work relative overflow-hidden">

            {/* DREAM LAYER: Atmosphere */}
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-dream-sky/20 to-dream-pink/20 pointer-events-none" />
            <div className="fixed top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white opacity-30 blur-[120px] rounded-full pointer-events-none" />
            <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-dream-sky opacity-20 blur-[100px] rounded-full pointer-events-none" />

            {/* CONTENT */}
            <div className="max-w-4xl mx-auto relative z-10 pt-12 pb-24">

                <header className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/40 shadow-sm mb-6">
                        <Building2 className="text-blueprint" size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-concrete-900">The Blueprint</span>
                    </div>
                    <h1 className="font-space font-bold text-5xl md:text-7xl uppercase tracking-tighter text-concrete-900 leading-[0.9] mb-6">
                        The Digital <br /> <span className="text-blueprint">Main Street.</span>
                    </h1>
                    <p className="text-xl text-concrete-900/70 font-bold max-w-xl mx-auto leading-tight">
                        DreamPoint is a first-day platform for creators who are tired of hiding in profile links.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-white border-2 border-concrete-900 p-8 shadow-[8px_8px_0px_#2563eb] relative overflow-hidden">
                        <div className="absolute top-[-20px] right-[-20px] bg-blueprint/5 w-40 h-40 rounded-full blur-3xl pointer-events-none" />
                        <h2 className="font-space font-bold text-2xl uppercase mb-4 flex items-center gap-2">
                            <Zap className="text-yellow-400" /> The Problem
                        </h2>
                        <p className="text-steel leading-relaxed">
                            Most creators live in a "Feed." You post, it disappears. Your "business" is often just a link in a profile that takes 3 clicks to find. You don't have a home; you have a rent-free tent.
                        </p>
                    </div>

                    <div className="bg-concrete-900 text-white p-8 shadow-[8px_8px_0px_#fbcfe8] relative overflow-hidden">
                        <div className="absolute top-[-20px] right-[-20px] bg-white/5 w-40 h-40 rounded-full blur-3xl pointer-events-none" />
                        <h2 className="font-space font-bold text-2xl uppercase mb-4 flex items-center gap-2">
                            <Sparkles className="text-blueprint" /> The Solution
                        </h2>
                        <p className="text-gray-300 leading-relaxed">
                            We're building a digital Main Street. A place where your business is a fixed destination. A storefront that you own, designed with a luxury "dream-layer" atmosphere that treats your craft like art.
                        </p>
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <section className="mb-20">
                    <h2 className="font-space font-bold text-3xl uppercase tracking-tighter text-concrete-900 text-center mb-12">
                        How it Works
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <MapPin />, title: "Claim", desc: "Reserve your unique plot on the map." },
                            { icon: <Sparkles />, title: "Consult", desc: "Strategy sessions with the AI Coach." },
                            { icon: <Crown />, title: "Induct", desc: "Join the Founders Circle building team." },
                            { icon: <Zap />, title: "Launch", desc: "Open your high-fidelity storefront." }
                        ].map((step, i) => (
                            <div key={i} className="bg-white/40 backdrop-blur-sm border-2 border-concrete-900 p-6 flex flex-col items-center text-center group hover:bg-white transition-colors">
                                <div className="p-3 bg-concrete-100 rounded-full border-2 border-concrete-900 mb-4 group-hover:bg-blueprint group-hover:text-white transition-colors">
                                    {step.icon}
                                </div>
                                <h3 className="font-space font-bold uppercase mb-1">{step.title}</h3>
                                <p className="text-xs text-steel font-medium leading-tight">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* THE PITCH */}
                <div className="bg-blueprint text-white p-10 text-center border-4 border-concrete-900 shadow-[12px_12px_0px_#000]">
                    <Crown size={48} className="mx-auto mb-6 text-yellow-400" />
                    <h2 className="font-space font-bold text-4xl uppercase tracking-tighter mb-4 leading-none">
                        Join the Founders Circle
                    </h2>
                    <p className="max-w-lg mx-auto mb-8 font-bold text-lg opacity-90">
                        We aren't just looking for users; we're looking for architects. Help us build the platform you've always wanted.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/claim" className="bg-white text-blueprint px-8 py-4 font-space font-bold uppercase shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                            Claim My Plot
                        </a>
                        <a href="/coach" className="bg-concrete-900 text-white px-8 py-4 font-space font-bold uppercase shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                            Talk to the Coach
                        </a>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a href="/" className="text-xs font-bold uppercase tracking-widest text-concrete-900/50 hover:text-concrete-900 flex items-center justify-center gap-2">
                        ← Back to the Street
                    </a>
                </div>

            </div>
        </div>
    );
}
