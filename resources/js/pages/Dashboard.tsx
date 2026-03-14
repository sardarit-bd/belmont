import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

import StatsGrid      from '@/pages/dashboard/stats-grid';
import ActiveOrders   from '@/pages/dashboard/active-orders';
import OrderTracker   from '@/pages/dashboard/order-tracker';
import SchedulePickup from '@/pages/dashboard/schedule-pickup';
import MyGarments     from '@/pages/dashboard/my-garments';
import Notifications  from '@/pages/dashboard/notifications';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

const POLL_INTERVAL = 15000; // 15 seconds

export default function Dashboard() {
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({
                only: ['activeSchedules', 'trackerSchedule', 'stats', 'notifications', 'unreadCount'],
                preserveScroll: true,
                preserveState:  true,
            });
        }, POLL_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-4 md:p-6">

                <StatsGrid />

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
                    <div className="lg:col-span-3">
                        <ActiveOrders
                            selectedOrderId={selectedOrderId}
                            onSelectOrder={setSelectedOrderId}
                        />
                    </div>
                    <div className="lg:col-span-2">
                        <OrderTracker selectedOrderId={selectedOrderId} />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2">
                    <SchedulePickup />
                    <MyGarments />
                    {/* <Notifications /> */}
                </div>

            </div>
        </AppLayout>
    );
}