"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ProgressBarProps {
    currentStep: number; // 1-indexed
    totalSteps: number;
}

const steps = [
    "Guion & Tema",
    "Visuales",
    "Audio",
    "Exportar"
];

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="relative">
                {/* Background Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full" />

                {/* Active Line (Animated) */}
                <motion.div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-primary to-secondary -translate-y-1/2 rounded-full box-shadow-glow"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />

                {/* Steps */}
                <div className="relative flex justify-between">
                    {steps.map((label, index) => {
                        const stepNum = index + 1;
                        const isActive = stepNum <= currentStep;
                        const isCompleted = stepNum < currentStep;

                        return (
                            <div key={label} className="flex flex-col items-center gap-3">
                                <motion.div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10
                    ${isActive
                                            ? "bg-black border-primary shadow-[0_0_15px_rgba(139,92,246,0.8)] scale-110"
                                            : "bg-black border-white/10 text-muted-foreground"
                                        }
                  `}
                                    initial={false}
                                    animate={{
                                        scale: isActive ? 1.1 : 1,
                                        borderColor: isActive ? "#A855F7" : "rgba(255,255,255,0.1)",
                                    }}
                                >
                                    {isCompleted ? (
                                        <Check className="w-5 h-5 text-primary drop-shadow-[0_0_5px_rgba(139,92,246,0.8)]" />
                                    ) : (
                                        <span className={`text-sm font-bold ${isActive ? "text-white" : "text-muted-foreground"}`}>
                                            {stepNum}
                                        </span>
                                    )}
                                </motion.div>
                                <span className={`text-sm font-medium ${isActive ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-muted-foreground"}`}>
                                    {label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
