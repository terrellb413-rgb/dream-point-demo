import { Sparkles, ArrowRight, Lock, MapPin, Building2, Zap, Crown, Video, Instagram, Youtube } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-dvh bg-transparent p-4 md:p-8 font-work flex flex-col items-center overflow-x-hidden">

      {/* DREAM LAYER: Atmosphere - Using optimized classes for Mobile Compatibility */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-dream-sky opacity-15 dream-blur rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-dream-pink opacity-15 dream-blur rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-white opacity-20 dream-blur rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block" />

      {/* VISION / STORY SECTION */}
      <section className="w-full max-w-5xl relative z-10 pt-20 pb-20">
        <div className="text-center mb-16 px-4">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-concrete-200 shadow-sm mb-6">
            <Building2 className="text-blueprint" size={14} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-concrete-900">The Blueprint</span>
          </div>
          <h2 className="font-space font-bold text-4xl md:text-6xl uppercase tracking-tighter text-concrete-900 leading-[0.9]">
            The Digital <br /> <span className="text-blueprint">Dreampoint Mall.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 px-4">
          <div className="bg-white border-2 border-concrete-900 p-8 shadow-[8px_8px_0px_#2563eb] relative overflow-hidden">
            <div className="absolute top-[-20px] right-[-20px] bg-blueprint/5 w-40 h-40 rounded-full blur-3xl pointer-events-none" />
            <h3 className="font-space font-bold text-2xl uppercase mb-4 flex items-center gap-2">
              <Zap className="text-yellow-400" /> The Problem
            </h3>
            <p className="text-concrete-900/70 leading-relaxed font-medium">
              Most creators live in a "Feed." You post, it disappears. Your "business" is often just a link in a profile that takes 3 clicks to find. You don't have a home; you have a rent-free tent.
            </p>
          </div>

          <div className="bg-concrete-900 text-white p-8 shadow-[8px_8px_0px_#fbcfe8] relative overflow-hidden">
            <div className="absolute top-[-20px] right-[-20px] bg-white/5 w-40 h-40 rounded-full blur-3xl pointer-events-none" />
            <h3 className="font-space font-bold text-2xl uppercase mb-4 flex items-center gap-2">
              <Sparkles className="text-blueprint" /> The Solution
            </h3>
            <p className="text-gray-300 leading-relaxed font-medium">
              We're building a digital Mall. A place where your business isn't a link, but a dedicated booth. A storefront that you own, designed with a luxury "dream-layer" atmosphere that treats your craft like art.
            </p>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="mb-20 px-4">
          <h3 className="font-space font-bold text-3xl uppercase tracking-tighter text-concrete-900 text-center mb-12">
            How it Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <MapPin />, title: "Inquire", desc: "Rent your digital booth space in the mall." },
              { icon: <Sparkles />, title: "Consult", desc: "Strategy sessions with the AI Coach." },
              { icon: <Crown />, title: "Induct", desc: "Join the Founders Circle building team." },
              { icon: <Zap />, title: "Launch", desc: "Open your high-fidelity storefront." }
            ].map((step, i) => (
              <div key={i} className="bg-white border-2 border-concrete-900 p-6 flex flex-col items-center text-center group hover:bg-white transition-all shadow-[4px_4px_0px_#1f2937] hover:shadow-none translate-x-[-2px] translate-y-[-2px] hover:translate-x-0 hover:translate-y-0">
                <div className="p-3 bg-concrete-100 rounded-full border-2 border-concrete-900 mb-4 group-hover:bg-blueprint group-hover:text-white transition-colors">
                  {step.icon}
                </div>
                <h4 className="font-space font-bold uppercase mb-1">{step.title}</h4>
                <p className="text-xs text-steel font-bold leading-tight">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HERO SECTION */}
      <main className="flex flex-col gap-10 items-center text-center relative z-10 pb-32 w-full max-w-4xl">

        <div className="flex flex-col items-center gap-4">
          <div className="bg-concrete-900 text-white px-3 py-1 font-bold text-[10px] uppercase tracking-widest mb-2 border border-white shadow-md flex items-center gap-2">
            <MapPin size={10} className="text-blueprint" /> Mall Level 01: Now Leasing
          </div>

          <h1 className="text-6xl sm:text-8xl font-space font-bold uppercase tracking-tighter leading-[0.85] text-concrete-900">
            Rent Your <br /> <span className="bg-blueprint text-white px-4">Digital Booth.</span>
          </h1>
          <p className="max-w-md text-concrete-900/70 text-lg font-work mt-6 leading-tight text-balance">
            The future operating system for beauty founders. You are early. <span className="text-concrete-900 font-bold">Secure your space in the Dreampoint Mall before we break ground.</span>
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
          <a
            href="/claim"
            className="w-full bg-concrete-900 text-white border-2 border-concrete-900 px-8 py-6 font-space uppercase font-bold text-2xl shadow-[8px_8px_0px_#2563eb] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 group"
          >
            <Lock className="text-yellow-400 animate-pulse group-hover:scale-125 transition-transform" />
            Secure My Spot
          </a>

          <div className="flex flex-col sm:flex-row gap-8 mt-4">
            <a
              href="/coach"
              className="text-xs font-bold uppercase tracking-widest text-concrete-900 border-b-2 border-concrete-900 hover:text-blueprint hover:border-blueprint transition-all pb-1 flex items-center gap-2"
            >
              Talk to Strategy Coach <ArrowRight size={14} />
            </a>
            <a
              href="/office"
              className="text-xs font-bold uppercase tracking-widest text-concrete-900/50 hover:text-concrete-900 transition-all flex items-center gap-2"
            >
              <Lock size={12} /> Enter Office
            </a>
          </div>

          {/* SOCIAL ECOSYSTEM NAVIGATION */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-concrete-900/40">Watch the Construction</span>
            <div className="flex gap-6">
              <a
                href="https://www.tiktok.com/@dreampointapp?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-concrete-900 rounded-full shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-concrete-900 hover:text-blueprint"
                title="TikTok"
              >
                <Video size={18} />
              </a>
              <a
                href="https://www.instagram.com/dreampointapp?igsh=NXZkemIxd2s2dzVk&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-concrete-900 rounded-full shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-concrete-900 hover:text-blueprint"
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://youtube.com/@dreampointapp?si=Ey4Qd30AkqVnFb5G"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-concrete-900 rounded-full shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-concrete-900 hover:text-blueprint"
                title="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* FINAL CALL TO ACTION (Pushed to bottom) */}
      <section className="w-full max-w-5xl relative z-10 pb-32">
        <div className="bg-blueprint text-white p-10 text-center border-4 border-concrete-900 shadow-[12px_12px_0px_#000] mx-4">
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
      </section>

      <footer className="w-full flex flex-col gap-4 items-center justify-center font-work text-concrete-900/30 text-[10px] uppercase tracking-[0.2em] relative z-10 pb-8">
        <div className="flex gap-6">
          <a href="/legal" className="hover:text-concrete-900 transition-colors">Privacy & Terms</a>
          <span>•</span>
          <span>Dreampoint Founders Circle</span>
        </div>
        <div className="w-12 h-[1px] bg-concrete-200" />
      </footer>
    </div>
  );
}
