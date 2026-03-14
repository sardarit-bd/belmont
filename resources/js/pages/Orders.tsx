import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { dashboard, orders } from '@/routes';
import type { BreadcrumbItem } from '@/types';

interface OrderItem {
    name:     string;
    quantity: number;
}

interface Order {
    id:             string;
    status:         string;
    status_label:   string;
    payment_status: string;
    pickup_date:    string;
    preferred_time: string;
    full_address:   string;
    is_terminal:    boolean;
    items_count:    number;
    items:          OrderItem[];
    created_at:     string;
}

interface PaginatedOrders {
    data:          Order[];
    current_page:  number;
    last_page:     number;
    per_page:      number;
    total:         number;
    next_page_url: string | null;
    prev_page_url: string | null;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Orders',    href: orders().url    },
];

const STATUS_BADGE: Record<string, string> = {
    pending:          'bg-gray-50 text-gray-500 border-gray-200',
    confirmed:        'bg-blue-50 text-blue-600 border-blue-100',
    picked_up:        'bg-amber-50 text-amber-700 border-amber-100',
    being_cleaned:    'bg-purple-50 text-purple-700 border-purple-100',
    out_for_delivery: 'bg-orange-50 text-orange-700 border-orange-100',
    delivered:        'bg-emerald-50 text-emerald-700 border-emerald-100',
    cancelled:        'bg-red-50 text-red-600 border-red-100',
};

const STATUS_ICONS: Record<string, string> = {
    pending:          '⏳',
    confirmed:        '✅',
    picked_up:        '🚗',
    being_cleaned:    '🧺',
    out_for_delivery: '🚚',
    delivered:        '🎉',
    cancelled:        '❌',
};

function PaymentBadge({ status }: { status: string }) {
    const styles = status === 'confirmed'
        ? 'text-emerald-600'
        : status === 'failed'
            ? 'text-red-500'
            : 'text-amber-600';

    const label = status === 'confirmed' ? '✓ Paid'
        : status === 'failed' ? '✗ Failed'
        : '⏳ Pending';

    return <span className={`text-xs font-medium ${styles}`}>{label}</span>;
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🧺</div>
            <p className="text-base font-semibold text-[#0d1b2a] mb-1">No orders yet</p>
            <p className="text-sm text-[#8a9bb0] mb-6">Your order history will appear here once you schedule a pickup</p>
            <Link
                href="/check-rates"
                className="rounded-full bg-[#0d1b2a] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#1a2e45] transition-colors"
            >
                Schedule a Pickup
            </Link>
        </div>
    );
}

export default function Orders() {
    const { orders: paginatedOrders } = usePage<{ orders: PaginatedOrders }>().props;
    const { data: orderList, total, current_page, last_page } = paginatedOrders;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />

            <div className="flex h-full flex-1 flex-col gap-5 p-4 md:p-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="font-serif text-2xl text-[#0d1b2a]">Orders</h1>
                        <p className="mt-0.5 text-sm text-[#8a9bb0]">
                            {total} {total === 1 ? 'order' : 'orders'} total
                        </p>
                    </div>
                    <Link
                        href="/checkrate"
                        className="rounded-full bg-[#0d1b2a] px-5 py-2 text-xs font-semibold text-white hover:bg-[#1a2e45] transition-colors"
                    >
                        + New Pickup
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white">
                    {orderList.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <>
                            {/* Desktop table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-[#ede7da] bg-[#f7f3ec]">
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">Order</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">Items</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">Pickup</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">Status</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">Payment</th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-[#8a9bb0]">Booked</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#ede7da]">
                                        {orderList.map((order) => (
                                            <tr key={order.id} className="hover:bg-[#f7f3ec] transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-xs font-semibold text-[#0d1b2a]">
                                                        #{order.id.slice(0, 8).toUpperCase()}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 max-w-[200px]">
                                                    <p className="truncate text-sm text-[#0d1b2a]">
                                                        {order.items.map(i => `${i.quantity}× ${i.name}`).join(', ')}
                                                    </p>
                                                    <p className="text-[11px] text-[#8a9bb0]">{order.items_count} item(s)</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-[#0d1b2a]">{order.pickup_date}</p>
                                                    <p className="text-[11px] text-[#8a9bb0]">{order.preferred_time}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_BADGE[order.status] ?? 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                                        {STATUS_ICONS[order.status]} {order.status_label}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <PaymentBadge status={order.payment_status} />
                                                </td>
                                                <td className="px-6 py-4 text-xs text-[#8a9bb0]">
                                                    {order.created_at}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile cards */}
                            <div className="md:hidden divide-y divide-[#ede7da]">
                                {orderList.map((order) => (
                                    <div key={order.id} className="p-5 hover:bg-[#f7f3ec] transition-colors">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div>
                                                <span className="font-mono text-xs font-semibold text-[#0d1b2a]">
                                                    #{order.id.slice(0, 8).toUpperCase()}
                                                </span>
                                                <p className="mt-0.5 text-[11px] text-[#8a9bb0]">{order.created_at}</p>
                                            </div>
                                            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_BADGE[order.status] ?? 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                                                {STATUS_ICONS[order.status]} {order.status_label}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#0d1b2a] truncate">
                                            {order.items.map(i => `${i.quantity}× ${i.name}`).join(', ')}
                                        </p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <p className="text-xs text-[#8a9bb0]">{order.pickup_date} · {order.preferred_time}</p>
                                            <PaymentBadge status={order.payment_status} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {last_page > 1 && (
                                <div className="flex items-center justify-between border-t border-[#ede7da] px-6 py-4">
                                    <p className="text-xs text-[#8a9bb0]">
                                        Page {current_page} of {last_page}
                                    </p>
                                    <div className="flex gap-2">
                                        {paginatedOrders.prev_page_url && (
                                            <Link
                                                href={paginatedOrders.prev_page_url}
                                                className="rounded-lg border border-[#ede7da] px-3 py-1.5 text-xs font-medium text-[#0d1b2a] hover:bg-[#f7f3ec] transition-colors"
                                            >
                                                ← Prev
                                            </Link>
                                        )}
                                        {paginatedOrders.next_page_url && (
                                            <Link
                                                href={paginatedOrders.next_page_url}
                                                className="rounded-lg border border-[#ede7da] px-3 py-1.5 text-xs font-medium text-[#0d1b2a] hover:bg-[#f7f3ec] transition-colors"
                                            >
                                                Next →
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}