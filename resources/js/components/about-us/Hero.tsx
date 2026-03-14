import { useI18n } from '@/contexts/I18nContext';

export default function Hero() {
    const { t } = useI18n();

    return (
        <section className="relative text-white text-center pt-16 pb-20 px-4 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1635274605638-d44babc08a4f?q=80&w=870&auto=format&fit=crop"
                    alt="Belmont Dry Cleaners"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#361b6b]/85 mix-blend-normal" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center text-gray-900">
                <h1 className="mb-6 text-5xl md:text-6xl text-gray-50 font-bold tracking-tight">
                    {t('about.hero_title')}
                </h1>
                <p className="text-xl mb-8 text-purple-100/90 max-w-3xl mx-auto leading-relaxed">
                    {t('about.hero_subtitle')}
                </p>
            </div>
        </section>
    );
}