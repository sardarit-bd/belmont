import { Shield, FileText, Lock, Eye } from 'lucide-react';
import AppHeaderLayout from '@/layouts/app/app-header-layout';
import { useI18n, I18nProvider } from '@/contexts/I18nContext';

export default function Privacy() {
    return (
        <I18nProvider>
            <PrivacyInner />
        </I18nProvider>
    );
}

function PrivacyInner() {
    const { t } = useI18n();

    return (
        <AppHeaderLayout>
            <div className="min-h-screen bg-purple-50/20 py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
                <div className="w-full max-w-4xl space-y-8">

                    {/* Header */}
                    <div className="text-center space-y-4">
                        <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                            <Shield className="w-8 h-8 text-[#361b6b]" />
                        </div>
                        <h1 className="mb-4">{t('privacy.title')}</h1>
                        <p className="text-gray-600">{t('privacy.last_updated')}</p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-10">

                        {/* Introduction */}
                        <section className="space-y-4">
                            <h2 className="text-5xl">{t('privacy.intro_title')}</h2>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('privacy.intro_body')}</p>
                        </section>

                        {/* Information We Collect */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-purple-700" />
                                <h3>{t('privacy.collect_title')}</h3>
                            </div>
                            <p className="text-gray-600 font-serif mb-3">{t('privacy.collect_intro')}</p>
                            <ul className="space-y-3 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3,4].map(n => (
                                    <li key={n} className="pl-1">
                                        <span className="font-semibold text-gray-900">{t(`privacy.collect_item_${n}_label`)}</span>{' '}
                                        {t(`privacy.collect_item_${n}`)}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* How We Use */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Lock className="w-5 h-5 text-purple-700" />
                                <h3>{t('privacy.use_title')}</h3>
                            </div>
                            <p className="text-gray-600 font-serif mb-3">{t('privacy.use_intro')}</p>
                            <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3,4,5,6,7].map(n => (
                                    <li key={n} className="pl-1">{t(`privacy.use_item_${n}`)}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Sharing */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Eye className="w-5 h-5 text-purple-700" />
                                <h3>{t('privacy.sharing_title')}</h3>
                            </div>
                            <p className="text-gray-600 font-serif mb-3">{t('privacy.sharing_intro')}</p>
                            <ul className="space-y-3 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3].map(n => (
                                    <li key={n} className="pl-1">
                                        <span className="font-semibold text-gray-900">{t(`privacy.sharing_item_${n}_label`)}</span>{' '}
                                        {t(`privacy.sharing_item_${n}`)}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Security */}
                        <section className="space-y-3">
                            <h3 className="text-xl font-serif text-gray-900">{t('privacy.security_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('privacy.security_body')}</p>
                        </section>

                        {/* Rights */}
                        <section className="space-y-3">
                            <h3>{t('privacy.rights_title')}</h3>
                            <p className="text-gray-600 font-serif mb-3">{t('privacy.rights_intro')}</p>
                            <ul className="space-y-2 list-disc pl-5 text-gray-600 font-serif marker:text-gray-400">
                                {[1,2,3,4,5].map(n => (
                                    <li key={n} className="pl-1">{t(`privacy.rights_item_${n}`)}</li>
                                ))}
                            </ul>
                        </section>

                        {/* Cookies */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('privacy.cookies_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('privacy.cookies_body')}</p>
                        </section>

                        {/* Children */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('privacy.children_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('privacy.children_body')}</p>
                        </section>

                        {/* Changes */}
                        <section className="space-y-3">
                            <h3 className="text-2xl font-serif text-gray-900">{t('privacy.changes_title')}</h3>
                            <p className="text-gray-600 leading-relaxed font-serif">{t('privacy.changes_body')}</p>
                        </section>

                        {/* Contact */}
                        <section className="space-y-4 pt-6 border-t border-gray-100">
                            <h3 className="text-2xl font-serif text-gray-900">{t('privacy.contact_title')}</h3>
                            <p className="text-gray-600 font-serif">{t('privacy.contact_intro')}</p>
                            <div className="text-gray-800 font-serif pl-4 bg-[#f3e9ff] p-4 rounded-xl">
                                <p className="text-gray-700 font-semibold">{t('privacy.contact_name')}</p>
                                <p>{t('privacy.contact_address')}</p>
                                <p>{t('privacy.contact_phone')} <span className="text-purple-700">(508) 580-4610</span></p>
                                <p>{t('privacy.contact_text')}: <span className="text-purple-700">(508) 718-7711</span></p>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </AppHeaderLayout>
    );
}