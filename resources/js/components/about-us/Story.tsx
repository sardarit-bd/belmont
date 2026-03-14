import { useI18n } from '@/contexts/I18nContext';

export default function Story() {
    const { t } = useI18n();

    return (
        <div className="bg-white max-w-6xl mx-auto py-5 flex justify-center">
            <div className="w-full bg-white rounded-2xl p-12">
                <div className="mx-auto space-y-8">
                    <h2 className="text-4xl font-serif text-gray-900 text-center">
                        {t('about.story_title')}
                    </h2>
                    <div className="space-y-4 text-gray-700">
                        <p>{t('about.story_p1')}</p>
                        <p>{t('about.story_p2')}</p>
                        <p>{t('about.story_p3')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}