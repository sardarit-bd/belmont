'use client';

import { Link } from '@inertiajs/react';
import { useI18n } from '@/contexts/I18nContext';

export default function Pricing() {
    const { t } = useI18n();

    const sneakPeekItems = [
        { nameKey: 'pricing.item_suit',   price: '$16.25' },
        { nameKey: 'pricing.item_dress',  price: '$15.00' },
        { nameKey: 'pricing.item_pants',  price: '$8.00'  },
        { nameKey: 'pricing.item_blouse', price: '$8.25'  },
    ];

    return (
        <section id="pricing" className="relative py-24 bg-[#fafafa] overflow-hidden font-sans">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#5c2baa]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[#361b6b]/5 blur-[100px] rounded-full pointer-events-none -z-10 translate-y-1/3 translate-x-1/4" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* HEADER */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-5xl text-gray-900 mb-6 tracking-tight">
                        {t('pricing.title')}
                    </h2>
                    <p className="text-md text-gray-500 leading-relaxed">
                        {t('pricing.subtitle')}
                    </p>
                </div>

                {/* SNEAK PEEK CARD */}
                <div className="relative max-w-4xl mx-auto mb-16">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#5c2baa] to-[#361b6b] rounded-[2.5rem] opacity-20 blur-lg" />
                    <div className="relative bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/80 p-8 md:p-12 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

                            {/* Left */}
                            <div className="space-y-6">
                                <h3 className="text-3xl font-bold text-[#361b6b]">
                                    {t('pricing.sneak_title')}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t('pricing.sneak_description')}
                                </p>
                            </div>

                            {/* Right: Price list */}
                            <div className="bg-white/80 rounded-2xl p-6 border border-[#5c2baa]/10 shadow-lg shadow-[#361b6b]/5">
                                <div className="space-y-4">
                                    {sneakPeekItems.map((item) => (
                                        <div key={item.nameKey} className="flex items-baseline justify-between">
                                            <span className="text-[#361b6b] font-medium">{t(item.nameKey)}</span>
                                            <div className="flex-grow mx-3 border-b border-dotted border-[#361b6b]/30" />
                                            <span className="text-[#5c2baa] font-bold">{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                    <Link
                        href="/checkrate"
                        className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#361b6b] text-white text-md rounded-2xl overflow-hidden transition-transform duration-300 active:scale-95 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {t('pricing.cta')}
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-[#5c2baa] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                    </Link>

                    <p className="text-sm text-[#361b6b]/50 italic">
                        {t('pricing.note')}
                    </p>
                </div>
            </div>
        </section>
    );
}