import { usePage, Link } from '@inertiajs/react';

interface Schedule {
    id:             string;
    order_number:   string;
    status:         string;
    status_label:   string;
    status_color:   string;
    payment_status: string;
    pickup_date:    string;
    preferred_time: string;
    full_address:   string;
    items_count:    number;
    items:          { name: string; quantity: number }[];
}

const STATUS_ICONS: Record<string, string> = {
    pending:          '⏳',
    confirmed:        '✅',
    picked_up:        '🚗',
    being_cleaned:    '🧺',
    out_for_delivery: '🚚',
    delivered:        '🎉',
    cancelled:        '❌',
};

const STATUS_BADGE: Record<string, string> = {
    pending:          'bg-gray-50 text-gray-500 border-gray-200',
    confirmed:        'bg-blue-50 text-blue-600 border-blue-100',
    picked_up:        'bg-amber-50 text-amber-700 border-amber-100',
    being_cleaned:    'bg-purple-50 text-purple-700 border-purple-100',
    out_for_delivery: 'bg-orange-50 text-orange-700 border-orange-100',
    delivered:        'bg-emerald-50 text-emerald-700 border-emerald-100',
    cancelled:        'bg-red-50 text-red-600 border-red-100',
};

function UpcomingCard({ schedule }: { schedule: Schedule }) {
    const icon       = STATUS_ICONS[schedule.status] ?? '📦';
    const badgeClass = STATUS_BADGE[schedule.status] ?? 'bg-gray-50 text-gray-500 border-gray-200';
    const summary    = schedule.items.length > 0
        ? schedule.items.map(i => `${i.quantity}× ${i.name}`).join(', ')
        : `${schedule.items_count} item(s)`;

    return (
        <div className="rounded-xl border border-[#ede7da] bg-[#f7f3ec] p-4 transition-all hover:shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                        {icon}
                    </div>
                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-[#0d1b2a]">
                            {schedule.pickup_date}
                        </div>
                        <div className="mt-0.5 text-[11px] text-[#8a9bb0]">
                            {schedule.preferred_time}
                        </div>
                    </div>
                </div>
                <span className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeClass}`}>
                    {schedule.status_label}
                </span>
            </div>

            <div className="mt-3 border-t border-[#ede7da] pt-3">
                <p className="truncate text-xs text-[#8a9bb0]">{summary}</p>
                <p className="mt-1 truncate text-[11px] text-[#8a9bb0]">
                    📍 {schedule.full_address}
                </p>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-xs font-medium text-[#c9a84c]">
                    #{schedule.order_number}
                </span>
                <span className={`text-[11px] font-medium ${
                    schedule.payment_status === 'confirmed'
                        ? 'text-emerald-600'
                        : schedule.payment_status === 'failed'
                            ? 'text-red-500'
                            : 'text-amber-600'
                }`}>
                    {schedule.payment_status === 'confirmed' ? '✓ Paid' : schedule.payment_status === 'failed' ? '✗ Failed' : '⏳ Pending'}
                </span>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f7f3ec] text-3xl">
                📅
            </div>
            <p className="text-sm font-medium text-[#0d1b2a]">No upcoming pickups</p>
            <p className="mt-1 text-xs text-[#8a9bb0]">Ready for fresh, clean garments?</p>
            <Link
                href="/checkrate"
                className="mt-4 rounded-full bg-[#0d1b2a] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1a2e45]"
            >
                Schedule a Pickup
            </Link>
        </div>
    );
}

export default function SchedulePickup() {
    const { activeSchedules } = usePage<{ activeSchedules: Schedule[] }>().props;

    // Show upcoming — confirmed but not yet picked up
    const upcoming = activeSchedules.filter(s =>
        ['pending', 'confirmed'].includes(s.status)
    );

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white">
            <div className="flex items-center justify-between border-b border-[#ede7da] px-6 py-5">
                <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#0d1b2a]">Upcoming Pickups</span>
                    {upcoming.length > 0 && (
                        <span className="rounded-full bg-[#0d1b2a] px-2 py-0.5 text-[10px] font-bold text-white">
                            {upcoming.length}
                        </span>
                    )}
                </div>
                <Link
                    href="/checkrate"
                    className="text-xs font-medium text-[#c9a84c] hover:underline"
                >
                    + New
                </Link>
            </div>

            <div className="px-6 py-5">
                {upcoming.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="flex flex-col gap-3">
                        {upcoming.map(schedule => (
                            <UpcomingCard key={schedule.id} schedule={schedule} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}