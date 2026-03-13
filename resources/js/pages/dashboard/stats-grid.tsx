import { usePage } from '@inertiajs/react';

interface Stats {
    total:     number;
    completed: number;
    pending:   number;
}

interface StatItem {
    icon:   string;
    value:  string | number;
    label:  string;
    change: string;
    up:     boolean;
}

function StatCard({ icon, value, label, change, up }: StatItem) {
    return (
        <div className="cursor-default rounded-2xl border border-[#ede7da] bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#0d1b2a]/8">
            <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f7f3ec] text-xl">
                {icon}
            </div>
            <div className="font-serif text-3xl leading-none text-[#0d1b2a]">{value}</div>
            <div className="mt-1 text-xs text-[#8a9bb0]">{label}</div>
            <div className={`mt-2 text-[11px] font-medium ${up ? 'text-[#2ecc8a]' : 'text-[#8a9bb0]'}`}>
                {change}
            </div>
        </div>
    );
}

export default function StatsGrid() {
    const { stats } = usePage<{ stats: Stats }>().props;

    const cards: StatItem[] = [
        {
            icon:   '📦',
            value:  stats.pending,
            label:  'Active Orders',
            change: stats.pending > 0 ? `↑ ${stats.pending} in progress` : 'No active orders',
            up:     stats.pending > 0,
        },
        {
            icon:   '🎉',
            value:  stats.completed,
            label:  'Completed Orders',
            change: stats.completed > 0 ? `↑ ${stats.completed} delivered` : 'No completed orders yet',
            up:     stats.completed > 0,
        },
        {
            icon:   '🚚',
            value:  stats.total,
            label:  'Total Orders',
            change: stats.total > 0 ? `All time bookings` : 'No orders yet',
            up:     stats.total > 0,
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((s) => (
                <StatCard key={s.label} {...s} />
            ))}
        </div>
    );
}