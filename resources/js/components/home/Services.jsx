import { useState, cloneElement, useRef } from 'react';
import { Shirt, Sparkles, Wind, Package, X, Check } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useI18n } from '@/contexts/I18nContext';

// ← Outside component — static key definitions only, no t() calls here
const SERVICE_DEFINITIONS = [
    {
        id:          'dry_cleaning',
        icon:        <Shirt className="w-8 h-8" />,
        titleKey:       'services.dry_cleaning_title',
        descriptionKey: 'services.dry_cleaning_description',
        processKey:     'services.dry_cleaning_process',
        handles: {
            column1: ['services.dry_cleaning_handle_1', 'services.dry_cleaning_handle_2', 'services.dry_cleaning_handle_3'],
            column2: ['services.dry_cleaning_handle_4', 'services.dry_cleaning_handle_5', 'services.dry_cleaning_handle_6'],
        },
        benefits:      ['services.dry_cleaning_benefit_1', 'services.dry_cleaning_benefit_2', 'services.dry_cleaning_benefit_3', 'services.dry_cleaning_benefit_4'],
        turnaroundKey: 'services.dry_cleaning_turnaround',
    },
    {
        id:          'wash_fold',
        icon:        <Sparkles className="w-8 h-8" />,
        titleKey:       'services.wash_fold_title',
        descriptionKey: 'services.wash_fold_description',
        processKey:     'services.wash_fold_process',
        handles: {
            column1: ['services.wash_fold_handle_1', 'services.wash_fold_handle_2', 'services.wash_fold_handle_3'],
            column2: ['services.wash_fold_handle_4', 'services.wash_fold_handle_5', 'services.wash_fold_handle_6'],
        },
        benefits:      ['services.wash_fold_benefit_1', 'services.wash_fold_benefit_2', 'services.wash_fold_benefit_3', 'services.wash_fold_benefit_4'],
        turnaroundKey: 'services.wash_fold_turnaround',
    },
    {
        id:          'alterations',
        icon:        <Wind className="w-8 h-8" />,
        titleKey:       'services.alterations_title',
        descriptionKey: 'services.alterations_description',
        processKey:     'services.alterations_process',
        handles: {
            column1: ['services.alterations_handle_1', 'services.alterations_handle_2', 'services.alterations_handle_3'],
            column2: ['services.alterations_handle_4', 'services.alterations_handle_5', 'services.alterations_handle_6'],
        },
        benefits:      ['services.alterations_benefit_1', 'services.alterations_benefit_2', 'services.alterations_benefit_3', 'services.alterations_benefit_4'],
        turnaroundKey: 'services.alterations_turnaround',
    },
    {
        id:          'pickup',
        icon:        <Package className="w-8 h-8" />,
        titleKey:       'services.pickup_title',
        descriptionKey: 'services.pickup_description',
        processKey:     'services.pickup_process',
        handles: {
            column1: ['services.pickup_handle_1', 'services.pickup_handle_2', 'services.pickup_handle_3'],
            column2: ['services.pickup_handle_4', 'services.pickup_handle_5', 'services.pickup_handle_6'],
        },
        benefits:      ['services.pickup_benefit_1', 'services.pickup_benefit_2', 'services.pickup_benefit_3', 'services.pickup_benefit_4'],
        turnaroundKey: 'services.pickup_turnaround',
    },
];

