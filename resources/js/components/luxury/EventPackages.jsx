import { useI18n } from '@/contexts/I18nContext';
import { router } from '@inertiajs/react';

const PACKAGE_DEFINITIONS = [
    {
        id:          'wedding',
        labelKey:    'luxury.pkg_wedding_label',
        titleKey:    'luxury.pkg_wedding_title',
        descKey:     'luxury.pkg_wedding_description',
        featureKeys: ['luxury.pkg_wedding_feature_1', 'luxury.pkg_wedding_feature_2', 'luxury.pkg_wedding_feature_3', 'luxury.pkg_wedding_feature_4', 'luxury.pkg_wedding_feature_5', 'luxury.pkg_wedding_feature_6'],
        ctaKey:      'luxury.pkg_wedding_cta',
        featured:    true,
    },
    {
        id:          'corporate',
        titleKey:    'luxury.pkg_corporate_title',
        descKey:     'luxury.pkg_corporate_description',
        featureKeys: ['luxury.pkg_corporate_feature_1', 'luxury.pkg_corporate_feature_2', 'luxury.pkg_corporate_feature_3', 'luxury.pkg_corporate_feature_4', 'luxury.pkg_corporate_feature_5', 'luxury.pkg_corporate_feature_6'],
        ctaKey:      'luxury.pkg_corporate_cta',
        featured:    false,
    },
    {
        id:          'hospitality',
        titleKey:    'luxury.pkg_hospitality_title',
        descKey:     'luxury.pkg_hospitality_description',
        featureKeys: ['luxury.pkg_hospitality_feature_1', 'luxury.pkg_hospitality_feature_2', 'luxury.pkg_hospitality_feature_3', 'luxury.pkg_hospitality_feature_4', 'luxury.pkg_hospitality_feature_5', 'luxury.pkg_hospitality_feature_6'],
        ctaKey:      'luxury.pkg_hospitality_cta',
        featured:    false,
    },
];

export default function EventPackages() {
    const { t } = useI18n();

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50/50">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-5xl mb-2">{t('luxury.packages_title')}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">{t('luxury.packages_subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-4">
                {PACKAGE_DEFINITIONS.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`relative bg-white rounded-xl shadow hover:shadow-lg transition border ${
                            pkg.featured ? 'border-[#361b6b] border-2 shadow-xl' : 'border-gray-200'
                        }`}
                    >
                        {pkg.featured && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-sm whitespace-nowrap">
                                    {t(pkg.labelKey)}
                                </span>
                            </div>
                        )}

                        <div className="p-6">
                            <h3 className="text-2xl mb-2">{t(pkg.titleKey)}</h3>
                            <p className="text-muted-foreground pb-2">{t(pkg.descKey)}</p>
                            <ul className="text-gray-500 text-sm mb-4 space-y-3">
                                {pkg.featureKeys.map((key) => (
                                    <li key={key} className="flex items-start gap-2 text-gray-900 text-[15px]">
                                        <span className="text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true">
                                                <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
                                            </svg>
                                        </span>
                                        {t(key)}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t">
                                <p className="text-[#361b6b] mb-4">{t(pkg.ctaKey)}</p>
                            </div>
                            <button
                                onClick={() => router.visit(`/luxury?package=${pkg.id}#consultation`)}
                                className="w-full bg-[#361b6b] text-white py-2 rounded-lg font-semibold hover:bg-[#5c2baa] transition"
                            >
                                {t('luxury.packages_get_quote')}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}