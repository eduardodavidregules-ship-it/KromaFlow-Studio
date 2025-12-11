"use client";

import { motion } from "framer-motion";
import { Video, Clock, HardDrive, Plus, MoreVertical, Play } from "lucide-react";

const stats = [
    { label: "Videos Creados", value: "12", icon: Video, color: "text-primary", bg: "bg-primary/10" },
    { label: "Horas Generadas", value: "4.5h", icon: Clock, color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Almacenamiento", value: "12GB", icon: HardDrive, color: "text-purple-400", bg: "bg-purple-400/10" },
];

const recentVideos = [
    { id: 1, title: "Historia de la IA", duration: "12:30", status: "Completado", date: "Hace 2 horas", thumb: "bg-gradient-to-br from-purple-900 to-slate-900" },
    { id: 2, title: "Top 10 Gadgets 2024", duration: "08:15", status: "Procesando", date: "Hace 5 horas", thumb: "bg-gradient-to-br from-blue-900 to-slate-900" },
    { id: 3, title: "Meditación Guiada", duration: "25:00", status: "Borrador", date: "Ayer", thumb: "bg-gradient-to-br from-teal-900 to-slate-900" },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Bienvenido de nuevo</h1>
                    <p className="text-muted-foreground mt-1">Aquí tienes un resumen de tu actividad creativa.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-medium transition-all shadow-glow hover:scale-105 active:scale-95">
                    <Plus className="w-5 h-5" />
                    Nuevo Video
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass p-6 rounded-2xl flex items-center gap-4 hover:bg-white/5 transition-colors group"
                    >
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <div className="text-2xl font-bold font-heading">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Videos Recientes</h2>
                    <button className="text-sm text-primary hover:text-primary-hover transition-colors">Ver todos</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentVideos.map((video, index) => (
                        <motion.div
                            key={video.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="glass rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-300"
                        >
                            <div className={`h-40 ${video.thumb} relative p-4 flex flex-col justify-between group-hover:brightness-110 transition-all`}>
                                <div className="self-end">
                                    <span className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-md text-xs font-medium border border-white/10">
                                        {video.duration}
                                    </span>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[1px]">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform cursor-pointer">
                                        <Play className="w-5 h-5 text-white ml-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 space-y-3">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-1">{video.title}</h3>
                                    <button className="text-muted-foreground hover:text-white transition-colors">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <span>{video.date}</span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${video.status === 'Completado' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                            video.status === 'Procesando' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                        }`}>
                                        {video.status}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
