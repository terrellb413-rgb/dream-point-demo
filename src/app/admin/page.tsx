import { mockDb } from "@/lib/mock-db";
import { Hammer, Eye, ExternalLink } from "lucide-react";
import DeleteShopButton from "./DeleteShopButton";
import PlatformUpdateForm from "./PlatformUpdateForm";

export default async function AdminPage() {
    const allShops = await mockDb.getAllShops();

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8 font-work relative overflow-hidden">

            {/* DREAM LAYER: Atmosphere */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-dream-sky opacity-10 blur-[100px] rounded-full pointer-events-none translate-x-1/2 -translate-y-1/2" />

            {/* THE DECK (Business Layer) */}
            <div className="max-w-6xl mx-auto relative z-10 text-concrete-900">
                <PlatformUpdateForm />

                <header className="flex justify-between items-end mb-8 border-b-2 border-concrete-900 pb-4">
                    <div>
                        <h1 className="font-space font-bold text-4xl uppercase tracking-tighter text-concrete-900">Master Deck</h1>
                        <p className="text-steel font-bold uppercase tracking-widest text-sm mt-1">Authorized Personnel Only</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-bold font-space">{allShops.length}</div>
                        <div className="text-xs uppercase font-bold text-steel">Active Permits</div>
                    </div>
                </header>

                <div className="bg-white border-2 border-concrete-900 shadow-[8px_8px_0px_#1f2937]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-concrete-100 border-b border-concrete-900 font-space uppercase text-sm">
                                <tr>
                                    <th className="p-4 border-r border-concrete-900">Slug</th>
                                    <th className="p-4 border-r border-concrete-900">Owner</th>
                                    <th className="p-4 border-r border-concrete-900">Craft / Specialty</th>
                                    <th className="p-4 border-r border-concrete-900">Status</th>
                                    <th className="p-4 border-r border-concrete-900">Progress</th>
                                    <th className="p-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-concrete-100">
                                {allShops.map(({ shop, profile }) => (
                                    <tr key={shop.id} className="group hover:bg-blue-50 transition-colors">
                                        <td className="p-4 border-r border-gray-100 font-mono font-bold text-blueprint">
                                            {shop.slug}
                                        </td>
                                        <td className="p-4 border-r border-gray-100 font-bold">
                                            {profile?.full_name}
                                        </td>
                                        <td className="p-4 border-r border-gray-100">
                                            <div className="font-bold text-sm">{profile?.craft}</div>
                                            <div className="text-[10px] text-steel uppercase font-bold tracking-tight">{profile?.vibe}</div>
                                        </td>
                                        <td className="p-4 border-r border-gray-100">
                                            <span className="inline-block px-2 py-1 text-[10px] uppercase font-bold bg-concrete-900 text-white rounded-sm">
                                                {shop.status}
                                            </span>
                                        </td>
                                        <td className="p-4 border-r border-gray-100 text-sm font-mono">
                                            <div className="flex gap-3">
                                                <span className={shop.checklist?.services_stocked ? "text-blueprint" : "text-gray-300"}>SVC</span>
                                                <span className={shop.checklist?.goal_set ? "text-blueprint" : "text-gray-300"}>GOAL</span>
                                                <span className={shop.checklist?.flag_planted ? "text-blueprint" : "text-gray-300"}>FLAG</span>
                                            </div>
                                        </td>


                                        <td className="p-4 flex gap-2">
                                            <a href={`/dashboard/${shop.slug}`} className="text-xs font-bold uppercase text-concrete-900 hover:text-blueprint border border-concrete-200 px-2 py-1 hover:border-blueprint transition-colors">
                                                Office
                                            </a>
                                            <a href={`/shop/${shop.slug}`} target="_blank" className="text-xs font-bold uppercase text-concrete-900 hover:text-blueprint border border-concrete-200 px-2 py-1 hover:border-blueprint transition-colors flex items-center gap-1">
                                                Shop <ExternalLink size={10} />
                                            </a>
                                            <DeleteShopButton slug={shop.slug} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {allShops.length === 0 && (
                        <div className="p-12 text-center text-steel font-bold uppercase">No records found.</div>
                    )}
                </div>

            </div>
        </div>
    );
}
