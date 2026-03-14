import { usePage } from '@inertiajs/react';

interface Garment {
    product_id:    string;
    name:          string;
    category:      string;
    category_slug: string;
    total_qty:     number;
    order_count:   number;
}

const CATEGORY_EMOJI: Record<string, string> = {
    tops:           '👔',
    bottoms:        '👖',
    full_body:      '🥻',
    household:      '🏠',
    accessories:    '🧣',
    comforter:      '🛏️',
    dawn_comforter: '🌅',
    blanket:        '🧸',
};

function GarmentCard({ garment }: { garment: Garment }) {
    const emoji = CATEGORY_EMOJI[garment.category_slug] ?? '👕';

    return (
        <div className="cursor-pointer rounded-xl border border-transparent bg-[#f7f3ec] p-3 transition-all hover:border-[#c9a84c] hover:bg-[#fef9ef]">
            <div className="mb-1.5 text-2xl">{emoji}</div>
            <div className="text-xs font-medium text-[#0d1b2a] truncate">{garment.name}</div>
            <div className="text-[11px] text-[#8a9bb0]">{garment.total_qty} pcs · {garment.order_count} {garment.order_count === 1 ? 'order' : 'orders'}</div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="col-span-2 flex flex-col items-center justify-center py-10 text-center">
            <div className="text-4xl mb-3">👗</div>
            <p className="text-sm font-medium text-[#0d1b2a]">No garments yet</p>
            <p className="text-xs text-[#8a9bb0] mt-1">Your cleaned items will appear here</p>
        </div>
    );
}

export default function MyGarments() {
    const { myGarments } = usePage<{ myGarments: Garment[] }>().props;

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white">
            <div className="flex items-center justify-between border-b border-[#ede7da] px-6 py-5">
                <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#0d1b2a]">My Garments</span>
                    {myGarments.length > 0 && (
                        <span className="rounded-full bg-[#0d1b2a] px-2 py-0.5 text-[10px] font-bold text-white">
                            {myGarments.length}
                        </span>
                    )}
                </div>
                <a href="/check-rates" className="text-xs font-medium text-[#c9a84c] hover:underline">
                    + Add →
                </a>
            </div>
            <div className="grid grid-cols-2 gap-2.5 p-5">
                {myGarments.length === 0 ? (
                    <EmptyState />
                ) : (
                    myGarments.map((g) => (
                        <GarmentCard key={g.product_id} garment={g} />
                    ))
                )}
            </div>
        </div>
    );
}