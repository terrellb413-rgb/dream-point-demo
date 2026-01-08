"use client";

import { useState } from "react";
import { incrementEngagementAction } from "@/app/actions";
import { Check } from "lucide-react";
import { clsx } from "clsx";

export default function ShareButton() {
    const [shared, setShared] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleShare = async () => {
        if (shared || loading) return;

        setLoading(true);
        try {
            // In a real app, we'd get the actual username from session
            // For now, we target the 'demo' user for the impact ranking demo
            await incrementEngagementAction("demo");
            setShared(true);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleShare}
            disabled={shared || loading}
            className={clsx(
                "w-full border-2 py-3 font-bold uppercase transition-all flex items-center justify-center gap-2",
                shared
                    ? "bg-blueprint border-blueprint text-white cursor-default"
                    : "border-concrete-900 text-concrete-900 hover:bg-concrete-900 hover:text-white"
            )}
        >
            {shared ? (
                <>
                    Shared! ✨
                    <Check size={18} />
                </>
            ) : (
                loading ? "Processing..." : "I Shared It"
            )}
        </button>
    );
}
