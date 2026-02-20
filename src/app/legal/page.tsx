"use client";

import { ArrowLeft } from "lucide-react";

export default function LegalPage() {
    return (
        <div className="min-h-screen bg-dream-cloud p-8 font-work text-concrete-900 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white border-2 border-concrete-900 p-10 shadow-[8px_8px_0px_#000]">
                <a href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blueprint mb-8 hover:gap-3 transition-all">
                    <ArrowLeft size={14} /> Back to Mall
                </a>

                <h1 className="font-space font-bold text-4xl uppercase mb-8">Legal & Privacy</h1>

                <section className="space-y-6 text-sm leading-relaxed">
                    <div>
                        <h2 className="font-bold uppercase text-blueprint text-xs tracking-widest mb-2">1. Privacy Commitment</h2>
                        <p>Dreampoint is a development prototype. We do not sell your data. Any information you provide (like shop slugs) is stored temporarily to demonstrate the platform's functionality within the Founders Circle ecosystem.</p>
                    </div>

                    <div>
                        <h2 className="font-bold uppercase text-blueprint text-xs tracking-widest mb-2">2. Data Usage</h2>
                        <p>We use your input to generate blueprints and manage booth reservations. As this is an early-stage project, data persistence is not guaranteed, and the platform may be reset during development phases.</p>
                    </div>

                    <div>
                        <h2 className="font-bold uppercase text-blueprint text-xs tracking-widest mb-2">3. Cookies</h2>
                        <p>We use essential local storage to remember your session and shop selections. No third-party tracking cookies are utilized at this stage.</p>
                    </div>

                    <div>
                        <h2 className="font-bold uppercase text-blueprint text-xs tracking-widest mb-2">4. Terms of Use</h2>
                        <p>By using the Dreampoint prototype, you acknowledge that this is an "architectural blueprint" and not a final retail platform. Features are subject to change as we build the future of beauty commerce together.</p>
                    </div>
                </section>

                <footer className="mt-12 pt-8 border-t border-concrete-100 text-[10px] uppercase tracking-widest text-steel font-bold">
                    © 2026 Dreampoint Founders Circle • San Francisco, CA
                </footer>
            </div>
        </div>
    );
}
