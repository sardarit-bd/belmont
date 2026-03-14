import { FileText, AlertCircle } from 'lucide-react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { useI18n } from '@/contexts/I18nContext';
import { I18nProvider } from '@/contexts/I18nContext';

export default function Terms() {
    return (
        <I18nProvider>
            <TermsInner />
        </I18nProvider>
    );
}

function TermsInner() {
    const { t } = useI18n();

    return (
        <AppHeaderLayout>
            <div className="min-h-screen bg-purple-50/20 py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
                <div className="w-full max-w-4xl space-y-8">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                            <FileText className="w-8 h-8 text-[#361b6b]" />
                        </div>
                        <h1 className="mb-4">{t('terms.title')}</h1>
                        <p className="text-gray-600 font-serif">{t('terms.last_updated')}</p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">

                        {/* Agreement */}
                        <section className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">{t('terms.agreement_title')}</h2>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('terms.agreement_body')}</p>
                        </section>

                        {/* Services */}
                        <section className="space-y-4">
                            <h3 className="text-xl font-serif text-gray-900">{t('terms.services_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('terms.services_body')}</p>
                        </section>

                        {/* Pricing */}
                        <section className="space-y-4">
                            <h3 className="text-xl font-serif text-gray-900">{t('terms.pricing_title')}</h3>
                            <ul className="space-y-3 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3,4].map(n => (
                                    <li key={n} className="pl-1">
                                        <span className="font-semibold text-gray-900">{t(`terms.pricing_item_${n}_label`)}</span>{' '}
                                        {t(`terms.pricing_item_${n}`)}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Customer Responsibilities */}
                        <section className="space-y-4">
                            <h3 className="text-xl font-serif text-gray-900">{t('terms.customer_title')}</h3>
                            <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3,4,5].map(n => (
                                    <li key={n} className="pl-1">{t(`terms.customer_item_${n}`)}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Liability */}
                        <section className="space-y-4">
                            <h3 className="text-xl font-serif text-gray-900">{t('terms.liability_title')}</h3>
                            <div className="flex items-center gap-3 bg-[#fefce8] p-4 rounded-lg border border-yellow-200">
                                <AlertCircle className="w-5 h-5 text-yellow-800 shrink-0" />
                                <p className="text-purple-900 font-serif font-medium">{t('terms.liability_important')}</p>
                            </div>
                            <ul className="space-y-3 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3,4,5,6].map(n => (
                                    <li key={n} className="pl-1">
                                        <span className="font-semibold text-gray-900">{t(`terms.liability_item_${n}_label`)}</span>{' '}
                                        {t(`terms.liability_item_${n}`)}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Claims */}
                        <section className="space-y-4">
                            <h3 className="text-xl font-serif text-gray-900">{t('terms.claims_title')}</h3>
                            <p className="text-gray-600 font-serif">{t('terms.claims_intro')}</p>
                            <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3,4].map(n => (
                                    <li key={n} className="pl-1">{t(`terms.claims_item_${n}`)}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Pickup & Delivery */}
                        <section className="space-y-4">
                            <h3 className="text-xl font-serif text-gray-900">{t('terms.pickup_title')}</h3>
                            <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3,4,5].map(n => (
                                    <li key={n} className="pl-1">{t(`terms.pickup_item_${n}`)}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Unclaimed */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('terms.unclaimed_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('terms.unclaimed_body')}</p>
                        </section>

                        {/* Cancellations */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('terms.cancellations_title')}</h3>
                            <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3].map(n => (
                                    <li key={n} className="pl-1">{t(`terms.cancellations_item_${n}`)}</li>
                                ))}
                            </ul>
                        </section>

                        {/* IP */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('terms.ip_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('terms.ip_body')}</p>
                        </section>

                        {/* Changes */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('terms.changes_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('terms.changes_body')}</p>
                        </section>

                        {/* Governing Law */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('terms.governing_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('terms.governing_body')}</p>
                        </section>

                        {/* Contact */}
                        <section className="space-y-4 pt-6 border-t border-gray-100">
                            <h3 className="text-2xl font-serif text-gray-900">{t('terms.contact_title')}</h3>
                            <p className="text-gray-600 font-serif">{t('terms.contact_intro')}</p>
                            <div className="text-gray-800 font-serif pl-4 bg-[#f3e9ff] p-4 rounded-xl">
                                <p className="text-gray-700 font-semibold">{t('terms.contact_name')}</p>
                                <p className="mt-2">{t('terms.contact_address')}</p>
                                <p>{t('terms.contact_phone')}</p>
                                <p>{t('terms.contact_text')}</p>
                                <p className="mt-2 text-md text-gray-600">{t('terms.contact_hours')}</p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}