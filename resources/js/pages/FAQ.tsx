import { useState } from 'react';
import { HelpCircle, Plus, Minus } from 'lucide-react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { useI18n, I18nProvider } from '@/contexts/I18nContext';

export default function Faq() {
    return (
        <I18nProvider>
            <FaqInner />
        </I18nProvider>
    );
}

function FaqInner() {
    const { t } = useI18n();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = Array.from({ length: 20 }, (_, i) => ({
        question: t(`faq.q${i + 1}`),
        answer:   t(`faq.a${i + 1}`),
    }));

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <AppHeaderLayout>
            <div className="min-h-screen bg-purple-50/20 py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
                <div className="w-full max-w-4xl space-y-12">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                            <HelpCircle className="w-8 h-8 text-[#361b6b]" />
                        </div>
                        <h1 className="mb-4">{t('faq.title')}</h1>
                        <p className="text-gray-600 font-serif max-w-2xl mx-auto">{t('faq.subtitle')}</p>
                    </div>

                    {/* Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200"
                            >
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-purple-50 transition-colors"
                                >
                                    <span className="text-left pr-4">{faq.question}</span>
                                    <div className="flex-shrink-0 text-purple-600">
                                        {openIndex === index
                                            ? <Minus className="w-5 h-5" />
                                            : <Plus className="w-5 h-5" />
                                        }
                                    </div>
                                </button>

                                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                                    openIndex === index
                                        ? 'max-h-96 opacity-100 pb-6 border-t border-gray-100'
                                        : 'max-h-0 opacity-0'
                                }`}>
                                    <p className="text-gray-600 font-serif leading-relaxed pr-8 pt-2">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </AppHeaderLayout>
    );
}