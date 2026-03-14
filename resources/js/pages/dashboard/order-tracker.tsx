import { usePage } from '@inertiajs/react';

type StepState = 'done' | 'active' | 'pending';

interface TrackStep {
    label: string;
    time:  string;
    state: StepState;
}

interface Schedule {
    id:             string;
    order_number:   string;
    status:         string;
    status_label:   string;
    pickup_date:    string;
    preferred_time: string;
    items:          { name: string; quantity: number }[];
    items_count:    number;
}

interface Props {
    selectedOrderId: string | null;
}

const STAGES = [
    { key: 'pending',          label: 'Order Placed'           },
    { key: 'confirmed',        label: 'Payment Confirmed'      },
    { key: 'picked_up',        label: 'Picked Up from Address' },
    { key: 'being_cleaned',    label: 'Cleaning in Progress'   },
    { key: 'out_for_delivery', label: 'Out for Delivery'       },
    { key: 'delivered',        label: 'Delivered'              },
];

const dotStyles: Record<StepState, string> = {
    done:    'bg-[#2ecc8a] text-white',
    active:  'bg-[#c9a84c] text-[#0d1b2a]',
    pending: 'bg-[#ede7da] text-[#8a9bb0]',
};

const dotIcons: Record<StepState, string> = {
    done: '✓', active: '⟳', pending: '○',
};

function Step({ label, time, state, isLast }: TrackStep & { isLast: boolean }) {
    return (
        <div className="relative flex gap-4 pb-5 last:pb-0">
            {!isLast && (
                <div className="absolute left-[14px] top-8 h-full w-0.5 bg-[#ede7da]" />
            )}
            <div className={`relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${dotStyles[state]}`}>
                {dotIcons[state]}
            </div>
            <div>
                <div className={`text-sm font-medium ${state === 'pending' ? 'text-[#8a9bb0]' : 'text-[#0d1b2a]'}`}>
                    {label}
                </div>
                <div className="mt-0.5 text-[11px] text-[#8a9bb0]">{time}</div>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="text-5xl mb-4">📦</div>
            <p className="text-sm font-medium text-[#0d1b2a] mb-1">No order selected</p>
            <p className="text-xs text-[#8a9bb0]">Click any active order to track it</p>
        </div>
    );
}

function buildSteps(schedule: Schedule): TrackStep[] {
    const currentIndex = STAGES.findIndex(s => s.key === schedule.status);

    return STAGES.map((stage, index) => {
        let state: StepState = 'pending';
        let time = 'Pending';

        if (index < currentIndex) {
            state = 'done';
            time  = index === 0 ? schedule.pickup_date : '✓ Completed';
        } else if (index === currentIndex) {
            state = schedule.status === 'delivered' ? 'done' : 'active';
            time  = index === 0
                ? `${schedule.pickup_date} · ${schedule.preferred_time}`
                : schedule.status === 'delivered' ? '✓ Completed' : 'In progress...';
        }

        return { label: stage.label, time, state };
    });
}

export default function OrderTracker({ selectedOrderId }: Props) {
    const { activeSchedules } = usePage<{ activeSchedules: Schedule[] }>().props;

    const schedule = selectedOrderId
        ? activeSchedules.find(s => s.id === selectedOrderId) ?? activeSchedules[0] ?? null
        : activeSchedules[0] ?? null;

    if (!schedule) {
        return (
            <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white h-full">
                <div className="flex items-center justify-between border-b border-[#ede7da] px-6 py-5">
                    <span className="font-serif text-lg text-[#0d1b2a]">Order Tracker</span>
                </div>
                <EmptyState />
            </div>
        );
    }

    const steps       = buildSteps(schedule);
    const itemSummary = schedule.items.length > 0
        ? schedule.items.map(i => `${i.quantity}× ${i.name}`).join(', ')
        : `${schedule.items_count} item(s)`;

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white h-full">
            <div className="flex items-center justify-between border-b border-[#ede7da] px-6 py-5">
                <span className="font-serif text-lg text-[#0d1b2a]">Order Tracker</span>
                <span className="text-xs font-medium text-[#c9a84c]">
                    #{schedule.order_number}
                </span>
            </div>
            <div className="px-6 py-5">
                <p className="mb-5 text-xs text-[#8a9bb0]">
                    Tracking: <span className="font-semibold text-[#0d1b2a]">{itemSummary}</span>
                </p>
                <div className="flex flex-col">
                    {steps.map((step, i) => (
                        <Step key={step.label} {...step} isLast={i === steps.length - 1} />
                    ))}
                </div>
            </div>
        </div>
    );
}