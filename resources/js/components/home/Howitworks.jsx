import { useState, useEffect } from 'react';
import { useI18n } from '@/contexts/I18nContext';

export default function HowItWorks() {
    const { t } = useI18n();
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        {
            number: 1,
            titleKey:       'how_it_works.step_1_title',
            descriptionKey: 'how_it_works.step_1_description',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[#5c2baa]">
                    <path d="M8 2v4"/><path d="M16 2v4"/>
                    <rect width="18" height="18" x="3" y="4" rx="2"/>
                    <path d="M3 10h18"/>
                </svg>
            ),
        },
        {
            number: 2,
            titleKey:       'how_it_works.step_2_title',
            descriptionKey: 'how_it_works.step_2_description',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[#5c2baa]">
                    <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/>
                    <path d="M12 22V12"/>
                    <polyline points="3.29 7 12 12 20.71 7"/>
                    <path d="m7.5 4.27 9 5.15"/>
                </svg>
            ),
        },
        {
            number: 3,
            titleKey:       'how_it_works.step_3_title',
            descriptionKey: 'how_it_works.step_3_description',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-[#5c2baa]">
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
                    <path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>
                </svg>
            ),
        },
    ];

    const benefits = [
        {
            titleKey:       'how_it_works.benefit_1_title',
            descriptionKey: 'how_it_works.benefit_1_description',
        },
        {
            titleKey:       'how_it_works.benefit_2_title',
            descriptionKey: 'how_it_works.benefit_2_description',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [steps.length]);

    return (
        <section id="howitworks" className="py-20 scroll-mt-14 bg-gradient-to-r from-white via-white to-[#F7F0FF]">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl text-gray-900 mb-4">{t('how_it_works.title')}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{t('how_it_works.subtitle')}</p>
                </div>

                {/* Steps Slider */}
                <div className="overflow-hidden md:overflow-visible mb-20 pt-4">
                    <div
                        className="flex md:grid md:grid-cols-3 md:gap-8 transition-transform duration-500 ease-in-out md:!transform-none"
                        style={{ transform: `translateX(-${currentStep * 100}%)` }}
                    >
                        {steps.map((step) => (
                            <div key={step.number} className="w-full flex-shrink-0 md:w-auto text-center">
                                <div className="relative inline-block mb-6">
                                    <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center text-[#5c2baa]">
                                        {step.icon}
                                    </div>
                                    <div className="absolute -top-2 -right-2 bg-[#5c2baa] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                        {step.number}
                                    </div>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">{t(step.titleKey)}</h3>
                                <p className="text-gray-600 leading-relaxed px-4 md:px-0">{t(step.descriptionKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Why Choose Section */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Image — static, no translation needed */}
                    <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                        <img
                            src="https://res.cloudinary.com/dg83pvgls/image/upload/v1769670802/how_g3fmyy.jpg"
                            alt="Dry cleaning facility"
                            className="rounded-2xl shadow-xl w-full"
                        />
                    </div>

                    {/* Right Content */}
                    <div className="order-1 lg:order-2 space-y-6">
                        <h3 className="text-3xl text-gray-900">{t('how_it_works.why_title')}</h3>

                        <div className="space-y-6">
                            {benefits.map((benefit) => (
                                <div key={benefit.titleKey} className="flex items-start gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-[#5c2baa] rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                                            ✓
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block text-lg font-bold text-gray-900 mb-1">
                                            {t(benefit.titleKey)}
                                        </span>
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            {t(benefit.descriptionKey)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}