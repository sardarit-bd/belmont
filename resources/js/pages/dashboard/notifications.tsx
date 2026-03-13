import { usePage, router } from '@inertiajs/react';

interface NotificationData {
    schedule_id:  string;
    status:       string;
    status_label: string;
    message:      string;
    pickup_date:  string;
}

interface Notification {
    id:   string;
    data: NotificationData;
    read: boolean;
    time: string;
}

const STATUS_ICONS: Record<string, string> = {
    confirmed:        '✅',
    picked_up:        '🚗',
    being_cleaned:    '🧺',
    out_for_delivery: '🚚',
    delivered:        '🎉',
    cancelled:        '❌',
};

function NotifRow({ notification, onRead }: { notification: Notification; onRead: (id: string) => void }) {
    const { data, read, time } = notification;
    const icon = STATUS_ICONS[data.status] ?? '📦';

    const handleClick = () => {
        if (!read) onRead(notification.id);
    };

    return (
        <div
            onClick={handleClick}
            className={`flex cursor-pointer gap-3 border-b border-[#ede7da] px-6 py-4 last:border-0 transition-colors hover:bg-[#f7f3ec] ${!read ? 'bg-[#fffdf6]' : ''}`}
        >
            <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${!read ? 'bg-[#c9a84c]' : 'bg-transparent'}`} />
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                    <span className="text-base">{icon}</span>
                    <span className="text-sm font-medium text-[#0d1b2a]">{data.status_label}</span>
                </div>
                <div className="mt-0.5 text-sm leading-snug text-[#0d1b2a]">{data.message}</div>
                <div className="mt-1 text-[11px] text-[#8a9bb0]">
                    #{data.schedule_id.slice(0, 8).toUpperCase()} · {data.pickup_date} · {time}
                </div>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="text-4xl mb-3">🔔</div>
            <p className="text-sm font-medium text-[#0d1b2a] mb-1">No notifications yet</p>
            <p className="text-xs text-[#8a9bb0]">You'll be notified when your order status changes</p>
        </div>
    );
}

export default function Notifications() {
    const { notifications, unreadCount } = usePage<{
        notifications: Notification[];
        unreadCount:   number;
    }>().props;

    const markAsRead = (id: string) => {
        router.post(`/notifications/${id}/read`, {}, {
            preserveScroll: true,
            preserveState:  true,
        });
    };

    const markAllRead = () => {
        if (unreadCount === 0) return;
        router.post('/notifications/read-all', {}, {
            preserveScroll: true,
            preserveState:  true,
        });
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-[#ede7da] bg-white">
            <div className="flex items-center justify-between border-b border-[#ede7da] px-6 py-5">
                <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#0d1b2a]">Notifications</span>
                    {unreadCount > 0 && (
                        <span className="rounded-full bg-[#c9a84c] px-2 py-0.5 text-[10px] font-bold text-white">
                            {unreadCount}
                        </span>
                    )}
                </div>
                {unreadCount > 0 && (
                    <button
                        onClick={markAllRead}
                        className="text-xs font-medium text-[#c9a84c] hover:underline"
                    >
                        Mark all read
                    </button>
                )}
            </div>
            <div>
                {notifications.length === 0 ? (
                    <EmptyState />
                ) : (
                    notifications.map((n) => (
                        <NotifRow key={n.id} notification={n} onRead={markAsRead} />
                    ))
                )}
            </div>
        </div>
    );
}