import { Heart, Users, Award, Globe } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';

export default function Value() {
    const { t } = useI18n();

    const values = [
        { icon: <Heart className="w-8 h-8 text-[#361B6B]" />,  titleKey: 'about.value_1_title', descKey: 'about.value_1_description' },
        { icon: <Users className="w-8 h-8 text-[#361B6B]" />,  titleKey: 'about.value_2_title', descKey: 'about.value_2_description' },
        { icon: <Award className="w-8 h-8 text-[#361B6B]" />,  titleKey: 'about.value_3_title', descKey: 'about.value_3_description' },
        { icon: <Globe className="w-8 h-8 text-[#361B6B]" />,  titleKey: 'about.value_4_title', descKey: 'about.value_4_description' },
    ];

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 flex justify-center">
            <div className="w-full max-w-6xl space-y-16">

                {/* Values */}
                <div className="space-y-10">
                    <h2 className="text-center text-4xl font-serif font-medium text-gray-900">
                        {t('about.values_title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => (
                            <div key={value.titleKey} className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="mb-3">{t(value.titleKey)}</h3>
                                <p className="text-gray-600">{t(value.descKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Peruvian Tradition */}
                <div className="w-full bg-[#d9b6ff] rounded-2xl shadow-xl overflow-hidden text-gray-900 p-8 md:p-12 lg:p-16">
                    <div className="max-w-5xl mx-auto space-y-8">
                        <h2 className="mb-6 text-center text-4xl font-serif">
                            {t('about.tradition_title')}
                        </h2>
                        <div className="space-y-4">
                            <p>{t('about.tradition_p1')}</p>
                            <p>{t('about.tradition_p2')}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}