"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Film, Upload, Play, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const visualModes = [
    { id: "stock", label: "Stock Footage", icon: Film },
    { id: "ai", label: "Generado por IA", icon: ImageIcon },
    { id: "upload", label: "Subir Mío", icon: Upload },
];

export function VisualsStep() {
    const [selectedMode, setSelectedMode] = useState("ai");

    return (
        <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">

            {/* Modes */}
            <div className="flex justify-center gap-4">
                {visualModes.map((mode) => (
                    <button
                        key={mode.id}
                        onClick={() => setSelectedMode(mode.id)}
                        className={cn(
                            "flex flex-col items-center gap-2 p-4 rounded-2xl w-32 border transition-all",
                            selectedMode === mode.id
                                ? "bg-primary text-white border-primary shadow-glow"
                                : "bg-white/5 text-muted-foreground border-transparent hover:bg-white/10 hover:text-white"
                        )}
                    >
                        <mode.icon className="w-6 h-6" />
                        <span className="text-sm font-medium">{mode.label}</span>
                    </button>
                ))}
            </div>

            {/* Preview Area */}
            <div className="glass p-6 rounded-2xl border-white/10">
                <div className="aspect-video bg-black/50 rounded-xl relative overflow-hidden group">
                    {/* Fake Content */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-black/80" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform cursor-pointer group-hover:bg-primary/80 group-hover:border-primary">
                            <Play className="w-6 h-6 text-white ml-1" />
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="space-y-1">
                            <p className="text-xs font-mono text-primary animate-pulse">GENERATING SCENE 3...</p>
                            <h3 className="font-bold text-white shadow-black drop-shadow-lg">El amanecer de la IA</h3>
                        </div>
                    </div>
                </div>

                {/* Timeline Simulation */}
                <div className="mt-6 space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground font-mono">
                        <span>00:00</span>
                        <span>04:15</span>
                        <span>08:30</span>
                        <span>12:45</span>
                    </div>
                    <div className="h-12 bg-white/5 rounded-lg overflow-hidden relative flex items-center px-1 gap-1">
                        {/* Visual Segments */}
                        <div className="h-full w-1/4 bg-blue-500/20 border-r border-black/20 hover:bg-blue-500/30 transition-colors" />
                        <div className="h-full w-1/6 bg-purple-500/20 border-r border-black/20 hover:bg-purple-500/30 transition-colors relative group">
                            {/* Ad Break Marker */}
                            <div className="absolute -top-1 right-0 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-yellow-500" />
                            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/80 text-yellow-400 text-[10px] px-2 py-1 rounded whitespace-nowrap">
                                Ad Break Sugerido
                            </div>
                        </div>
                        <div className="h-full w-1/3 bg-indigo-500/20 border-r border-black/20 hover:bg-indigo-500/30 transition-colors" />

                        {/* Playhead */}
                        <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-red-500 shadow-[0_0_10px_red]" />
                    </div>
                </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm">
                <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="font-semibold text-blue-400">Sugerencia de Monetización</p>
                    <p className="text-muted-foreground">La IA ha identificado 3 puntos naturales para insertar anuncios sin interrumpir la narrativa. Esto podría aumentar tu RPM en un 15%.</p>
                </div>
            </div>

        </div>
    );
}
