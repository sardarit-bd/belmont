interface Order {
    icon: string;
    name: string;
    id: string;
    price: string;
    badge: string;
    badgeClass: string;
}

const orders: Order[] = [
    {
        icon: '👔',
        name: '3× Dress Shirts + 1 Blazer',
        id: '#CP-20483 · Picked up Mar 11',
        price: '৳680',
        badge: 'Cleaning',
        badgeClass: 'bg-blue-50 text-blue-600',
    },
    {
        icon: '🥻',
        name: '2× Saree + 1 Salwar',
        id: '#CP-20471 · Picked up Mar 9',
        price: '৳950',
        badge: 'Ready ✓',
        badgeClass: 'bg-emerald-50 text-emerald-700',
    },
    {
        icon: '🧥',
        name: '1× Winter Coat + 2 Trousers',
        id: '#CP-20460 · Picked up Mar 8',
        price: '৳1,210',
        badge: 'In Transit',
        badgeClass: 'bg-amber-50 text-amber-700',
    },
];

function OrderRow({ icon, name, id, price, badge, badgeClass }: Order) {
    return (
        <div className="flex cursor-pointer items-center gap-4 border-b border-[#ede7da] px-6 py-4 last:border-0 hover:bg-[#f7f3ec] transition-colors">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f3ec] text-2xl">
                {icon}
            </div>
            <div className="flex-1">
                <div className="text-sm font-medium text-[#0d1b2a]">{name}</div>
                <div className="mt-0.5 text-[11px] text-[#8a9bb0]">Order {id}</div>
            </div>
            <div className="text-right">
                <div className="text-sm font-semibold text-[#0d1b2a]">{price}</div>
                <span className={`mt-1 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeClass}`}>
                    {badge}
                </span>
            </div>
        </div>
    );
}

export default function ActiveOrders() {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white h-full">
            <div className="flex items-center justify-between border-b border-[#ede7da] px-6 py-5">
                <span className="font-serif text-lg text-[#0d1b2a]">Active Orders</span>
                <a href="#" className="text-xs font-medium text-[#c9a84c] hover:underline">View All →</a>
            </div>
            {orders.map((o) => (
                <OrderRow key={o.id} {...o} />
            ))}
        </div>
    );
}