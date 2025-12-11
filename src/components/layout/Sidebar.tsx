"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Video, Wand2, Music, Download, Settings, Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: Video, label: "Crear Video", href: "/create" },
    // These seem to be steps in the wizard, but the request asks for them in sidebar too?
    // "Opciones principales: Dashboard, Crear Video, Visual & Voz, Audio, Exportar"
    // Assuming these might be for navigating *within* a project or just direct tool access.
    // For now I will strictly follow "Opciones principales: Dashboard, Crear Video, Visual & Voz, Audio, Exportar"
    { icon: Wand2, label: "Visual & Voz", href: "/visuals" }, // Interpreting "Visual & Voz"
    { icon: Music, label: "Audio", href: "/audio" },
    { icon: Download, label: "Exportar", href: "/export" },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            className="w-64 h-screen bg-background border-r border-white/5 flex flex-col fixed left-0 top-0 z-40"
        >
            <div className="p-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <Film className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading font-bold text-xl tracking-tight">LumiGen</span>
            </div>

            <nav className="flex-1 px-4 space-y-2 mt-4">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                                isActive
                                    ? "text-white"
                                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            <Icon className={cn("w-5 h-5 relative z-10", isActive ? "text-primary" : "group-hover:text-white")} />
                            <span className="font-medium relative z-10">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-white transition-colors w-full rounded-xl hover:bg-white/5">
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Ajustes</span>
                </button>
            </div>
        </motion.aside>
    );
}
