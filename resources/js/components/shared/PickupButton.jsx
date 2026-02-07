

import { Truck } from 'lucide-react';
import { router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function PickupButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 30) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const handlePickupClick = () => {
        router.get('/schedule');
    };

    return (
        <button 
            onClick={handlePickupClick}
            className={`fixed bottom-6 left-6 z-[9999] 
                       bg-purple-700 
                       text-white p-4 rounded-full 
                       shadow-lg transition-all 
                       hover:scale-110 active:scale-95 cursor-pointer
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
            aria-label="Just Schedule pickup"
        >
            <Truck className="w-6 h-6" />
        </button>
    );
}