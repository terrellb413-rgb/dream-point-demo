import { mockDb } from "@/lib/mock-db";
import { getPlatformUpdatesAction } from "@/app/actions";
import FoundersHub from "@/components/FoundersHub";

export default async function FoundersCirclePage() {
    // In real app, we would verify session 'founder' status here
    const allFounders = (await mockDb.getAllShops())
        .filter(s => s.shop.status === 'founder')
        .sort((a, b) => (b.profile?.engagement_score || 0) - (a.profile?.engagement_score || 0));

    const updates = await getPlatformUpdatesAction();

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8 font-work relative overflow-hidden">
            {/* DREAM LAYER: Atmosphere - More Intense for Hub */}
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-dream-sky/20 to-dream-pink/20 pointer-events-none" />
            <div className="fixed top-1/2 left-1/2 w-[800px] h-[800px] bg-white opacity-40 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />

            {/* THE HUB (Business Layer) */}
            <FoundersHub
                allFounders={allFounders}
                updates={updates}
                currentShopContext={{
                    name: allFounders[0]?.profile?.username || "demo",
                    vision: "Building the digital empire."
                }}
            />
        </div>
    );
}
