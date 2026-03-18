import { useEffect, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface OrderItem {
    name:        string;
    quantity:    number;
    unit_price:  number;
    total_price: number;
}

export interface DrawerOrder {
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

interface Props {
    order:   DrawerOrder | null;
    onClose: () => void;
}

// ─── Stage config ─────────────────────────────────────────────────────────────

type StepState = 'done' | 'active' | 'pending';

const STAGES = [
    { key: 'pending',          label: 'Order Placed'           },
    { key: 'confirmed',        label: 'Payment Confirmed'      },
    { key: 'picked_up',        label: 'Picked Up'              },
    { key: 'being_cleaned',    label: 'Cleaning in Progress'   },
    { key: 'out_for_delivery', label: 'Out for Delivery'       },
    { key: 'delivered',        label: 'Delivered'              },
];

function buildSteps(status: string) {
    const idx = STAGES.findIndex((s) => s.key === status);
    return STAGES.map((stage, i) => {
        let state: StepState = 'pending';
        let time              = 'Pending';
        if (i < idx) { state = 'done';   time = '✓ Completed'; }
        else if (i === idx) {
            state = status === 'delivered' ? 'done' : 'active';
            time  = status === 'delivered' ? '✓ Completed' : 'In progress…';
        }
        return { label: stage.label, time, state };
    });
}

function progressPct(status: string): number {
    const idx = STAGES.findIndex((s) => s.key === status);
    if (idx < 0) return 0;
    if (status === 'delivered') return 100;
    return Math.round(((idx + 1) / STAGES.length) * 100);
}

// ─── Status pill config ───────────────────────────────────────────────────────

const STATUS_PILL: Record<string, { bg: string; text: string; border: string }> = {
    pending:          { bg: '#F1F5F9', text: '#475569', border: '#E2E8F0' },
    confirmed:        { bg: '#DBEAFE', text: '#1D4ED8', border: '#BFDBFE' },
    picked_up:        { bg: '#FEF3C7', text: '#B45309', border: '#FDE68A' },
    being_cleaned:    { bg: '#EDE9FE', text: '#6D28D9', border: '#DDD6FE' },
    out_for_delivery: { bg: '#FFEDD5', text: '#C2410C', border: '#FED7AA' },
    delivered:        { bg: '#D1FAE5', text: '#065F46', border: '#A7F3D0' },
    cancelled:        { bg: '#FEE2E2', text: '#B91C1C', border: '#FECACA' },
};

// ─── Inline icons ─────────────────────────────────────────────────────────────

function CloseIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    );
}

// ─── Tracker step ─────────────────────────────────────────────────────────────

function Step({ label, time, state, isLast }: { label: string; time: string; state: StepState; isLast: boolean }) {
    return (
        <div className="relative flex gap-3 pb-5 last:pb-0">
            {/* Connecting line */}
            {!isLast && (
                <div
                    className="absolute left-[13px] top-[28px] w-[1.5px] rounded-full"
                    style={{
                        bottom:     0,
                        background: state === 'done'
                            ? 'linear-gradient(180deg,#3B82F6,#BFDBFE)'
                            : state === 'active'
                                ? 'linear-gradient(180deg,#A78BFA,transparent)'
                                : '#E2E8F0',
                    }}
                    aria-hidden="true"
                />
            )}

            {/* Dot */}
            <div
                className={[
                    'relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                    state === 'done'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow shadow-blue-200'
                        : state === 'active'
                            ? 'animate-pulse bg-gradient-to-br from-purple-400 to-purple-700 text-white shadow shadow-purple-200'
                            : 'border-2 border-slate-200 bg-slate-100 text-slate-400',
                ].join(' ')}
                aria-label={state}
            >
                {state === 'done' ? '✓' : state === 'active' ? '●' : '○'}
            </div>

            {/* Text */}
            <div className="pt-0.5">
                <p className={[
                    'text-sm font-semibold leading-snug',
                    state === 'done' ? 'text-slate-600' : state === 'active' ? 'text-purple-700' : 'text-slate-400',
                ].join(' ')}>
                    {label}
                </p>
                <p className={`mt-0.5 text-xs ${state === 'active' ? 'font-medium text-purple-400' : 'text-slate-400'}`}>
                    {time}
                </p>
            </div>
        </div>
    );
}

// ─── Payment badge ────────────────────────────────────────────────────────────

