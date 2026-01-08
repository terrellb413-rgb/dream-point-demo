"use client";

import { Trash2 } from "lucide-react";
import { resetShopAction } from "../actions";
import { useRouter } from "next/navigation";

export default function DeleteShopButton({ slug }: { slug: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (confirm(`Are you sure you want to revoke the permit for "${slug}"? This cannot be undone.`)) {
            await resetShopAction(slug);
            router.refresh();
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-transparent hover:border-red-200"
            title="Revoke Permit"
        >
            <Trash2 size={16} />
        </button>
    );
}
