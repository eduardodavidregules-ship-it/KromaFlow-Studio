"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Wand2 } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { ScriptStep } from "./steps/ScriptStep";
import { VisualsStep } from "./steps/VisualsStep";
import { AudioStep } from "./steps/AudioStep";
import { ExportStep } from "./steps/ExportStep";

export default function WizardContainer() {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <ScriptStep />;
            case 2:
                return <VisualsStep />;
            case 3:
                return <AudioStep />;
            case 4:
                return <ExportStep />;
            default:
                return <div>Error</div>;
        }
    };

    return (
        <div className="max-w-5xl mx-auto w-full">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

            <div className="glass rounded-[32px] p-8 md:p-12 min-h-[600px] flex flex-col relative overflow-hidden">

                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="flex-1 relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/5 relative z-10">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors ${currentStep === 1
                            ? "opacity-50 cursor-not-allowed text-muted-foreground"
                            : "text-white hover:bg-white/5"
                            }`}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Atrás
                    </button>

                    <button
                        onClick={nextStep}
                        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl font-bold transition-all shadow-glow hover:scale-105 active:scale-95 group"
                    >
                        {currentStep === totalSteps ? (
                            <>
                                Exportar Video
                                <Wand2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </>
                        ) : (
                            <>
                                Siguiente Paso
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
