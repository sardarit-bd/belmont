import { Head, Link, router } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

import StatsGrid      from '@/pages/dashboard/stats-grid';
import SchedulePickup from '@/pages/dashboard/schedule-pickup';
import MyGarments     from '@/pages/dashboard/my-garments';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

const POLL_INTERVAL = 15000;

export default function Dashboard() {
    useEffect(() => {
        const id = setInterval(() => {
            router.reload({
                only:           ['activeSchedules', 'stats', 'myGarments'],
                preserveScroll: true,
                preserveState:  true,
            });
        }, POLL_INTERVAL);
        return () => clearInterval(id);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="min-h-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">

                    {/* ── Welcome strip ── */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Dashboard
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Welcome back — here's what's happening with your laundry.
                            </p>
                        </div>
                        <Link
                            href="/checkrate"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                            >
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            New Pickup
                        </Link>
                    </div>

                    {/* ── Stats ── */}
                    <StatsGrid />

                    {/* ── Upcoming Pickups + My Garments ── */}
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <SchedulePickup />
                        <MyGarments />
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}