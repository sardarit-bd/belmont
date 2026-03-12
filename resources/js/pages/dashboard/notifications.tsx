import { type ReactNode } from 'react';

interface Notification {
    text: ReactNode;
    time: string;
    unread: boolean;
}

const notifications: Notification[] = [
    {
        text: <>Your Saree order <strong>#CP-20471</strong> is ready for delivery!</>,
        time: '15 minutes ago',
        unread: true,
    },
    {
        text: 'Pickup confirmed for tomorrow 12–2 PM at your address.',
        time: '2 hours ago',
        unread: true,
    },
    {
        text: <>You earned <strong>120 reward points</strong> on order #CP-20460.</>,
        time: 'Mar 10 · 2:00 PM',
        unread: false,
    },
    {
        text: 'Special offer: 20% off all winter coats this week only!',
        time: 'Mar 9 · 10:00 AM',
        unread: false,
    },
];

function NotifRow({ text, time, unread }: Notification) {
    return (
        <div className={`flex cursor-pointer gap-3 border-b border-[#ede7da] px-6 py-4 last:border-0 transition-colors hover:bg-[#f7f3ec] ${unread ? 'bg-[#fffdf6]' : ''}`}>
            <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${unread ? 'bg-[#c9a84c]' : 'bg-transparent'}`} />
            <div>
                <div className="text-sm leading-snug text-[#0d1b2a]">{text}</div>
                <div className="mt-1 text-[11px] text-[#8a9bb0]">{time}</div>
            </div>
        </div>
    );
}

export default function Notifications() {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white">
            <div className="flex items-center justify-between border-b border-[#ede7da] px-6 py-5">
                <span className="font-serif text-lg text-[#0d1b2a]">Notifications</span>
                <a href="#" className="text-xs font-medium text-[#c9a84c] hover:underline">Mark all read</a>
            </div>
            <div>
                {notifications.map((n, i) => (
                    <NotifRow key={i} {...n} />
                ))}
            </div>
        </div>
    );
}