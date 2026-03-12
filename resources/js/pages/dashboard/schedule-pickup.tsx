'use client';

import { useState } from 'react';

interface TimeSlot {
    label: string;
    disabled?: boolean;
}

interface SlotDay {
    label: string;
    slots: TimeSlot[];
}

const slotDays: SlotDay[] = [
    {
        label: 'Tomorrow — Thu, Mar 13',
        slots: [
            { label: '8–10 AM', disabled: true },
            { label: '10–12 PM' },
            { label: '12–2 PM' },
            { label: '2–4 PM' },
            { label: '4–6 PM' },
        ],
    },
    {
        label: 'Friday, Mar 14',
        slots: [
            { label: '9–11 AM' },
            { label: '11–1 PM' },
            { label: '3–5 PM' },
        ],
    },
];

export default function SchedulePickup() {
    const [selected, setSelected] = useState<string>('12–2 PM');

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white">
            <div className="border-b border-[#ede7da] px-6 py-5">
                <span className="font-serif text-lg text-[#0d1b2a]">Schedule Pickup</span>
            </div>
            <div className="px-6 py-5">
                {slotDays.map((day) => (
                    <div key={day.label} className="mb-4 last:mb-0">
                        <p className="mb-2.5 text-xs font-medium text-[#8a9bb0]">{day.label}</p>
                        <div className="flex flex-wrap gap-2">
                            {day.slots.map((slot) => (
                                <button
                                    key={slot.label}
                                    disabled={slot.disabled}
                                    onClick={() => !slot.disabled && setSelected(slot.label)}
                                    className={`rounded-lg border px-3.5 py-1.5 text-xs font-medium transition-all
                                        ${slot.disabled
                                            ? 'cursor-not-allowed opacity-40 border-[#ede7da] bg-white'
                                            : selected === slot.label
                                                ? 'border-[#c9a84c] bg-[#c9a84c] text-[#0d1b2a]'
                                                : 'border-[#ede7da] bg-white hover:border-[#c9a84c] hover:text-[#c9a84c]'
                                        }`}
                                >
                                    {slot.label}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                <button className="mt-3 w-full rounded-lg bg-[#0d1b2a] py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#243b55]">
                    Confirm Pickup Slot
                </button>
            </div>
        </div>
    );
}