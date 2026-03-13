import { usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

interface OrderItem {
    name:        string;
    quantity:    number;
    unit_price:  number;
    total_price: number;
}

interface Schedule {
    id:                string;
    status:            string;
    status_label:      string;
    status_color:      string;
    payment_status:    string;
    pickup_date:       string;
    preferred_time:    string;
    full_address:      string;
    next_status:       string | null;
    next_status_label: string | null;
    is_terminal:       boolean;
    items_count:       number;
    items:             OrderItem[];
}

interface PageProps {
    activeSchedules: Schedule[];
    stats: {
        total:     number;
        completed: number;
        pending:   number;
    };
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
    pending:          'bg-gray-50 text-gray-600',
    confirmed:        'bg-blue-50 text-blue-600',
    picked_up:        'bg-amber-50 text-amber-700',
    being_cleaned:    'bg-purple-50 text-purple-700',
    out_for_delivery: 'bg-orange-50 text-orange-700',
    delivered:        'bg-emerald-50 text-emerald-700',
    cancelled:        'bg-red-50 text-red-600',
};

function OrderRow({ schedule }: { schedule: Schedule }) {
    const icon        = STATUS_ICONS[schedule.status] ?? '📦';
    const badgeClass  = STATUS_BADGE[schedule.status] ?? 'bg-gray-50 text-gray-600';
    const itemSummary = schedule.items.length > 0
        ? schedule.items.map(i => `${i.quantity}× ${i.name}`).join(', ')
        : `${schedule.items_count} item(s)`;

    return (
        <div className="flex cursor-pointer items-center gap-4 border-b border-[#ede7da] px-6 py-4 last:border-0 hover:bg-[#f7f3ec] transition-colors">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f3ec] text-2xl">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[#0d1b2a] truncate">{itemSummary}</div>
                <div className="mt-0.5 text-[11px] text-[#8a9bb0]">
                    #{schedule.id.slice(0, 8).toUpperCase()} · {schedule.pickup_date} at {schedule.preferred_time}
                </div>
            </div>
            <div className="text-right shrink-0">
                <div className="text-[11px] text-[#8a9bb0] mb-1">{schedule.full_address}</div>
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeClass}`}>
                    {schedule.status_label}
                </span>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="text-5xl mb-4">🧺</div>
            <p className="text-sm font-medium text-[#0d1b2a] mb-1">No active orders</p>
            <p className="text-xs text-[#8a9bb0] mb-4">Schedule a pickup to get started</p>
            <Link
                href="/check-rates"
                className="rounded-full bg-[#0d1b2a] px-5 py-2 text-xs font-semibold text-white hover:bg-[#1a2e45] transition-colors"
            >
                Schedule Pickup
            </Link>
        </div>
    );
}

export default function ActiveOrders() {
    const { activeSchedules } = usePage<{ activeSchedules: Schedule[] }>().props;

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white h-full flex flex-col">
            <div className="flex items-center justify-between border-b border-[#ede7da] px-6 py-5">
                <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#0d1b2a]">Active Orders</span>
                    {activeSchedules.length > 0 && (
                        <span className="rounded-full bg-[#0d1b2a] px-2 py-0.5 text-[10px] font-bold text-white">
                            {activeSchedules.length}
                        </span>
                    )}
                </div>
                <Link href="/schedule" className="text-xs font-medium text-[#c9a84c] hover:underline">
                    + New Pickup
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto">
                {activeSchedules.length === 0 ? (
                    <EmptyState />
                ) : (
                    activeSchedules.map((schedule) => (
                        <OrderRow key={schedule.id} schedule={schedule} />
                    ))
                )}
            </div>
        </div>
    );
}