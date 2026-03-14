import { DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import AppHeaderLayout from "@/layouts/app/app-header-layout";
import { useI18n, I18nProvider } from '@/contexts/I18nContext';

export default function Refund() {
    return (
        <I18nProvider>
            <RefundInner />
        </I18nProvider>
    );
}

function RefundInner() {
    const { t } = useI18n();

    return (
        <AppHeaderLayout>
            <div className="min-h-screen bg-gradient-to-br from-white via-white to-[#F4E9FF] py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
                <div className="w-full max-w-4xl space-y-8">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                            <DollarSign className="w-8 h-8 text-[#361b6b]" />
                        </div>
                        <h1 className="mb-4">{t('refund.title')}</h1>
                        <p className="text-gray-600 font-serif">{t('refund.last_updated')}</p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">

                        {/* Commitment */}
                        <section className="space-y-4">
                            <h2 className="text-4xl font-serif text-gray-900 leading-tight">{t('refund.commitment_title')}</h2>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('refund.commitment_body')}</p>
                        </section>

                        {/* Guarantee */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-6 h-6 text-purple-700" />
                                <h3 className="text-xl font-serif text-gray-900 font-medium">{t('refund.guarantee_title')}</h3>
                            </div>
                            <p className="text-gray-600 font-serif mb-2 pl-9">{t('refund.guarantee_intro')}</p>
                            <ul className="space-y-2 list-disc pl-14 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3].map(n => (
                                    <li key={n} className="pl-1">{t(`refund.guarantee_item_${n}`)}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Eligibility */}
                        <section className="space-y-4">
                            <h3 className="font-serif text-gray-900">{t('refund.eligibility_title')}</h3>
                            <p className="text-gray-600 font-serif">{t('refund.eligibility_intro')}</p>
                            <div className="bg-purple-50/50 rounded-xl p-6 space-y-4 border border-purple-100">
                                {[1,2,3,4].map(n => (
                                    <div key={n} className="flex gap-3">
                                        <CheckCircle className="w-5 h-5 text-purple-700 flex-shrink-0 mt-0.5" />
                                        <p className="text-gray-700 font-serif">
                                            <span className="font-semibold text-gray-900">{t(`refund.eligibility_item_${n}_label`)}</span>{' '}
                                            {t(`refund.eligibility_item_${n}`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Non-Refundable */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-yellow-600" />
                                <h3 className="text-xl font-serif text-gray-900 font-medium">{t('refund.nonrefund_title')}</h3>
                            </div>
                            <p className="text-gray-600 font-serif mb-2 pl-9">{t('refund.nonrefund_intro')}</p>
                            <ul className="space-y-3 list-disc pl-14 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3,4,5,6,7,8].map(n => (
                                    <li key={n} className="pl-1">{t(`refund.nonrefund_item_${n}`)}</li>
                                ))}
                            </ul>
                        </section>

                        {/* How to Request */}
                        <section className="space-y-4">
                            <h3 className="text-xl font-serif text-gray-900">{t('refund.request_title')}</h3>
                            <ol className="space-y-4 list-decimal pl-5 text-gray-600 font-serif marker:font-semibold marker:text-gray-900">
                                {[1,2,3,4,5].map(n => (
                                    <li key={n} className="pl-2">
                                        <span className="font-semibold text-gray-900">{t(`refund.request_item_${n}_label`)}</span>{' '}
                                        {t(`refund.request_item_${n}`)}
                                    </li>
                                ))}
                            </ol>
                        </section>

                        {/* Processing Time */}
                        <section className="space-y-4">
                            <h3 className="font-serif text-gray-900">{t('refund.processing_title')}</h3>
                            <p className="text-gray-600 font-serif mb-2">{t('refund.processing_intro')}</p>
                            <ul className="space-y-3 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3].map(n => (
                                    <li key={n} className="pl-1">
                                        <span className="font-semibold text-gray-900">{t(`refund.processing_item_${n}_label`)}</span>{' '}
                                        {t(`refund.processing_item_${n}`)}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Partial */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('refund.partial_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('refund.partial_body')}</p>
                        </section>

                        {/* Pickup Fees */}
                        <section className="space-y-3">
                            <h3 className="font-serif text-gray-900">{t('refund.pickup_title')}</h3>
                            <p className="text-gray-600 font-serif mb-2">{t('refund.pickup_intro')}</p>
                            <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3].map(n => (
                                    <li key={n} className="pl-1">{t(`refund.pickup_item_${n}`)}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Alterations */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('refund.alterations_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('refund.alterations_body')}</p>
                        </section>

                        {/* Damage */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('refund.damage_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('refund.damage_body')}</p>
                        </section>

                        {/* Disputes */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('refund.disputes_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('refund.disputes_body')}</p>
                        </section>

                        {/* Contact */}
                        <section className="space-y-4 pt-6 border-t border-gray-100">
                            <h3 className="text-2xl font-serif text-gray-900">{t('refund.contact_title')}</h3>
                            <p className="text-gray-600 font-serif">{t('refund.contact_intro')}</p>
                            <div className="text-gray-800 font-serif pl-4 bg-[#FAF5FF] p-6 rounded-xl border border-purple-50">
                                <p className="text-gray-900 font-bold mb-2">{t('refund.contact_name')}</p>
                                <p className="text-gray-700">{t('refund.contact_address')}</p>
                                <p className="text-gray-700">{t('refund.contact_phone')}: <span className="text-purple-700">(508) 580-4610</span></p>
                                <p className="text-gray-700">{t('refund.contact_text')}: <span className="text-purple-700">(508) 718-7711</span></p>
                                <p className="mt-2 text-md text-gray-600">{t('refund.contact_hours')}</p>
                            </div>
                        </section>

                    </div>

                    {/* Bottom Note */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                        <p className="text-gray-700 font-serif text-sm md:text-base">
                            <span className="font-bold text-gray-900">{t('refund.note_label')}</span>{' '}
                            {t('refund.note')}
                        </p>
                    </div>

                </div>
            </div>
        </AppHeaderLayout>
    );
}