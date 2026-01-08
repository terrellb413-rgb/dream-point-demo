import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Image as ImageIcon, Settings, ExternalLink } from "lucide-react";

export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const navItems = [
        { label: "Overview", href: `/dashboard/${slug}`, icon: LayoutDashboard },
        { label: "Services", href: `/dashboard/${slug}/services`, icon: ShoppingBag },
        { label: "Portfolio", href: `/dashboard/${slug}/portfolio`, icon: ImageIcon },
        { label: "Shop Settings", href: `/dashboard/${slug}/settings`, icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-concrete-100 flex font-work text-concrete-900">

            {/* Sidebar: "The Office" */}
            <aside className="w-64 bg-concrete-900 text-white min-h-screen border-r border-concrete-900 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-800">
                    <div className="font-space font-bold tracking-tight uppercase text-lg">DreamPoint</div>
                    <div className="text-xs text-concrete-100 opacity-50 uppercase tracking-widest mt-1">Back Office</div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 rounded-sm hover:bg-concrete-100 hover:text-concrete-900 transition-colors font-bold text-sm uppercase tracking-wide group"
                        >
                            <item.icon size={18} className="group-hover:text-blueprint transition-colors" />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <Link
                        href={`/shop/${slug}`}
                        className="flex items-center gap-2 justify-center w-full bg-blueprint text-white font-bold uppercase text-xs py-3 rounded-sm hover:bg-blue-600 transition-colors"
                    >
                        View Live Shop <ExternalLink size={14} />
                    </Link>
                </div>
            </aside>

            {/* Main Content: " The Workbench" */}
            <main className="flex-1">
                <header className="md:hidden bg-concrete-900 text-white p-4 flex justify-between items-center sticky top-0 z-10">
                    <div className="font-space font-bold uppercase">DreamPoint</div>
                    <button className="text-sm font-bold uppercase bg-concrete-100 text-concrete-900 px-3 py-1 rounded-sm">Menu</button>
                </header>
                <div className="p-8 max-w-5xl mx-auto">
                    {children}
                </div>
            </main>

        </div>
    );
}
