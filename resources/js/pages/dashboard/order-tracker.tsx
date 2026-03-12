type StepState = 'done' | 'active' | 'pending';

interface TrackStep {
    label: string;
    time: string;
    state: StepState;
}

const steps: TrackStep[] = [
    { label: 'Order Placed',               time: 'Mar 10 · 9:30 AM',              state: 'done'    },
    { label: 'Picked Up from Your Address', time: 'Mar 11 · 11:00 AM',            state: 'done'    },
    { label: 'Cleaning in Progress',        time: 'In progress · Est. done by 5 PM', state: 'active' },
    { label: 'Quality Check',               time: 'Pending',                       state: 'pending' },
    { label: 'Out for Delivery',            time: 'Expected: Mar 13, 2–5 PM',      state: 'pending' },
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
                <div className="text-sm font-medium text-[#0d1b2a]">{label}</div>
                <div className="mt-0.5 text-[11px] text-[#8a9bb0]">{time}</div>
            </div>
        </div>
    );
}

export default function OrderTracker() {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white h-full">
            <div className="flex items-center justify-between border-b border-[#ede7da] px-6 py-5">
                <span className="font-serif text-lg text-[#0d1b2a]">Order Tracker</span>
                <a href="#" className="text-xs font-medium text-[#c9a84c] hover:underline">CP-20483</a>
            </div>
            <div className="px-6 py-5">
                <p className="mb-5 text-xs text-[#8a9bb0]">
                    Tracking: <span className="font-semibold text-[#0d1b2a]">3× Dress Shirts + 1 Blazer</span>
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