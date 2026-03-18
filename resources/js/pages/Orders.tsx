import { Head, Link, usePage } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import AppLayout from '@/layouts/app-layout';
import { dashboard, orders } from '@/routes';
import type { BreadcrumbItem } from '@/types';

import OrderDrawer, { type DrawerOrder } from '@/pages/orders/order-drawer';

// ─── Types ─────────────────────────────────────────────────────────────────────

interface OrderItem {
    name:        string;
    quantity:    number;
    unit_price:  number;
    total_price: number;
}

interface Order {
    id:             string;
    order_number:   string;
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

// ─── Status config ──────────────────────────────────────────────────────────

const STATUS_PILL: Record<string, { bg: string; text: string; border: string; dot: string }> = {
    pending:          { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0', dot: '#94A3B8' },
    confirmed:        { bg: '#DBEAFE', text: '#1D4ED8', border: '#BFDBFE', dot: '#3B82F6' },
    picked_up:        { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A', dot: '#F59E0B' },
    being_cleaned:    { bg: '#EDE9FE', text: '#6D28D9', border: '#DDD6FE', dot: '#8B5CF6' },
    out_for_delivery: { bg: '#FFEDD5', text: '#C2410C', border: '#FED7AA', dot: '#F97316' },
    delivered:        { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0', dot: '#10B981' },
    cancelled:        { bg: '#FEE2E2', text: '#B91C1C', border: '#FECACA', dot: '#EF4444' },
};

const FALLBACK_PILL = STATUS_PILL.pending;

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Orders',    href: orders().url    },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatusPill({ status, label }: { status: string; label: string }) {
    const p = STATUS_PILL[status] ?? FALLBACK_PILL;
    return (
        <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
            style={{ background: p.bg, color: p.text, border: `0.5px solid ${p.border}` }}
        >
            <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: p.dot }}
                aria-hidden="true"
            />
            {label}
        </span>
    );
}

function PaymentBadge({ status }: { status: string }) {
    if (status === 'confirmed') return <span className="text-xs font-semibold text-emerald-600">✓ Paid</span>;
    if (status === 'failed')    return <span className="text-xs font-semibold text-red-500">✗ Failed</span>;
    return <span className="text-xs font-semibold text-amber-600">⏳ Pending</span>;
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-blue-400" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
            </div>
            <p className="text-base font-semibold text-slate-700">No orders yet</p>
            <p className="mt-1.5 max-w-xs text-sm text-slate-400">
                Your order history will appear here once you schedule a pickup.
            </p>
            <Link
                href="/checkrate"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
                Schedule a Pickup
            </Link>
        </div>
    );
}

// ─── Desktop table row ────────────────────────────────────────────────────────

function TableRow({ order, isSelected, onClick }: { order: Order; isSelected: boolean; onClick: () => void }) {
    const summary = order.items.length > 0
        ? order.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')
        : `${order.items_count} item(s)`;

    return (
        <tr
            onClick={onClick}
            className={[
                'cursor-pointer border-b border-slate-100 transition-colors last:border-b-0',
                isSelected
                    ? 'border-l-2 border-l-blue-600 bg-gradient-to-r from-blue-50/70 to-purple-50/40'
                    : 'hover:bg-slate-50',
            ].join(' ')}
            aria-selected={isSelected}
        >
            {/* Order # */}
            <td className="px-5 py-4">
                <span className="text-xs font-bold tabular-nums text-blue-600">
                    #{order.order_number}
                </span>
            </td>

            {/* Items */}
            <td className="max-w-[220px] px-5 py-4">
                <p className="truncate text-sm font-medium text-slate-800">{summary}</p>
                <p className="mt-0.5 text-xs text-slate-400">{order.items_count} item(s)</p>
            </td>

            {/* Pickup */}
            <td className="px-5 py-4">
                <p className="text-sm font-medium text-slate-700">{order.pickup_date}</p>
                <p className="mt-0.5 text-xs text-slate-400">{order.preferred_time}</p>
            </td>

            {/* Status */}
            <td className="px-5 py-4">
                <StatusPill status={order.status} label={order.status_label} />
            </td>

            {/* Payment */}
            <td className="px-5 py-4">
                <PaymentBadge status={order.payment_status} />
            </td>

            {/* Booked */}
            <td className="px-5 py-4 text-xs text-slate-400">{order.created_at}</td>

            {/* Chevron hint */}
            <td className="pr-4 text-right">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"/>
                </svg>
            </td>
        </tr>
    );
}

