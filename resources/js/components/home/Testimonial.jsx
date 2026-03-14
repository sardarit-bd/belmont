import { useI18n } from '@/contexts/I18nContext';
import { useEffect, useRef, useState, useCallback } from 'react';

function StarIcon({ filled }) {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" style={{ opacity: filled ? 1 : 0.2 }}>
            <polygon
                points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
                fill="#534AB7"
            />
        </svg>
    );
}

function initials(name) {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2);
}

function getPerView(width) {
    if (width >= 900) return 3;
    if (width >= 640) return 2;
    return 1;
}

export default function Testimonial({ testimonials = [] }) {
    const { t } = useI18n();
    const trackRef  = useRef(null);
    const wrapRef   = useRef(null);
    const timerRef  = useRef(null);

    const [current,  setCurrent]  = useState(0);
    const [perView,  setPerView]  = useState(1);

    const maxIndex = Math.max(0, testimonials.length - perView);

    const goTo = useCallback((idx) => {
        const pv  = getPerView(wrapRef.current?.offsetWidth || 0);
        const max = Math.max(0, testimonials.length - pv);
        const next = Math.max(0, Math.min(idx, max));
        setCurrent(next);
        setPerView(pv);
        if (trackRef.current) {
            trackRef.current.style.transform = `translateX(-${(100 / pv) * next}%)`;
        }
    }, [testimonials.length]);

    const resetAuto = useCallback(() => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrent(prev => {
                const pv  = getPerView(wrapRef.current?.offsetWidth || 0);
                const max = Math.max(0, testimonials.length - pv);
                const next = prev >= max ? 0 : prev + 1;
                if (trackRef.current) {
                    trackRef.current.style.transform = `translateX(-${(100 / pv) * next}%)`;
                }
                return next;
            });
        }, 4000);
    }, [testimonials.length]);

    useEffect(() => {
        const pv = getPerView(wrapRef.current?.offsetWidth || 0);
        setPerView(pv);
        resetAuto();
        return () => clearInterval(timerRef.current);
    }, [resetAuto]);

    useEffect(() => {
        const ro = new ResizeObserver(() => {
            const pv = getPerView(wrapRef.current?.offsetWidth || 0);
            setPerView(pv);
            goTo(current);
        });
        if (wrapRef.current) ro.observe(wrapRef.current);
        return () => ro.disconnect();
    }, [current, goTo]);

    const handlePrev = () => { goTo(current - 1); resetAuto(); };
    const handleNext = () => { goTo(current + 1); resetAuto(); };

    const dotCount = maxIndex + 1;

    return (
        <section id="testimonials" className="py-20 bg-gradient-to-r from-white via-[#FBF8FF] to-[#F7EEFF]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl text-gray-900 mb-4 tracking-tight">
                        {t('testimonial.title')}
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        {t('testimonial.subtitle')}
                    </p>
                </div>

                {/* Slider */}
                <div ref={wrapRef} className="overflow-hidden">
                    <div
                        ref={trackRef}
                        className="flex"
                        style={{ transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)' }}
                    >
                        {testimonials.map((testimonial) => (
                            <div
                                key={testimonial.id}
                                className="flex-shrink-0 px-3 box-border"
                                style={{ width: `${100 / perView}%` }}
                            >
                                <div className="bg-white border border-gray-100 rounded-2xl p-7 h-full flex flex-col shadow-sm">
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-5">
                                        {[...Array(5)].map((_, i) => (
                                            <StarIcon key={i} filled={i < testimonial.rating} />
                                        ))}
                                    </div>

                                    {/* Quote */}
                                    <p className="text-gray-700 leading-relaxed text-[15px] flex-1 mb-6 font-serif">
                                        "{testimonial.text}"
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-[12px] font-semibold text-[#3C3489] shrink-0">
                                            {initials(testimonial.name)}
                                        </div>
                                        <div>
                                            <p className="text-[13px] font-semibold text-gray-900 leading-tight">
                                                {testimonial.name}
                                            </p>
                                            <p className="text-[12px] text-gray-500 leading-tight mt-0.5">
                                                {testimonial.title}
                                                {testimonial.company && (
                                                    <span className="text-gray-400"> · {testimonial.company}</span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={handlePrev}
                        className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-purple-50 flex items-center justify-center transition-colors"
                        aria-label="Previous"
                    >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    {/* Dots */}
                    <div className="flex gap-1.5 items-center">
                        {Array.from({ length: dotCount }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => { goTo(i); resetAuto(); }}
                                className="h-1.5 rounded-full transition-all duration-300 border-none cursor-pointer"
                                style={{
                                    width:      i === current ? '20px' : '6px',
                                    background: i === current ? '#534AB7' : '#D1D5DB',
                                }}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={handleNext}
                        className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-purple-50 flex items-center justify-center transition-colors"
                        aria-label="Next"
                    >
                        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                    </button>
                </div>

            </div>
        </section>
    );
}