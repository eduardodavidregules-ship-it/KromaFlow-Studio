"use client";

import { Bell, Search } from "lucide-react";

export function Header() {
    return (
        <header className="h-20 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8 text-white">
            <div className="w-96">
                {/* Placeholder for search or breadcrumbs if needed */}
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar proyectos..."
                        className="w-full bg-white/5 border border-white/5 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="flex flex-col items-end">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Créditos</span>
                    <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-secondary w-[85%]" />
                        </div>
                        <span className="text-sm font-bold text-white">85/100</span>
                    </div>
                </div>

                <button className="relative p-2 text-muted-foreground hover:text-white transition-colors">
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <Bell className="w-5 h-5" />
                </button>

                <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-glow hover:scale-105 active:scale-95">
                    Pro Plan
                </button>

                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary p-[2px]">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                    </div>
                </div>
            </div>
        </header>
    );
}
