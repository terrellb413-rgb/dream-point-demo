"use client";

import { useState } from "react";
import { addPlatformUpdateAction } from "@/app/actions";
import { Send, Megaphone } from "lucide-react";

export default function PlatformUpdateForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content || loading) return;

        setLoading(true);
        try {
            await addPlatformUpdateAction({ title, content });
            setTitle("");
            setContent("");
            alert("Update posted successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to post update.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-concrete-900 text-white p-6 shadow-[8px_8px_0px_#2563eb] mb-8">
            <h2 className="font-space font-bold uppercase text-xl mb-4 flex items-center gap-2">
                <Megaphone size={20} className="text-blueprint" /> Post Platform Update
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        placeholder="Update Title (e.g. New Feature: Calendar)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 bg-white text-concrete-900 font-bold outline-none border-2 border-transparent focus:border-blueprint"
                    />
                </div>
                <div>
                    <textarea
                        placeholder="What's happening? Be visionary."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={3}
                        className="w-full p-3 bg-white text-concrete-900 font-medium text-sm outline-none border-2 border-transparent focus:border-blueprint resize-none"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blueprint text-white font-space font-bold uppercase py-3 hover:bg-white hover:text-blueprint transition-all disabled:opacity-50"
                >
                    {loading ? "Posting..." : "Broadcast Update"}
                </button>
            </form>
        </div>
    );
}
