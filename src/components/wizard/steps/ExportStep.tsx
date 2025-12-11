"use client";

import { motion } from "framer-motion";
import { Check, Settings, Download, Share2 } from "lucide-react";

export function ExportStep() {
    return (
        <div className="max-w-2xl mx-auto text-center space-y-10 animate-in slide-in-from-bottom-8 fade-in duration-500">

            <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-bold font-heading mb-2">¡Todo listo para crear!</h2>
                <p className="text-muted-foreground">Revisamos tu configuración y todo parece estar en orden.</p>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-left space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-muted-foreground">Formato</span>
                    <span className="font-semibold text-white">4K Ultra HD (3840x2160)</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-muted-foreground">Duración Estimada</span>
                    <span className="font-semibold text-white">12-15 Minutos</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-muted-foreground">Voz Narrativa</span>
                    <span className="font-semibold text-white">Mateo (ES)</span>
                </div>
                <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Monetización</span>
                    <span className="text-green-400 font-bold flex items-center gap-1">
                        Optimizada (3 Ad Breaks)
                    </span>
                </div>
            </div>

            <div className="flex justify-center gap-4">
                <button className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 flex items-center gap-2 transition-colors">
                    <Settings className="w-5 h-5" />
                    Ajustes Avanzados
                </button>
            </div>

        </div>
    );
}
