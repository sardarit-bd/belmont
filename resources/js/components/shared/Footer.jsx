import { Link } from '@inertiajs/react';
import { useI18n } from '@/contexts/I18nContext';

export default function Footer() {
    const { t } = useI18n();

    const services = [
        'footer.dry_cleaning',
        'footer.wash_fold',
        'footer.alterations',
        'footer.stain_removal',
    ];

    const quickLinks = [
        { href: '/about-us',       labelKey: 'footer.about_us' },
        { href: '/#contact',       labelKey: 'footer.contact_us' },
        { href: '/privacy-policy', labelKey: 'footer.privacy_policy' },
        { href: '/terms',          labelKey: 'footer.terms' },
        { href: '/faq',            labelKey: 'footer.faqs' },
        { href: '/refund',         labelKey: 'footer.refund_policy' },
    ];

    return (
        <footer className="bg-[#361b6b] text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">

                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            <div className="w-36 h-10 rounded-lg flex items-center justify-center">
                                <img src="/images/footer.png" alt="Logo" />
                            </div>
                        </div>
                        <p className="mb-4">
                            {t('footer.description')}
                        </p>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-lg mb-4">{t('footer.services_title')}</h3>
                        <ul className="space-y-2">
                            {services.map((key) => (
                                <li key={key}>
                                    <button
                                        type="button"
                                        className="text-purple-100 hover:text-white transition-colors"
                                    >
                                        {t(key)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-lg mb-4">{t('footer.quick_links')}</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-purple-100 hover:text-white transition-colors"
                                    >
                                        {t(link.labelKey)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-[#f3e9ff] pt-8 text-center">
                    <p className="text-purple-200">
                        {t('footer.copyright', { year: new Date().getFullYear() })}
                    </p>
                </div>
            </div>
        </footer>
    );
}