import { createContext, useContext, useCallback } from 'react';
import { usePage, router } from '@inertiajs/react';

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
    const { locale, languages, translations } = usePage().props;

    // t('navigation.home') or t('common.save')
    const t = useCallback((key, replacements = {}) => {
        const [group, ...rest] = key.split('.');
        const subKey = rest.join('.');
        
        let value = translations?.[group]?.[subKey] 
            ?? translations?.['_json']?.[key] 
            ?? key; // Fallback to key itself — never crashes

        // Handle replacements: t('common.welcome', { name: 'John' })
        Object.entries(replacements).forEach(([k, v]) => {
            value = value.replace(`:${k}`, v);
        });

        return value;
    }, [translations]);


    const switchLocale = useCallback((newLocale) => {
        router.post('/language/switch',
            { locale: newLocale },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }, []);

    return (
        <I18nContext.Provider value={{ t, locale, languages, switchLocale }}>
            {children}
        </I18nContext.Provider>
    );
}

// Clean hook — import this everywhere
export const useI18n = () => {
    const ctx = useContext(I18nContext);
    if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
    return ctx;
};