"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wand2, BookOpen, MessageCircle, Lightbulb, Youtube, Film } from "lucide-react";
import { cn } from "@/lib/utils";

const vibes = [
    { id: "informative", label: "Informativo", emoji: "📚" },
    { id: "dramatic", label: "Dramático", emoji: "🎭" },
    { id: "humorous", label: "Humorístico", emoji: "😂" },
    { id: "motivational", label: "Motivacional", emoji: "🚀" },
];

const transformations = [
    {
        id: "analysis",
        icon: Lightbulb,
        title: "Análisis Detallado",
        desc: "Guiones profundos (15-20 min) para máxima retención.",
        badge: "Alta Retención"
    },
    {
        id: "documentary",
        icon: Film,
        title: "Documental / Ensayo",
        desc: "Estructura optimizada para mid-roll ads y alta densidad.",
        badge: "Monetización"
    },
    {
        id: "guide",
        icon: BookOpen,
        title: "Guía Completa",
        desc: "Tutoriales paso a paso (+10 min) optimizados.",
        badge: "SEO"
    },
    {
        id: "story",
        icon: MessageCircle,
        title: "Narrativa / Historia",
        desc: "Mantiene el suspenso y la curiosidad del espectador.",
        badge: "Viral"
    }
];

export function ScriptStep() {
    const [topic, setTopic] = useState("");
    const [selectedVibe, setSelectedVibe] = useState("informative");
    const [selectedTransform, setSelectedTransform] = useState("analysis");

    return (
        <div className="space-y-8 animate-in slide-in-from-right-8 fade-in duration-500">

            {/* Topic Input */}
            <section className="space-y-4">
                <label className="text-lg font-semibold flex items-center gap-2 text-white">
                    <Youtube className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
                    Tema del Video
                </label>
                <div className="relative group">
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Ej: La historia secreta de la Inteligencia Artificial..."
                        className="w-full input-dark rounded-2xl p-6 text-xl transition-all placeholder:text-muted-foreground/30 focus:outline-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-primary/20 rounded-lg text-primary cursor-pointer hover:bg-primary hover:text-white transition-colors shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                        <Wand2 className="w-5 h-5" />
                    </div>
                </div>
            </section>

            {/* Vibe Selector */}
            <section className="space-y-4">
                <label className="text-lg font-semibold text-white">Tono y Vibe</label>
                <div className="flex flex-wrap gap-3">
                    {vibes.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setSelectedVibe(v.id)}
                            className={cn(
                                "px-6 py-3 rounded-full font-medium transition-all text-sm flex items-center gap-2 border",
                                selectedVibe === v.id
                                    ? "bg-black border-primary text-white shadow-[0_0_15px_-3px_rgba(139,92,246,0.8)]"
                                    : "bg-black border-white/10 text-muted-foreground hover:border-white/30 hover:text-white"
                            )}
                        >
                            <span>{v.emoji}</span>
                            {v.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Transformation Options */}
            <section className="space-y-4">
                <label className="text-lg font-semibold text-white">Estructura & Formato IA</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {transformations.map((t) => (
                        <div
                            key={t.id}
                            onClick={() => setSelectedTransform(t.id)}
                            className={cn(
                                "relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 group overflow-hidden bg-card",
                                selectedTransform === t.id
                                    ? "border-primary shadow-[0_0_20px_-5px_rgba(139,92,246,0.5)]"
                                    : "border-white/5 hover:border-white/20"
                            )}
                        >
                            {/* Selection Indicator */}
                            {selectedTransform === t.id && (
                                <div className="absolute inset-0 border-2 border-primary/50 rounded-2xl pointer-events-none" />
                            )}

                            <div className="flex items-start justify-between mb-3">
                                <div className={cn("p-3 rounded-xl transition-colors", selectedTransform === t.id ? "bg-primary/20 text-primary" : "bg-white/5 text-muted-foreground group-hover:text-white")}>
                                    <t.icon className="w-6 h-6" />
                                </div>
                                <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border", selectedTransform === t.id ? "bg-primary/10 border-primary/30 text-primary" : "bg-black border-white/10 text-muted-foreground")}>
                                    {t.badge}
                                </span>
                            </div>

                            <h3 className={cn("text-lg font-bold mb-1", selectedTransform === t.id ? "text-white" : "text-gray-300")}>
                                {t.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">{t.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
