import { Truck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';
import { Link } from '@inertiajs/react';

export default function PickupButton() {
    const { t } = useI18n();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > 100);
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div className={`fixed bottom-6 left-6 z-[9999] transition-all duration-500 transform 
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}
        >
            <div className="hidden md:block absolute -top-10 left-4 bg-white text-[#361b6b] text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-lg shadow-md border border-[#f3e9ff] whitespace-nowrap animate-bounce">
                {t('common.pickup_button_callout')}
                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-white transform rotate-45 border-b border-r border-[#f3e9ff]" />
            </div>

            <Link
                href="/schedule"
                className="group flex items-center gap-0 md:gap-3 bg-purple-700 text-white p-2 md:pl-3 md:pr-6 md:py-3 rounded-full shadow-2xl shadow-purple-900/50 hover:bg-[#5c2baa] hover:-translate-y-1 transition-all duration-300 active:scale-95 backdrop-blur-sm"
                aria-label={t('common.pickup_button_aria')}
            >
                <div className="p-2 rounded-full group-hover:bg-white/10 transition-colors">
                    <Truck className="w-5 h-5" />
                </div>

                <div className="hidden md:flex flex-col items-start leading-none">
                    <span className="text-[10px] opacity-80 uppercase tracking-widest font-medium">
                        {t('common.pickup_button_book_now')}
                    </span>
                    <span className="font-bold text-sm">
                        {t('common.pickup_button_schedule')}
                    </span>
                </div>
            </Link>
        </div>
    );
}