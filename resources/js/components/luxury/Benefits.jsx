import { Award, Users, Package } from 'lucide-react';
import { useI18n } from '@/contexts/I18nContext';

const BENEFIT_DEFINITIONS = [
    {
        id:      'volume',
        titleKey: 'luxury.benefit_1_title',
        descKey:  'luxury.benefit_1_description',
        icon: <Award className="w-10 h-10 text-white" strokeWidth={1.5} />,
    },
    {
        id:      'support',
        titleKey: 'luxury.benefit_2_title',
        descKey:  'luxury.benefit_2_description',
        icon: <Users className="w-10 h-10 text-white" strokeWidth={1.5} />,
    },
    {
        id:      'whiteglove',
        titleKey: 'luxury.benefit_3_title',
        descKey:  'luxury.benefit_3_description',
        icon: <Package className="w-10 h-10 text-white" strokeWidth={1.5} />,
    },
    {
        id:      'quality',
        titleKey: 'luxury.benefit_4_title',
        descKey:  'luxury.benefit_4_description',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-white" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>
            </svg>
        ),
    },
];

export default function EnterpriseBenefits() {
    const { t } = useI18n();

    return (
        <div className="bg-white flex items-center justify-center p-8 font-sans">
            <section className="max-w-7xl mx-auto w-full py-20 px-4">
                <div className="text-center mb-16 md:mb-20">
                    <h2 className="text-5xl text-[#1a1a1a] mb-6">{t('luxury.benefits_title')}</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">{t('luxury.benefits_subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {BENEFIT_DEFINITIONS.map((benefit) => (
                        <div key={benefit.id} className="flex flex-col items-center text-center group">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#5c2baa] to-[#361b6b] rounded-2xl flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform">
                                {benefit.icon}
                            </div>
                            <h3 className="mb-2">{t(benefit.titleKey)}</h3>
                            <p className="text-gray-600 text-sm">{t(benefit.descKey)}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}