import AppLayout from "@/components/layout/AppLayout";

export default function CreateLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AppLayout>
            {children}
        </AppLayout>
    );
}
