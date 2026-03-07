import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import PickupButton from '@/components/shared/PickupButton';
import { I18nProvider } from '@/contexts/I18nContext';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({ children }: AppLayoutProps) {
    return (
        <I18nProvider>
            <AppShell>
                <Header />
                <AppContent>{children}</AppContent>
                <Footer />
                <PickupButton />
            </AppShell>
        </I18nProvider>
    );
}