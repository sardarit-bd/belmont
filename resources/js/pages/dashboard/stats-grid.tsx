interface StatItem {
    icon: string;
    value: string;
    label: string;
    change: string;
    up: boolean;
}

const stats: StatItem[] = [
    { icon: '📦', value: '3',       label: 'Active Orders',        change: '↑ 1 new today',            up: true  },
    { icon: '👔', value: '12',      label: 'Items Being Cleaned',  change: 'Across 3 orders',          up: false },
    { icon: '💰', value: '৳2,840',  label: 'Spent This Month',     change: '↑ Saved ৳300 via rewards', up: true  },
    { icon: '🚚', value: '18',      label: 'Total Orders Ever',    change: '↑ Member since Jan 2024',  up: true  },
];

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
    return (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s) => (
                <StatCard key={s.label} {...s} />
            ))}
        </div>
    );
}