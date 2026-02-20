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
                            Mall Level 01
                        </div>
                        <div className="text-[10px] font-bold uppercase bg-blueprint text-white px-3 py-1.5 border-2 border-white shadow-[2px_2px_0px_#000] flex items-center gap-2">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            Day One Architect
                        </div>
                    </div>
                </header>

                <div className="p-12 text-center flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden">
                    {/* BLUEPRINT OVERLAY ELEMENTS */}
                    <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="absolute top-8 left-8 border-t-2 border-l-2 border-blueprint w-16 h-16 opacity-30" />
                    <div className="absolute bottom-8 right-8 border-b-2 border-r-2 border-blueprint w-16 h-16 opacity-30" />
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blueprint/20 -translate-y-1/2 -rotate-2" />
                    <div className="absolute top-0 left-1/2 h-full w-[1px] bg-blueprint/20 -translate-x-1/2 rotate-1" />

                    <div className="relative mb-8">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-concrete-900 text-4xl z-10 animate-float shadow-[8px_8px_0px_#2563eb]">
                            🏗️
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-blueprint text-white w-10 h-10 rounded-full border-2 border-concrete-900 flex items-center justify-center text-xs animate-pulse">
                            01
                        </div>
                    </div>

                    <h1 className="font-space font-bold text-3xl uppercase mb-3 relative z-10 leading-none">
                        Plot {slug}:<br />
                        <span className="text-blueprint text-lg">Architectural Survey</span>
                    </h1>
                    <p className="max-w-xs text-steel mb-10 relative z-10 text-sm font-medium leading-relaxed">
                        This high-fidelity plot has been officially secured. The Founders Circle infrastructure is now preparing your digital foundation.
                    </p>

                    <div className="flex flex-col gap-2 items-center relative z-10">
                        <div className="inline-block bg-concrete-50 text-concrete-900 px-4 py-2 border-2 border-concrete-900 font-mono text-[10px] font-bold uppercase shadow-[4px_4px_0px_#2563eb]">
                            Permit ID: DP-FC-{slug.toUpperCase().slice(0, 4)}
                        </div>
                        <div className="text-[9px] font-bold uppercase text-blueprint tracking-widest animate-pulse">
                            System Status: Ready for Rendering
                        </div>
                    </div>
                </div>

            </main>

            <a href="/" className="mt-8 text-sm font-bold uppercase tracking-widest text-concrete-900/40 hover:text-concrete-900 transition-colors z-10">
                Return to Main
            </a>
        </div>
    );
}