// ─── Mobile card ──────────────────────────────────────────────────────────────

function MobileCard({ order, isSelected, onClick }: { order: Order; isSelected: boolean; onClick: () => void }) {
    const summary = order.items.length > 0
        ? order.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')
        : `${order.items_count} item(s)`;

    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                'flex w-full flex-col gap-2.5 border-b border-slate-100 px-4 py-4 text-left transition-colors last:border-b-0',
                isSelected ? 'bg-gradient-to-r from-blue-50/70 to-purple-50/40 border-l-2 border-l-blue-600' : 'hover:bg-slate-50',
            ].join(' ')}
            aria-label={`Order ${order.order_number}`}
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <span className="text-xs font-bold text-blue-600">#{order.order_number}</span>
                    <p className="mt-0.5 text-xs text-slate-400">{order.created_at}</p>
                </div>
                <StatusPill status={order.status} label={order.status_label} />
            </div>
            <p className="truncate text-sm font-medium text-slate-800">{summary}</p>
            <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">{order.pickup_date} · {order.preferred_time}</p>
                <PaymentBadge status={order.payment_status} />
            </div>
        </button>
    );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({ data }: { data: PaginatedOrders }) {
    if (data.last_page <= 1) return null;
    return (
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3.5">
            <p className="text-xs text-slate-400">
                Page {data.current_page} of {data.last_page} · {data.total} orders
            </p>
            <div className="flex gap-2">
                {data.prev_page_url && (
                    <Link
                        href={data.prev_page_url}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                    >
                        ← Prev
                    </Link>
                )}
                {data.next_page_url && (
                    <Link
                        href={data.next_page_url}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                    >
                        Next →
                    </Link>
                )}
            </div>
        </div>
    );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Orders() {
    const { orders: paginatedOrders } = usePage<{ orders: PaginatedOrders }>().props;
    const { data: orderList, total }  = paginatedOrders;

    const [selectedOrder, setSelectedOrder] = useState<DrawerOrder | null>(null);

    const handleRowClick = useCallback((order: Order) => {
        setSelectedOrder((prev) => (prev?.id === order.id ? null : order));
    }, []);

    const handleClose = useCallback(() => setSelectedOrder(null), []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />

            <div className="min-h-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <div className="mx-auto px-4 py-6 sm:px-6 lg:px-8">

                    {/* ── Page header ── */}
                    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Orders
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                {total} {total === 1 ? 'order' : 'orders'} total · click a row to view details
                            </p>
                        </div>
                        <Link
                            href="/checkrate"
                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            New Pickup
                        </Link>
                    </div>

                    {/* ── Table card ── */}
                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
                        {orderList.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <>
                                {/* Desktop table */}
                                <div className="hidden overflow-x-auto md:block">
                                    <table className="w-full text-left" role="grid">
                                        <thead>
                                            <tr className="border-b border-slate-100 bg-slate-50/80">
                                                {['Order', 'Items', 'Pickup', 'Status', 'Payment', 'Booked', ''].map((h) => (
                                                    <th
                                                        key={h}
                                                        className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest text-slate-400"
                                                        scope="col"
                                                    >
                                                        {h}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orderList.map((order) => (
                                                <TableRow
                                                    key={order.id}
                                                    order={order}
                                                    isSelected={selectedOrder?.id === order.id}
                                                    onClick={() => handleRowClick(order)}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile cards */}
                                <div className="flex flex-col md:hidden">
                                    {orderList.map((order) => (
                                        <MobileCard
                                            key={order.id}
                                            order={order}
                                            isSelected={selectedOrder?.id === order.id}
                                            onClick={() => handleRowClick(order)}
                                        />
                                    ))}
                                </div>

                                <Pagination data={paginatedOrders} />
                            </>
                        )}
                    </div>

                </div>
            </div>

            {/* ── Slide-out drawer (portal-style fixed overlay) ── */}
            <OrderDrawer order={selectedOrder} onClose={handleClose} />
        </AppLayout>
    );
}