function PaymentBadge({ status }: { status: string }) {
    if (status === 'confirmed')
        return <span className="text-sm font-semibold text-emerald-600">✓ Paid</span>;
    if (status === 'failed')
        return <span className="text-sm font-semibold text-red-500">✗ Failed</span>;
    return <span className="text-sm font-semibold text-amber-600">⏳ Pending</span>;
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function OrderDrawer({ order, onClose }: Props) {
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onClose]);

    // Trap focus inside drawer when open
    useEffect(() => {
        if (order) drawerRef.current?.focus();
    }, [order]);

    // Prevent body scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = order ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [order]);

    const isOpen = order !== null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={[
                    'fixed inset-0 z-40 bg-slate-900/30 backdrop-blur-[2px] transition-opacity duration-300',
                    isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
                ].join(' ')}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Drawer panel */}
            <div
                ref={drawerRef}
                tabIndex={-1}
                role="dialog"
                aria-modal="true"
                aria-label={order ? `Order ${order.order_number} details` : 'Order details'}
                className={[
                    'fixed inset-y-0 right-0 z-50 flex w-full flex-col bg-white shadow-2xl outline-none',
                    'transition-transform duration-300 ease-in-out',
                    'sm:w-[420px]',
                    isOpen ? 'translate-x-0' : 'translate-x-full',
                ].join(' ')}
            >
                {order && <DrawerContent order={order} onClose={onClose} />}
            </div>
        </>
    );
}

// ─── Drawer content (separate so it re-renders cleanly) ───────────────────────

function DrawerContent({ order, onClose }: { order: DrawerOrder; onClose: () => void }) {
    const steps       = buildSteps(order.status);
    const pct         = progressPct(order.status);
    const pill        = STATUS_PILL[order.status] ?? STATUS_PILL.pending;
    const itemSummary = order.items.length > 0
        ? order.items.map((i) => `${i.quantity}× ${i.name}`).join(', ')
        : `${order.items_count} item(s)`;

    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="min-w-0 flex-1 pr-4">
                    <p className="text-xs font-bold tracking-wide text-blue-600">
                        #{order.order_number}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-slate-800">
                        {itemSummary}
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-500 transition-all hover:border-slate-300 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    aria-label="Close order details"
                >
                    <CloseIcon />
                </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto">

                {/* Progress bar + status */}
                <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50 px-5 py-4">
                    <div className="mb-2 flex items-center justify-between">
                        <span
                            className="inline-block rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                            style={{ background: pill.bg, color: pill.text, border: `0.5px solid ${pill.border}` }}
                        >
                            {order.status_label}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">{pct}%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
                            style={{ width: `${pct}%` }}
                            role="progressbar"
                            aria-valuenow={pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                        />
                    </div>
                </div>

                <div className="px-5 py-5 space-y-6">

                    {/* Order meta */}
                    <section aria-labelledby="meta-heading">
                        <h3 id="meta-heading" className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Order Info
                        </h3>
                        <div className="grid grid-cols-2 gap-2.5">
                            <div className="rounded-xl bg-slate-50 px-3.5 py-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Pickup date</p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">{order.pickup_date}</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 px-3.5 py-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Time slot</p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">{order.preferred_time}</p>
                            </div>
                            <div className="col-span-2 rounded-xl bg-slate-50 px-3.5 py-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Address</p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">{order.full_address}</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 px-3.5 py-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Payment</p>
                                <div className="mt-1">
                                    <PaymentBadge status={order.payment_status} />
                                </div>
                            </div>
                            <div className="rounded-xl bg-slate-50 px-3.5 py-3">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Booked on</p>
                                <p className="mt-1 text-sm font-semibold text-slate-800">{order.created_at}</p>
                            </div>
                        </div>
                    </section>

                    {/* Items list */}
                    <section aria-labelledby="items-heading">
                        <h3 id="items-heading" className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Items
                        </h3>
                        <div className="overflow-hidden rounded-xl border border-slate-100">
                            {order.items.length > 0 ? (
                                order.items.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0"
                                    >
                                        <span className="text-sm font-medium text-slate-700">{item.name}</span>
                                        <div className="flex items-center gap-3">
                                            {item.unit_price > 0 && (
                                                <span className="text-xs text-slate-400">
                                                    ৳{item.unit_price} × {item.quantity}
                                                </span>
                                            )}
                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-xs font-bold text-indigo-600">
                                                ×{item.quantity}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-3 text-sm text-slate-400">
                                    {order.items_count} item(s)
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Tracking steps */}
                    <section aria-labelledby="tracking-heading">
                        <h3 id="tracking-heading" className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            Tracking
                        </h3>
                        <div>
                            {steps.map((step, i) => (
                                <Step
                                    key={step.label}
                                    label={step.label}
                                    time={step.time}
                                    state={step.state}
                                    isLast={i === steps.length - 1}
                                />
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
}