export default function Services() {
    const { t } = useI18n();

    // ← Store only the ID, not the whole object
    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [activeDot, setActiveDot]                 = useState(0);
    const scrollRef                                 = useRef(null);

    // ← Always derive from ID — always fresh on every render
    const selectedService = SERVICE_DEFINITIONS.find(s => s.id === selectedServiceId) ?? null;

    const handleScroll = (e) => {
        const container = e.target;
        const index = Math.round(container.scrollLeft / container.offsetWidth);
        setActiveDot(index);
    };

    return (
        <section className="py-24 bg-[#fafafa] font-sans relative" id="services">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#5c2baa]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-5xl text-gray-900 mb-6 tracking-tight">{t('services.title')}</h2>
                    <p className="text-xl text-gray-500 leading-relaxed">{t('services.subtitle')}</p>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-[#5c2baa]/20 shadow-2xl shadow-[#361b6b]/5 overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#361b6b] via-[#5c2baa] to-[#361b6b]" />

                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="overflow-x-auto snap-x snap-mandatory scrollbar-hide md:overflow-visible"
                    >
                        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 md:divide-x md:divide-[#361b6b]/10">
                            {SERVICE_DEFINITIONS.map((service, index) => (
                                <div
                                    key={service.id}
                                    onClick={() => setSelectedServiceId(service.id)} // ← store ID only
                                    className="group relative cursor-pointer p-6 md:p-8 hover:bg-[#fcfaff] transition-all duration-300 flex flex-col h-full w-full flex-shrink-0 snap-center md:w-auto md:[&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-[#361b6b]/10 lg:[&:nth-child(n+3)]:border-t-0"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#f3e9ff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="relative z-10 flex-grow">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#fcfaff] border border-[#5c2baa]/10 rounded-2xl flex items-center justify-center mb-5 md:mb-6 text-[#5c2baa] group-hover:bg-[#361b6b] group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-lg group-hover:shadow-[#361b6b]/20">
                                            {cloneElement(service.icon, { className: 'w-7 h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-6' })}
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-[#361b6b] mb-2 md:mb-3 group-hover:text-[#5c2baa] transition-colors">
                                            {t(service.titleKey)}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4 md:mb-6">
                                            {t(service.descriptionKey)}
                                        </p>
                                    </div>

                                    <div className="relative z-10 mt-auto pt-4 border-t border-transparent group-hover:border-[#361b6b]/10 transition-colors">
                                        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#5c2baa] group-hover:translate-x-2 transition-transform duration-300">
                                            {t('services.learn_more')}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Slider Dots */}
                <div className="flex justify-center items-center gap-2 mt-8 md:hidden">
                    {SERVICE_DEFINITIONS.map((_, i) => (
                        <div
                            key={i}
                            className={`transition-all duration-500 rounded-full ${
                                activeDot === i
                                    ? 'w-8 h-2 bg-gradient-to-r from-[#361b6b] to-[#5c2baa] shadow-md shadow-[#5c2baa]/20'
                                    : 'w-2 h-2 bg-gray-300'
                            }`}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center mt-16">
                    <p className="text-[#361b6b]/60 font-medium mb-6">{t('services.custom_service')}</p>
                    <Link
                        href="/#contact"
                        className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#361b6b] text-white text-md rounded-2xl overflow-hidden transition-transform duration-300 active:scale-95 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {t('services.contact_us')}
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-[#5c2baa] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                    </Link>
                </div>
            </div>

            {/* Modal — always reads from selectedService which is always fresh */}
            {selectedService && (
                <div
                    className="fixed inset-0 bg-[#C4C4C4]/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedServiceId(null)}
                >
                    <div
                        className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-8 py-6 flex items-center justify-between z-10">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#5c2baa] w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#5c2baa]/30">
                                    {cloneElement(selectedService.icon, { className: 'w-6 h-6 text-white' })}
                                </div>
                                <h2 className="text-2xl font-bold text-[#361b6b]">{t(selectedService.titleKey)}</h2>
                            </div>
                            <button
                                onClick={() => setSelectedServiceId(null)}
                                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">

                            {/* Process */}
                            <div className="bg-[#fcfaff] p-6 rounded-2xl border border-[#f3e9ff]">
                                <h3 className="text-[#5c2baa] font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> {t('services.our_process')}
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{t(selectedService.processKey)}</p>
                            </div>

                            {/* What We Handle */}
                            <div>
                                <h3 className="text-[#361b6b] font-bold text-lg mb-4">{t('services.what_we_handle')}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        {selectedService.handles.column1.map((key) => (
                                            <div key={key} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#5c2baa]" />
                                                <span className="text-gray-700 font-medium">{t(key)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        {selectedService.handles.column2.map((key) => (
                                            <div key={key} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#5c2baa]" />
                                                <span className="text-gray-700 font-medium">{t(key)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div>
                                <h3 className="text-[#361b6b] font-bold text-lg mb-4">{t('services.benefits')}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {selectedService.benefits.map((key) => (
                                        <div key={key} className="flex items-center gap-3 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                                            <div className="bg-green-100 text-green-600 rounded-full p-1">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="text-gray-700 text-sm font-medium">{t(key)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Turnaround */}
                            <div className="bg-[#361b6b] rounded-2xl p-6 flex items-start gap-4 text-white shadow-xl shadow-[#361b6b]/10">
                                <div className="bg-white/10 p-2 rounded-lg">
                                    <Wind className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">{t('services.turnaround_time')}</h4>
                                    <p className="text-purple-100/90">{t(selectedService.turnaroundKey)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-6 flex justify-end">
                            <Link
                                href="/checkrate"
                                className="inline-flex items-center justify-center px-8 py-3 bg-[#5c2baa] hover:bg-[#361b6b] text-white rounded-xl font-bold transition-colors shadow-lg shadow-[#5c2baa]/20"
                            >
                                {t('services.check_rates')}
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}