import { useI18n } from '@/contexts/I18nContext';

const TIER_DEFINITIONS = [
    { id: 'tier1', rangeKey: 'luxury.volume_tier_1_range', discountKey: 'luxury.volume_tier_1_discount', isPremium: false },
    { id: 'tier2', rangeKey: 'luxury.volume_tier_2_range', discountKey: 'luxury.volume_tier_2_discount', isPremium: true  },
    { id: 'tier3', rangeKey: 'luxury.volume_tier_3_range', discountKey: 'luxury.volume_tier_3_discount', isPremium: false },
    { id: 'tier4', rangeKey: 'luxury.volume_tier_4_range', discountKey: 'luxury.volume_tier_4_discount', isPremium: true  },
];

export default function VolumeDiscounts() {
    const { t } = useI18n();

    return (
        <div className="py-20 px-4 bg-gradient-to-b from-purple-50 to-white">
            <section className="max-w-5xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h2 className="text-5xl mb-4">{t('luxury.volume_title')}</h2>
                    <p className="text-gray-600 text-[16px]">{t('luxury.volume_subtitle')}</p>
                </div>

                <div className="grid md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200 rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
                    {TIER_DEFINITIONS.map((tier, index) => (
                        <div
                            key={tier.id}
                            className={`p-6 text-center ${
                                index !== TIER_DEFINITIONS.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''
                            } ${tier.isPremium ? 'bg-purple-50' : 'bg-white'}`}
                        >
                            <div className="text-3xl mb-2">{t(tier.rangeKey)}</div>
                            <div className="text-gray-600 mb-3">{t('luxury.volume_items')}</div>
                            <div className={`text-2xl ${tier.isPremium ? 'text-purple-600' : 'text-[#A855F7]'}`}>
                                {t(tier.discountKey)}
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-600 mt-8">{t('luxury.volume_footer')}</p>
            </section>
        </div>
    );
}