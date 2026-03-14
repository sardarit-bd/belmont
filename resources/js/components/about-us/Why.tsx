import { useI18n } from '@/contexts/I18nContext';

export default function Why() {
    const { t } = useI18n();

    const features = [
        { titleKey: 'about.why_1_title', descKey: 'about.why_1_description' },
        { titleKey: 'about.why_2_title', descKey: 'about.why_2_description' },
        { titleKey: 'about.why_3_title', descKey: 'about.why_3_description' },
    ];

    return (
        <div className="min-h-[50vh] bg-gradient-to-r from-white to-[#f3e9ff] py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="w-full max-w-6xl space-y-10">
                <h2 className="mb-8 text-center text-4xl font-serif">
                    {t('about.why_title')}
                </h2>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {features.map((feature) => (
                        <div
                            key={feature.titleKey}
                            className="bg-white rounded-xl border border-gray-100 px-4 py-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <h3 className="text-xl font-serif text-gray-900 mb-4">{t(feature.titleKey)}</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">{t(feature.descKey)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}