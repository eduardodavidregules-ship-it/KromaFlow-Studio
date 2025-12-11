import WizardContainer from "@/components/wizard/WizardContainer";

export default function CreatePage() {
    return (
        <div className="py-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">
                    Nuevo Proyecto
                </h1>
                <p className="text-muted-foreground text-lg">
                    Crea videos virales de alta retención en minutos.
                </p>
            </div>

            <WizardContainer />
        </div>
    );
}
