import { usePage, Link } from '@inertiajs/react';

interface OrderItem {
    name:        string;
    quantity:    number;
    unit_price:  number;
    total_price: number;
}

interface Schedule {
    id:                string;
    order_number:      string;
    status:            string;
    status_label:      string;
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

interface Props {
    selectedOrderId: string | null;
    onSelectOrder:   (id: string) => void;
}

// ─── Status config ──────────────────────────────────────────────────────────

const STATUS_ICONS: Record<string, string> = {
    pending:          '⏳',
    confirmed:        '✅',
    picked_up:        '🚗',
    being_cleaned:    '🧺',
    out_for_delivery: '🚚',
    delivered:        '🎉',
    cancelled:        '❌',
};

// [icon bg, pill bg, pill text, pill border]
const STATUS_STYLE: Record<string, [string, string, string, string]> = {
    pending:          ['#F1F5F9', '#F1F5F9', '#475569', '#E2E8F0'],
    confirmed:        ['#EFF6FF', '#DBEAFE', '#1D4ED8', '#BFDBFE'],
    picked_up:        ['#FFFBEB', '#FEF3C7', '#B45309', '#FDE68A'],
    being_cleaned:    ['#F5F3FF', '#EDE9FE', '#6D28D9', '#DDD6FE'],
    out_for_delivery: ['#FFF7ED', '#FFEDD5', '#C2410C', '#FED7AA'],
    delivered:        ['#ECFDF5', '#D1FAE5', '#065F46', '#A7F3D0'],
    cancelled:        ['#FEF2F2', '#FEE2E2', '#B91C1C', '#FECACA'],
};

// ─── Sub-components ─────────────────────────────────────────────────────────

function OrderRow({
    schedule,
    isSelected,
    onSelect,
}: {
    schedule:   Schedule;
    isSelected: boolean;
    onSelect:   () => void;
}) {
    const icon                                    = STATUS_ICONS[schedule.status] ?? '📦';
    const [iconBg, pillBg, pillText, pillBorder]  = STATUS_STYLE[schedule.status] ?? STATUS_STYLE.pending;
    const itemSummary                             = schedule.items.length > 0
        ? schedule.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')
        : `${schedule.items_count} item(s)`;

    return (
        <button
            type="button"
            onClick={onSelect}
            className={[
                'flex w-full items-center gap-3 border-b border-slate-100 px-5 py-4 text-left',
                'transition-all duration-150 last:border-b-0',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500',
                isSelected
                    ? 'border-l-[3px] border-l-blue-600 bg-gradient-to-r from-blue-50 to-purple-50'
                    : 'hover:bg-slate-50',
            ].join(' ')}
            aria-pressed={isSelected}
            aria-label={`Select order ${schedule.order_number}`}
        >
            {/* Status icon */}
            <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl transition-colors"
                style={{ background: isSelected ? '#DBEAFE' : iconBg }}
                aria-hidden="true"
            >
                {icon}
            </div>

            {/* Order info */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{itemSummary}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                    #{schedule.order_number} · {schedule.pickup_date} at {schedule.preferred_time}
                </p>
            </div>

            {/* Right: address + badge */}
            <div className="hidden shrink-0 text-right sm:block">
                <p className="mb-1.5 max-w-[130px] truncate text-[11px] text-slate-400">
                    📍 {schedule.full_address}
                </p>
                <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                    style={{
                        background:   pillBg,
                        color:        pillText,
                        border:       `1px solid ${pillBorder}`,
                    }}
                >
                    {schedule.status_label}
                </span>
            </div>

            {/* Mobile-only badge */}
            <div className="shrink-0 sm:hidden">
                <span
                    className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                    style={{
                        background: pillBg,
                        color:      pillText,
                        border:     `1px solid ${pillBorder}`,
                    }}
                >
                    {schedule.status_label}
                </span>
            </div>
        </button>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 text-3xl">
                🧺
            </div>
            <p className="text-sm font-semibold text-slate-700">No active orders</p>
            <p className="mt-1 text-xs text-slate-400">Schedule a pickup to get started</p>
            <Link
                href="/checkrate"
                className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-200 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
                <span aria-hidden="true">＋</span>
                Schedule Pickup
            </Link>
        </div>
    );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function ActiveOrders({ selectedOrderId, onSelectOrder }: Props) {
    const { activeSchedules } = usePage<{ activeSchedules: Schedule[] }>().props;

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-2.5">
                    {/* Icon pill */}
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-base" aria-hidden="true">
                        📦
                    </div>
                    <h2 className="text-base font-bold text-slate-900">Active Orders</h2>
                    {activeSchedules.length > 0 && (
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                            {activeSchedules.length}
                        </span>
                    )}
                </div>
                <Link
                    href="/checkrate"
                    className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600"
                >
                    + New Pickup
                </Link>
            </div>

            {/* List */}
            <div className="flex flex-1 flex-col overflow-y-auto">
                {activeSchedules.length === 0 ? (
                    <EmptyState />
                ) : (
                    activeSchedules.map((schedule) => (
                        <OrderRow
                            key={schedule.id}
                            schedule={schedule}
                            isSelected={selectedOrderId === schedule.id}
                            onSelect={() => onSelectOrder(schedule.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}