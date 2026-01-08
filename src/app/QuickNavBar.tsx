"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function QuickNavBar() {
    const pathname = usePathname();

    const links = [
        { num: 1, label: "Home", href: "/" },
        { num: 2, label: "Claim", href: "/claim" },
        { num: 3, label: "Onboard", href: "/onboarding" },
        { num: 4, label: "Dash", href: "/office" }, // Using Office as Dash entry
        { num: 5, label: "Coach", href: "/coach" },
        { num: 6, label: "Founders", href: "/founders-circle" },
        { num: 7, label: "Vision", href: "/vision" },
        { num: 8, label: "Lobby", href: "/office" },
        { num: 9, label: "Admin", href: "/super-admin" },
    ];

    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-concrete-900/90 backdrop-blur-sm text-white text-[10px] font-mono border-b border-white/10 flex items-center justify-center gap-4 py-2 overflow-x-auto print:hidden">
            <span className="opacity-50 font-bold uppercase tracking-widest hidden md:inline">Quick Nav:</span>
            {links.map((l) => (
                <Link
                    key={l.num}
                    href={l.href}
                    className={`flex items-center gap-1 px-2 py-1 rounded transition-colors uppercase font-bold
                    ${pathname === l.href
                            ? 'bg-blueprint text-white'
                            : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                >
                    <span className="opacity-50">{l.num}.</span> {l.label}
                </Link>
            ))}
        </div>
    );
}
