import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

import WelcomeBanner   from '@/pages/dashboard/welcome-banner';
import StatsGrid       from '@/pages/dashboard/stats-grid';
import ActiveOrders    from '@/pages/dashboard/active-orders';
import OrderTracker    from '@/pages/dashboard/order-tracker';
import SchedulePickup  from '@/pages/dashboard/schedule-pickup';
import MyGarments      from '@/pages/dashboard/my-garments';
import Notifications   from '@/pages/dashboard/notifications';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-4 md:p-6">

                {/* Welcome + loyalty */}
                <WelcomeBanner />

                {/* KPI stats */}
                <StatsGrid />

                {/* Active orders + tracker */}
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <ActiveOrders />
                    </div>
                    <div className="lg:col-span-2">
                        <OrderTracker />
                    </div>
                </div>

                {/* Bottom row */}
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    <SchedulePickup />
                    <MyGarments />
                    <Notifications />
                </div>

            </div>
        </AppLayout>
    );
}