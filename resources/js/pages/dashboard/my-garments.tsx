interface Garment {
    emoji: string;
    name: string;
    count: string;
}

const garments: Garment[] = [
    { emoji: '👔', name: 'Shirts',           count: '8 cleaned this month' },
    { emoji: '🧥', name: 'Coats & Jackets',  count: '3 cleaned this month' },
    { emoji: '🥻', name: 'Traditional Wear', count: '5 cleaned this month' },
    { emoji: '👖', name: 'Trousers',          count: '4 cleaned this month' },
];

function GarmentCard({ emoji, name, count }: Garment) {
    return (
        <div className="cursor-pointer rounded-xl border border-transparent bg-[#f7f3ec] p-3 transition-all hover:border-[#c9a84c] hover:bg-[#fef9ef]">
            <div className="mb-1.5 text-2xl">{emoji}</div>
            <div className="text-xs font-medium text-[#0d1b2a]">{name}</div>
            <div className="text-[11px] text-[#8a9bb0]">{count}</div>
        </div>
    );
}

export default function MyGarments() {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white">
            <div className="flex items-center justify-between border-b border-[#ede7da] px-6 py-5">
                <span className="font-serif text-lg text-[#0d1b2a]">My Garments</span>
                <a href="#" className="text-xs font-medium text-[#c9a84c] hover:underline">Manage →</a>
            </div>
            <div className="grid grid-cols-2 gap-2.5 p-5">
                {garments.map((g) => (
                    <GarmentCard key={g.name} {...g} />
                ))}
            </div>
        </div>
    );
}