import { Sparkles, ArrowRight, Lock, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans relative overflow-hidden">

      {/* DREAM LAYER: Atmosphere */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-dream-sky opacity-20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-dream-pink opacity-20 blur-[100px] rounded-full pointer-events-none" />

      {/* BUSINESS LAYER: Content */}
      <main className="flex flex-col gap-10 row-start-2 items-center text-center relative z-10">

        <div className="flex flex-col items-center gap-4">
          <div className="bg-concrete-900 text-white px-3 py-1 font-bold text-[10px] uppercase tracking-widest mb-2 border border-white shadow-md flex items-center gap-2">
            <MapPin size={10} className="text-blueprint" /> Street 01: Now Leasing
          </div>
          <a href="/vision" className="group inline-flex items-center gap-2 mb-4 bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-concrete-200 hover:border-blueprint transition-all">
            <span className="text-[10px] font-bold uppercase tracking-widest text-concrete-900">What is DreamPoint?</span>
            <div className="w-1.5 h-1.5 bg-blueprint rounded-full animate-pulse" />
          </a>
          <h1 className="text-5xl sm:text-7xl font-space font-bold uppercase tracking-tighter leading-[0.85] text-concrete-900 max-w-2xl">
            Build Your <br /> <span className="bg-blueprint text-white px-4">Dream Shop.</span>
          </h1>
          <p className="max-w-md text-concrete-900/70 text-lg font-work mt-4 leading-tight">
            Stop sending clients to profile links. Start building a digital destination that reflects your craft.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full max-w-sm">
          {/* THE MAIN ATTRACTION: AI COACH */}
          <a
            href="/coach"
            className="w-full bg-concrete-900 text-white border-2 border-concrete-900 px-8 py-6 font-space uppercase font-bold text-2xl shadow-[8px_8px_0px_#2563eb] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-3 group"
          >
            <Sparkles className="text-yellow-400 animate-pulse group-hover:scale-125 transition-transform" />
            Talk to the Coach
          </a>

          <div className="flex flex-col sm:flex-row gap-8 mt-4">
            <a
              href="/claim"
              className="text-xs font-bold uppercase tracking-widest text-concrete-900 border-b-2 border-concrete-900 hover:text-blueprint hover:border-blueprint transition-all pb-1 flex items-center gap-2"
            >
              Reserve My Spot <ArrowRight size={14} />
            </a>
            <a
              href="/office"
              className="text-xs font-bold uppercase tracking-widest text-concrete-900/50 hover:text-concrete-900 transition-all flex items-center gap-2"
            >
              <Lock size={12} /> Enter Office
            </a>
          </div>
        </div>

      </main>

      <footer className="row-start-3 flex flex-col gap-2 items-center justify-center font-work text-concrete-900/30 text-[10px] uppercase tracking-[0.2em] relative z-10">
        <span>DreamPoint Founders Circle</span>
        <div className="w-12 h-[1px] bg-concrete-200" />
      </footer>
    </div>
  );
}
