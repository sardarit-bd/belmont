import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
}: AppLayoutProps) {
    return (
        <AppShell>
            <Header />
            <AppContent>{children}</AppContent>
            <Footer />
        </AppShell>
    );
}
