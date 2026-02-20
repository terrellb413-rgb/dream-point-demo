// ... imports if needed ...

export default async function ShopPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = (await params).slug;

    return (
        <div className="min-h-screen bg-transparent flex flex-col items-center justify-center font-work text-concrete-900 p-4 md:p-8 relative overflow-hidden">

            {/* DREAM LAYER: Atmosphere */}
            <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-dream-sky opacity-20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-dream-pink opacity-20 blur-[120px] rounded-full pointer-events-none" />

            {/* THE STOREFRONT (Business Layer) */}
            <main className="w-full max-w-lg bg-white border-2 border-concrete-900 shadow-[12px_12px_0px_rgba(31,41,55,0.2)] relative z-10 flex flex-col">

                {/* HEADER: "The Awning" */}
                <header className="bg-concrete-900 text-white p-6 flex justify-between items-center sticky top-0 z-20 border-b-2 border-concrete-900">
                    <div className="font-space font-bold tracking-tight uppercase text-lg">DreamPoint</div>
                    <div className="flex items-center gap-2">
                        <div className="hidden sm:block text-[10px] font-bold uppercase tracking-widest opacity-70">
                            Early Access
                        </div>
                        <div className="text-xs font-bold uppercase bg-blueprint text-white px-2 py-1 border border-white">
                            Founding Member
                        </div>
                    </div>
                </header>

                <div className="p-12 text-center flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                    {/* BLUEPRINT OVERLAY ELEMENTS */}
                    <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1f2937 1px, transparent 1px), linear-gradient(90deg, #1f2937 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    <div className="absolute top-4 left-4 border-t-2 border-l-2 border-blueprint w-12 h-12 opacity-20" />
                    <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-blueprint w-12 h-12 opacity-20" />
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blueprint/10 -translate-y-1/2 rotate-1" />

                    <div className="w-20 h-20 bg-concrete-100 rounded-full flex items-center justify-center mb-6 border-2 border-concrete-900 text-3xl z-10 animate-float shadow-[8px_8px_0px_#2563eb]">
                        🏗️
                    </div>
                    <h1 className="font-space font-bold text-2xl uppercase mb-2 relative z-10">
                        Plot {slug}:<br />Construction Phase
                    </h1>
                    <p className="max-w-xs text-steel mb-8 relative z-10 italic">
                        The "Digital Mall" is currently being surveyed. This plot is officially secured for high-fidelity construction.
                    </p>
                    <div className="inline-block bg-concrete-900 text-white px-4 py-2 border-2 border-blueprint font-mono text-xs font-bold uppercase relative z-10 shadow-[4px_4px_0px_#2563eb]">
                        Auth Code: DP-FL-{slug.slice(0, 3).toUpperCase()}
                    </div>
                </div>

            </main>

            <a href="/" className="mt-8 text-sm font-bold uppercase tracking-widest text-concrete-900/40 hover:text-concrete-900 transition-colors z-10">
                Return to Main
            </a>
        </div>
    );
}
