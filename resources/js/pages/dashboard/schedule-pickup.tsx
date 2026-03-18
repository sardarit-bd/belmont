import { usePage, Link } from '@inertiajs/react';

interface Schedule {
    id:             string;
    order_number:   string;
    status:         string;
    status_label:   string;
    payment_status: string;
    pickup_date:    string;
    preferred_time: string;
    full_address:   string;
    items_count:    number;
    items:          { name: string; quantity: number }[];
}

// ─── Status config ─────────────────────────────────────────────────────────

const STATUS_PILL: Record<string, { bg: string; text: string; border: string }> = {
    pending:   { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' },
    confirmed: { bg: '#DBEAFE', text: '#1D4ED8', border: '#BFDBFE' },
};

const STATUS_ICON_BG: Record<string, { bg: string; color: string }> = {
    pending:   { bg: '#F1F5F9', color: '#64748B' },
    confirmed: { bg: '#EFF6FF', color: '#2563EB' },
};

// ─── Calendar icon ──────────────────────────────────────────────────────────

function CalendarIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={style}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
    );
}

// ─── Single pickup card ─────────────────────────────────────────────────────

function PickupRow({ schedule }: { schedule: Schedule }) {
    const pill      = STATUS_PILL[schedule.status]  ?? STATUS_PILL.pending;
    const iconStyle = STATUS_ICON_BG[schedule.status] ?? STATUS_ICON_BG.pending;

    const summary = schedule.items.length > 0
        ? schedule.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')
        : `${schedule.items_count} item(s)`;

    return (
        <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 last:border-b-0">
            {/* Icon */}
            <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{ background: iconStyle.bg, color: iconStyle.color }}
            >
                <CalendarIcon className="h-5 w-5" />
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">
                    {schedule.pickup_date}
                </p>
                <p className="mt-0.5 truncate text-xs text-slate-400">
                    {schedule.preferred_time} · {summary}
                </p>
                <p className="mt-0.5 truncate text-[11px] text-slate-400">
                    📍 {schedule.full_address}
                </p>
            </div>

            {/* Status pill */}
            <div className="shrink-0">
                <span
                    className="inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                    style={{
                        background:   pill.bg,
                        color:        pill.text,
                        border:       `0.5px solid ${pill.border}`,
                    }}
                >
                    {schedule.status_label}
                </span>
                <p className="mt-1.5 text-right text-[10px] font-semibold text-slate-400">
                    #{schedule.order_number}
                </p>
            </div>
        </div>
    );
}

// ─── Empty state ────────────────────────────────────────────────────────────

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50">
                <CalendarIcon className="h-7 w-7 text-blue-400" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No upcoming pickups</p>
            <p className="mt-1 text-xs text-slate-400">Ready for fresh, clean garments?</p>
            <Link
                href="/checkrate"
                className="mt-5 inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-xs font-semibold text-white shadow-sm shadow-blue-200 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
                Schedule a Pickup
            </Link>
        </div>
    );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function SchedulePickup() {
    const { activeSchedules } = usePage<{ activeSchedules: Schedule[] }>().props;

    const upcoming = activeSchedules.filter((s) =>
        ['pending', 'confirmed'].includes(s.status),
    );

    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600">
                        <CalendarIcon className="h-4 w-4" />
                    </div>
                    <h2 className="text-base font-bold text-slate-900">Upcoming Pickups</h2>
                    {upcoming.length > 0 && (
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                            {upcoming.length}
                        </span>
                    )}
                </div>
                <Link
                    href="/checkrate"
                    className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 transition-all hover:bg-blue-600 hover:text-white hover:border-blue-600"
                >
                    + New
                </Link>
            </div>

            {/* List */}
            <div className="flex flex-col">
                {upcoming.length === 0 ? (
                    <EmptyState />
                ) : (
                    upcoming.map((schedule) => (
                        <PickupRow key={schedule.id} schedule={schedule} />
                    ))
                )}
            </div>
        </div>
    );
}