import { usePage } from '@inertiajs/react';

interface Garment {
    product_id:    string;
    name:          string;
    category:      string;
    category_slug: string;
    total_qty:     number;
    order_count:   number;
}

// ─── Category → icon + color ─────────────────────────────────────────────────

interface CategoryStyle {
    bg:     string;
    border: string;
    color:  string;
    icon:   React.ReactNode;
}

function ShirtIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>
        </svg>
    );
}

function LayersIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
        </svg>
    );
}

function HomeIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
    );
}

function TagIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
    );
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
    tops: {
        bg: '#EFF6FF', border: '#BFDBFE', color: '#2563EB',
        icon: <ShirtIcon className="h-5 w-5" />,
    },
    bottoms: {
        bg: '#F5F3FF', border: '#DDD6FE', color: '#7C3AED',
        icon: <LayersIcon className="h-5 w-5" />,
    },
    full_body: {
        bg: '#ECFDF5', border: '#A7F3D0', color: '#059669',
        icon: <ShirtIcon className="h-5 w-5" />,
    },
    household: {
        bg: '#FFF7ED', border: '#FED7AA', color: '#C2410C',
        icon: <HomeIcon className="h-5 w-5" />,
    },
    accessories: {
        bg: '#FDF4FF', border: '#E9D5FF', color: '#9333EA',
        icon: <TagIcon className="h-5 w-5" />,
    },
    comforter: {
        bg: '#EEF2FF', border: '#C7D2FE', color: '#6366F1',
        icon: <HomeIcon className="h-5 w-5" />,
    },
    blanket: {
        bg: '#FFF1F2', border: '#FECDD3', color: '#E11D48',
        icon: <LayersIcon className="h-5 w-5" />,
    },
};

const FALLBACK_STYLE: CategoryStyle = {
    bg: '#F8FAFC', border: '#E2E8F0', color: '#64748B',
    icon: <ShirtIcon className="h-5 w-5" />,
};

// ─── Single garment card ─────────────────────────────────────────────────────

function GarmentCard({ garment }: { garment: Garment }) {
    const style = CATEGORY_STYLES[garment.category_slug] ?? FALLBACK_STYLE;

    return (
        <div className="flex cursor-default items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3.5 transition-all hover:border-blue-200 hover:bg-blue-50">
            {/* Icon */}
            <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border"
                style={{ background: style.bg, borderColor: style.border, color: style.color }}
            >
                {style.icon}
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-800">{garment.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">
                    {garment.total_qty} {garment.total_qty === 1 ? 'piece' : 'pieces'}
                </p>
            </div>

            {/* Quantity badge */}
            <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: style.bg, color: style.color }}
                aria-label={`${garment.total_qty} pieces`}
            >
                {garment.total_qty}
            </div>
        </div>
    );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-100 bg-gradient-to-br from-blue-50 to-purple-50">
                <ShirtIcon className="h-7 w-7 text-purple-400" />
            </div>
            <p className="text-sm font-semibold text-slate-700">No active garments</p>
            <p className="mt-1 text-xs text-slate-400">
                Items from your active orders will appear here
            </p>
        </div>
    );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function MyGarments() {
    const { myGarments } = usePage<{ myGarments: Garment[] }>().props;

    const totalPieces = myGarments.reduce((sum, g) => sum + g.total_qty, 0);

    return (
        <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-purple-100 bg-purple-50 text-purple-600">
                        <ShirtIcon className="h-4 w-4" />
                    </div>
                    <h2 className="text-base font-bold text-slate-900">My Garments</h2>
                    {myGarments.length > 0 && (
                        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-bold text-white">
                            {totalPieces}
                        </span>
                    )}
                </div>
                <a
                    href="/checkrate"
                    className="rounded-lg border border-purple-100 bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 transition-all hover:bg-purple-600 hover:text-white hover:border-purple-600"
                >
                    + Add
                </a>
            </div>

            {/* Grid */}
            <div className="p-4">
                {myGarments.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {myGarments.map((g) => (
                            <GarmentCard key={g.product_id} garment={g} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}