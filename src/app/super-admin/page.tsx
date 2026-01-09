"use client";

import { useState, useEffect } from "react";
import { Trash2, ExternalLink, ShieldAlert, RefreshCw } from "lucide-react";
import { getAdminDataAction, deleteShopAdminAction, testConnectionAction, addPlatformUpdateAction } from "@/app/actions";

function AddUpdateForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [status, setStatus] = useState<"idle" | "posting" | "done">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;
        setStatus("posting");
        await addPlatformUpdateAction({ title, content });
        setStatus("done");
        setTitle("");
        setContent("");
        setTimeout(() => setStatus("idle"), 2000);
    };

    return (
        <div className="bg-white border-2 border-concrete-900 p-6 mb-8 shadow-[4px_4px_0px_#2563eb]">
            <h3 className="font-space font-bold uppercase text-lg mb-4 flex items-center gap-2">
                <span className="text-blueprint">📢</span> Post Platform Blueprint Update
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    className="border border-concrete-900 p-2 font-bold focus:border-blueprint outline-none"
                    placeholder="Update Title (e.g. 'Login Flow Fixed')"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    className="border border-concrete-900 p-2 text-sm focus:border-blueprint outline-none min-h-[80px]"
                    placeholder="What did we build? (e.g. 'We fixed the redirection issue...')"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <button
                    disabled={status !== "idle" || !title}
                    className="bg-concrete-900 text-white font-bold uppercase py-2 hover:bg-concrete-700 disabled:opacity-50 transition-colors"
                >
                    {status === "posting" ? "Publishing..." : status === "done" ? "Published!" : "Publish Update to Founders Circle"}
                </button>
            </form>
        </div>
    );
}

export default function SuperAdminPage() {
    const [shops, setShops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [connectionStatus, setConnectionStatus] = useState<any>(null);

    const loadData = async () => {
        setLoading(true);
        const [data, conn] = await Promise.all([
            getAdminDataAction(),
            testConnectionAction() // Run the test
        ]);
        setShops(data);
        setConnectionStatus(conn);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (slug: string) => {
        if (!confirm(`ARE YOU SURE?\nThis will permanently DELETE the shop "${slug}" and all its data.\nThis cannot be undone.`)) return;

        setDeleting(slug);
        const res = await deleteShopAdminAction(slug);
        setDeleting(null);

        if (res.success) {
            // Remove from list immediately
            setShops(prev => prev.filter(s => s.slug !== slug));
        } else {
            alert("Error deleting shop: " + res.error);
        }
    };

    return (
        <div className="min-h-screen bg-concrete-100 font-work text-concrete-900 p-8">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="font-space font-bold text-3xl uppercase tracking-tighter flex items-center gap-3">
                            <ShieldAlert className="text-brick" /> Super Admin Hub
                        </h1>
                        <p className="text-steel">Global Shop Management</p>
                    </div>
                    <button
                        onClick={loadData}
                        className="bg-white border border-concrete-900 p-2 hover:bg-concrete-200 transition-colors"
                        title="Refresh Data"
                    >
                        <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                    </button>
                </div>

                {/* ADD UPDATE FORM */}
                <AddUpdateForm />

                {/* Table */}

                {/* Connection Debugger */}
                {connectionStatus && !connectionStatus.success && (
                    <div className="bg-red-50 border border-red-200 text-red-800 p-4 mb-8 rounded">
                        <h3 className="font-bold flex items-center gap-2"><ShieldAlert size={16} /> Database Connection Failed</h3>
                        <p className="font-mono text-xs mt-2 bg-white p-2 border border-red-100 rounded">
                            {connectionStatus.message}
                            <br />
                            {connectionStatus.details && <span className="text-gray-500">{connectionStatus.details}</span>}
                        </p>
                        <p className="text-sm mt-2">Check Vercel Environment Variables.</p>
                    </div>
                )}

                <div className="bg-white border-2 border-concrete-900 shadow-[8px_8px_0px_#1f2937] overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-concrete-900 text-white font-space uppercase text-sm">
                            <tr>
                                <th className="p-4 border-r border-concrete-700">Created</th>
                                <th className="p-4 border-r border-concrete-700">Slug / URL</th>
                                <th className="p-4 border-r border-concrete-700">Owner</th>
                                <th className="p-4 border-r border-concrete-700">Status</th>
                                <th className="p-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-concrete-100 text-sm">
                            {loading && shops.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-steel italic">Loading global data...</td>
                                </tr>
                            ) : shops.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-steel italic">No shops found in database.</td>
                                </tr>
                            ) : (
                                shops.map((shop) => (
                                    <tr key={shop.id} className="hover:bg-blue-50 transition-colors group">
                                        <td className="p-4 text-steel">
                                            {new Date(shop.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 font-mono font-bold text-blueprint">
                                            <a href={`/dashboard/${shop.slug}`} target="_blank" className="flex items-center gap-2 hover:underline">
                                                {shop.slug} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100" />
                                            </a>
                                        </td>
                                        <td className="p-4">
                                            <div>{shop.profile?.full_name || "Unknown"}</div>
                                            <div className="text-xs text-steel">{shop.profile?.craft}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-concrete-100 px-2 py-1 rounded text-xs font-bold uppercase border border-concrete-200">
                                                {shop.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleDelete(shop.slug)}
                                                disabled={deleting === shop.slug}
                                                className="text-steel hover:text-brick transition-colors disabled:opacity-30"
                                                title="Delete Shop"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
