import { useI18n } from '@/contexts/I18nContext';

const CATEGORY_DEFINITIONS = [
    {
        id:         'designer',
        titleKey:       'luxury.cat_designer_title',
        descriptionKey: 'luxury.cat_designer_description',
        itemKeys:   ['luxury.cat_designer_item_1', 'luxury.cat_designer_item_2', 'luxury.cat_designer_item_3', 'luxury.cat_designer_item_4'],
        color:      'bg-gradient-to-br from-purple-600 to-indigo-600',
        hoverColor: 'hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white" aria-hidden="true">
                <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
                <path d="M5 21h14"/>
            </svg>
        ),
    },
    {
        id:         'wedding',
        titleKey:       'luxury.cat_wedding_title',
        descriptionKey: 'luxury.cat_wedding_description',
        itemKeys:   ['luxury.cat_wedding_item_1', 'luxury.cat_wedding_item_2', 'luxury.cat_wedding_item_3', 'luxury.cat_wedding_item_4'],
        color:      'bg-gradient-to-br from-pink-500 to-purple-600',
        hoverColor: 'hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white" aria-hidden="true">
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
            </svg>
        ),
    },
    {
        id:         'textiles',
        titleKey:       'luxury.cat_textiles_title',
        descriptionKey: 'luxury.cat_textiles_description',
        itemKeys:   ['luxury.cat_textiles_item_1', 'luxury.cat_textiles_item_2', 'luxury.cat_textiles_item_3', 'luxury.cat_textiles_item_4'],
        color:      'bg-gradient-to-br from-indigo-600 to-purple-700',
        hoverColor: 'hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-700',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white" aria-hidden="true">
                <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>
                <path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>
            </svg>
        ),
    },
    {
        id:         'corporate',
        titleKey:       'luxury.cat_corporate_title',
        descriptionKey: 'luxury.cat_corporate_description',
        itemKeys:   ['luxury.cat_corporate_item_1', 'luxury.cat_corporate_item_2', 'luxury.cat_corporate_item_3', 'luxury.cat_corporate_item_4'],
        color:      'bg-gradient-to-br from-purple-700 to-indigo-800',
        hoverColor: 'hover:bg-gradient-to-br hover:from-purple-700 hover:to-indigo-800',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-white" aria-hidden="true">
                <path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/>
                <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/>
                <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/>
            </svg>
        ),
    },
];

export default function ServiceCategories() {
    const { t } = useI18n();

    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 className="text-5xl mb-2">{t('luxury.categories_title')}</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">{t('luxury.categories_subtitle')}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {CATEGORY_DEFINITIONS.map((cat) => (
                    <div key={cat.id} className={`group bg-white rounded-xl p-6 shadow hover:shadow-lg transition upperAnimation ${cat.hoverColor}`}>
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${cat.color} group-hover:border-white group-hover:border-2`}>
                            {cat.icon}
                        </div>
                        <h3 className="mb-3 group-hover:text-white transition-colors">{t(cat.titleKey)}</h3>
                        <p className="text-gray-600 group-hover:text-white/90 transition-colors mb-4">{t(cat.descriptionKey)}</p>
                        <ul className="space-y-2">
                            {cat.itemKeys.map((key) => (
                                <li key={key} className="flex items-center gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:bg-white shrink-0 transition-colors duration-300" />
                                    <span className="text-gray-500 text-sm group-hover:text-white transition-colors duration-300">{t(key)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}