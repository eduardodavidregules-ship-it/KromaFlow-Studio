"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Mic, Music as MusicIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const voices = [
    { id: 1, name: "Marcus", style: "Profundo & Serio", lang: "EN", gender: "Male" },
    { id: 2, name: "Sarah", style: "Narrativa & Suave", lang: "EN", gender: "Female" },
    { id: 3, name: "Mateo", style: "Enérgico & Joven", lang: "ES", gender: "Male" },
    { id: 4, name: "Lucía", style: "Profesional & Claro", lang: "ES", gender: "Female" },
];

const music = [
    { id: 1, name: "Cyberpunk City", genre: "Synthwave", duration: "3:45" },
    { id: 2, name: "Deep Focus", genre: "Ambient", duration: "5:20" },
    { id: 3, name: "Epic Rise", genre: "Cinematic", duration: "2:30" },
];

export function AudioStep() {
    const [selectedVoice, setSelectedVoice] = useState(3);
    const [selectedMusic, setSelectedMusic] = useState(1);
    const [playing, setPlaying] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-right-8 fade-in duration-500">

            {/* Voice Selection */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Mic className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold">Voz Narrativa</h2>
                </div>

                <div className="space-y-3">
                    {voices.map((voice) => (
                        <div
                            key={voice.id}
                            onClick={() => setSelectedVoice(voice.id)}
                            className={cn(
                                "p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all group",
                                selectedVoice === voice.id
                                    ? "bg-primary/10 border-primary shadow-glow"
                                    : "bg-white/5 border-white/5 hover:bg-white/10"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <button
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setPlaying(playing === voice.id ? null : voice.id);
                                    }}
                                >
                                    {playing === voice.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                </button>
                                <div>
                                    <div className="font-bold flex items-center gap-2">
                                        {voice.name}
                                        <span className="text-[10px] uppercase bg-white/10 px-1.5 py-0.5 rounded text-muted-foreground">{voice.lang}</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">{voice.style}</div>
                                </div>
                            </div>
                            {selectedVoice === voice.id && (
                                <motion.div layoutId="voice-check" className="w-3 h-3 bg-primary rounded-full box-content border-4 border-background" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Music Selection */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <MusicIcon className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold">Música de Fondo</h2>
                </div>

                <div className="space-y-3">
                    {music.map((track) => (
                        <div
                            key={track.id}
                            onClick={() => setSelectedMusic(track.id)}
                            className={cn(
                                "p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                                selectedMusic === track.id
                                    ? "bg-secondary/10 border-secondary shadow-lg shadow-black/20"
                                    : "bg-white/5 border-white/5 hover:bg-white/10"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                                    <Play className="w-3 h-3" />
                                </button>
                                <div>
                                    <div className="font-bold text-sm">{track.name}</div>
                                    <div className="text-xs text-muted-foreground">{track.genre} • {track.duration}</div>
                                </div>
                            </div>
                            {selectedMusic === track.id && (
                                <motion.div layoutId="music-check" className="w-3 h-3 bg-secondary rounded-full box-content border-4 border-background" />
                            )}
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}
