import { usePage } from '@inertiajs/react';

interface Stats {
    total:     number;
    completed: number;
    pending:   number;
}

interface StatItem {
    icon:        string;
    value:       string | number;
    label:       string;
    change:      string;
    positive:    boolean;
    accentFrom:  string;
    accentTo:    string;
    iconBg:      string;
    iconBorder:  string;
    barFrom:     string;
    barTo:       string;
    shadowColor: string;
}

function StatCard({ icon, value, label, change, positive, accentFrom, accentTo, iconBg, iconBorder, barFrom, barTo, shadowColor }: StatItem) {
    return (
        <div
            className="group relative cursor-default overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ ['--shadow-color' as string]: shadowColor }}
        >
            {/* Decorative corner blob */}
            <div
                className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-[80px] rounded-tr-2xl opacity-[0.07] transition-opacity duration-200 group-hover:opacity-[0.12]"
                style={{ background: `linear-gradient(135deg, ${accentFrom}, ${accentTo})` }}
            />

            {/* Icon */}
            <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-xl"
                style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
                aria-hidden="true"
            >
                {icon}
            </div>

            {/* Value */}
            <div className="text-4xl font-bold tracking-tight text-slate-900">{value}</div>

            {/* Label */}
            <div className="mt-1 text-sm font-medium text-slate-500">{label}</div>

            {/* Change badge */}
            <div className={`mt-3 inline-flex items-center gap-1 text-xs font-semibold ${positive ? 'text-emerald-600' : 'text-slate-400'}`}>
                {positive && <span aria-hidden="true">↑</span>}
                {change}
            </div>

            {/* Bottom accent bar */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-2xl"
                style={{ background: `linear-gradient(90deg, ${barFrom}, ${barTo})` }}
            />
        </div>
    );
}

export default function StatsGrid() {
    const { stats } = usePage<{ stats: Stats }>().props;

    const cards: StatItem[] = [
        {
            icon:        '📦',
            value:       stats.pending,
            label:       'Active Orders',
            change:      stats.pending > 0 ? `${stats.pending} in progress` : 'No active orders',
            positive:    stats.pending > 0,
            accentFrom:  '#2563EB',
            accentTo:    '#60A5FA',
            iconBg:      '#EFF6FF',
            iconBorder:  '#BFDBFE',
            barFrom:     '#60A5FA',
            barTo:       '#2563EB',
            shadowColor: 'rgba(37,99,235,0.12)',
        },
        {
            icon:        '🎉',
            value:       stats.completed,
            label:       'Completed Orders',
            change:      stats.completed > 0 ? `${stats.completed} delivered` : 'No completed orders yet',
            positive:    stats.completed > 0,
            accentFrom:  '#7C3AED',
            accentTo:    '#A78BFA',
            iconBg:      '#F5F3FF',
            iconBorder:  '#DDD6FE',
            barFrom:     '#A78BFA',
            barTo:       '#7C3AED',
            shadowColor: 'rgba(124,58,237,0.12)',
        },
        {
            icon:        '🚚',
            value:       stats.total,
            label:       'Total Orders',
            change:      stats.total > 0 ? 'All time bookings' : 'No orders yet',
            positive:    stats.total > 0,
            accentFrom:  '#6366F1',
            accentTo:    '#818CF8',
            iconBg:      '#EEF2FF',
            iconBorder:  '#C7D2FE',
            barFrom:     '#818CF8',
            barTo:       '#6366F1',
            shadowColor: 'rgba(99,102,241,0.12)',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((card) => (
                <StatCard key={card.label} {...card} />
            ))}
        </div>
    );
}