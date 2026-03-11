// import { Link, router } from '@inertiajs/react';
// import { useState, useEffect, useRef } from 'react';
// import { useI18n } from '@/contexts/I18nContext';

// const navLinks = [
//     { href: '/#services',   labelKey: 'navigation.services' },
//     { href: '/#pricing',    labelKey: 'navigation.pricing' },
//     { href: '/#howitworks', labelKey: 'navigation.howitworks' },
//     { href: '/schedule',    labelKey: 'navigation.schedule' },
//     { href: '/checkrate',   labelKey: 'navigation.checkrates' },
//     { href: '/luxury',      labelKey: 'navigation.luxury' },
//     { href: '/#contact',    labelKey: 'navigation.contact' },
// ];

// export default function Header() {
//     const { t, locale, languages, switchLocale } = useI18n();

//     const [isLangOpen, setIsLangOpen]             = useState(false);
//     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//     const [isSwitching, setIsSwitching]           = useState(false);

//     const langRef   = useRef(null);
//     const mobileRef = useRef(null);

//     // Close language dropdown on outside click
//     useEffect(() => {
//         function handleClickOutside(e) {
//             if (langRef.current && !langRef.current.contains(e.target)) {
//                 setIsLangOpen(false);
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     // Close mobile menu on Inertia route change
//     useEffect(() => {
//         const unsubscribe = router.on('start', () => setIsMobileMenuOpen(false));
//         return () => unsubscribe();
//     }, []);

//     // Close mobile menu on resize to desktop
//     useEffect(() => {
//         function handleResize() {
//             if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
//         }
//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     const handleSwitchLocale = (code) => {
//         if (code === locale) {
//             setIsLangOpen(false);
//             return;
//         }
//         setIsSwitching(true);
//         switchLocale(code);
//         setIsLangOpen(false);
//         setTimeout(() => setIsSwitching(false), 800);
//     };

//     const currentLang = languages[locale];

//     return (
//         <header className="bg-[#fcfaff] border-b border-gray-200 sticky top-0 z-50 shadow-sm">
//             <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

//                 {/* ── Main Row ── */}
//                 <div className="flex items-center justify-between h-16 lg:h-20">

//                     {/* Logo */}
//                     <Link href="/" className="flex items-center flex-shrink-0">
//                         <img
//                             className="h-8 sm:h-10 lg:h-12"
//                             src="https://res.cloudinary.com/dg83pvgls/image/upload/v1769664980/belmont_logo_qjiorc.png"
//                             alt="Belmont Dry Cleaners"
//                         />
//                     </Link>

//                     {/* Desktop Navigation */}
//                     <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
//                         {navLinks.map((link) => (
//                             <Link
//                                 key={link.labelKey}
//                                 href={link.href}
//                                 className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 xl:px-4 py-2 rounded-md transition-all whitespace-nowrap text-sm xl:text-base font-medium"
//                             >
//                                 {t(link.labelKey)}
//                             </Link>
//                         ))}
//                     </nav>

//                     {/* Right Side */}
//                     <div className="flex items-center gap-2 sm:gap-4">

//                         {/* ── Language Selector ── */}
//                         <div className="relative" ref={langRef}>
//                             <button
//                                 onClick={() => setIsLangOpen((prev) => !prev)}
//                                 disabled={isSwitching}
//                                 className="flex items-center gap-1.5 text-gray-700 hover:text-purple-600 focus:outline-none hover:bg-purple-50 px-3 py-2 rounded-md transition-all disabled:opacity-50 disabled:cursor-wait"
//                                 aria-label="Select language"
//                                 aria-expanded={isLangOpen}
//                                 aria-haspopup="listbox"
//                             >
//                                 {/* Spinner while switching / Globe icon */}
//                                 {isSwitching ? (
//                                     <svg
//                                         className="w-5 h-5 animate-spin text-purple-600"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
//                                     </svg>
//                                 ) : (
//                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
//                                     </svg>
//                                 )}

//                                 {/* Active locale label */}
//                                 <span className="text-sm font-medium hidden sm:inline">
//                                     {currentLang?.flag ?? ''}&nbsp;{locale.toUpperCase()}
//                                 </span>

//                                 {/* Chevron */}
//                                 <svg
//                                     className={`w-3 h-3 hidden sm:inline transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
//                                     fill="none"
//                                     stroke="currentColor"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                 </svg>
//                             </button>

//                             {/* Dropdown */}
//                             {isLangOpen && (
//                                 <div
//                                     role="listbox"
//                                     aria-label="Language options"
//                                     className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50"
//                                 >
//                                     {Object.entries(languages).map(([code, lang]) => {
//                                         const isActive = code === locale;
//                                         return (
//                                             <button
//                                                 key={code}
//                                                 role="option"
//                                                 aria-selected={isActive}
//                                                 onClick={() => handleSwitchLocale(code)}
//                                                 className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors
//                                                     first:rounded-t-xl last:rounded-b-xl
//                                                     ${isActive
//                                                         ? 'bg-purple-50 text-purple-700'
//                                                         : 'hover:bg-purple-50 text-gray-700 hover:text-purple-600'
//                                                     }`}
//                                             >
//                                                 <span className="text-base w-6 text-center">{lang.flag}</span>
//                                                 <span className="font-medium flex-1">{lang.name}</span>
//                                                 {isActive && (
//                                                     <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
//                                                     </svg>
//                                                 )}
//                                             </button>
//                                         );
//                                     })}
//                                 </div>
//                             )}
//                         </div>

//                         {/* ── Hamburger (mobile only) ── */}
//                         <button
//                             className="md:hidden text-gray-700 p-2 rounded-md hover:bg-purple-50 transition-all focus:outline-none"
//                             onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//                             aria-label="Toggle menu"
//                             aria-expanded={isMobileMenuOpen}
//                             aria-controls="mobile-menu"
//                         >
//                             {isMobileMenuOpen ? (
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             ) : (
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                                 </svg>
//                             )}
//                         </button>
//                     </div>
//                 </div>

//                 {/* ── Tablet Navigation (md → lg) ── */}
//                 <nav className="hidden md:flex lg:hidden items-center justify-center gap-1 pb-4 border-t border-gray-100 pt-3">
//                     {navLinks.map((link) => (
//                         <Link
//                             key={link.labelKey}
//                             href={link.href}
//                             className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md transition-all whitespace-nowrap text-sm font-medium"
//                         >
//                             {t(link.labelKey)}
//                         </Link>
//                     ))}
//                 </nav>

//                 {/* ── Mobile Menu ── */}
//                 <div
//                     id="mobile-menu"
//                     ref={mobileRef}
//                     className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
//                         isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
//                     }`}
//                 >
//                     <nav className="py-4 space-y-1 border-t border-gray-200">
//                         {navLinks.map((link) => (
//                             <Link
//                                 key={link.labelKey}
//                                 href={link.href}
//                                 className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-md font-medium transition-all"
//                                 onClick={() => setIsMobileMenuOpen(false)}
//                             >
//                                 {t(link.labelKey)}
//                             </Link>
//                         ))}

//                         {/* Language switcher inside mobile menu */}
//                         <div className="border-t border-gray-100 pt-3 mt-3">
//                             <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                                 {t('common.language')}
//                             </p>
//                             <div className="grid grid-cols-2 gap-1 px-2">
//                                 {Object.entries(languages).map(([code, lang]) => {
//                                     const isActive = code === locale;
//                                     return (
//                                         <button
//                                             key={code}
//                                             onClick={() => {
//                                                 handleSwitchLocale(code);
//                                                 setIsMobileMenuOpen(false);
//                                             }}
//                                             className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
//                                                 ${isActive
//                                                     ? 'bg-purple-100 text-purple-700 ring-1 ring-purple-300'
//                                                     : 'hover:bg-purple-50 text-gray-700 hover:text-purple-600'
//                                                 }`}
//                                         >
//                                             <span>{lang.flag}</span>
//                                             <span className="truncate">{lang.name}</span>
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </nav>
//                 </div>

//             </div>
//         </header>
//     );
// }

import { Link, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { useI18n } from '@/contexts/I18nContext';

const navLinks = [
    { href: '/#services',   labelKey: 'navigation.services' },
    { href: '/#pricing',    labelKey: 'navigation.pricing' },
    { href: '/#howitworks', labelKey: 'navigation.howitworks' },
    { href: '/schedule',    labelKey: 'navigation.schedule' },
    { href: '/checkrate',   labelKey: 'navigation.checkrates' },
    { href: '/luxury',      labelKey: 'navigation.luxury' },
    { href: '/#contact',    labelKey: 'navigation.contact' },
];

export default function Header() {
    const { t, locale, languages, switchLocale } = useI18n();

    const [isLangOpen, setIsLangOpen]             = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSwitching, setIsSwitching]           = useState(false);

    const langRef   = useRef(null);
    const mobileRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (langRef.current && !langRef.current.contains(e.target)) {
                setIsLangOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const unsubscribe = router.on('start', () => setIsMobileMenuOpen(false));
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSwitchLocale = (code) => {
        if (code === locale) {
            setIsLangOpen(false);
            return;
        }
        setIsSwitching(true);
        switchLocale(code);
        setIsLangOpen(false);
        setTimeout(() => setIsSwitching(false), 800);
    };

    const currentLang = languages[locale];

    return (
        <header className="bg-[#fcfaff] border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Main Row ── */}
                <div className="flex items-center justify-between h-16 lg:h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center flex-shrink-0">
                        <img
                            className="h-8 sm:h-10 lg:h-12"
                            src="https://res.cloudinary.com/dg83pvgls/image/upload/v1769664980/belmont_logo_qjiorc.png"
                            alt="Belmont Dry Cleaners"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.labelKey}
                                href={link.href}
                                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 xl:px-4 py-2 rounded-md transition-all whitespace-nowrap text-sm xl:text-base font-medium"
                            >
                                {t(link.labelKey)}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        {/* ── Language Selector ── */}
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setIsLangOpen((prev) => !prev)}
                                disabled={isSwitching}
                                className="flex items-center gap-1.5 text-gray-700 hover:text-purple-600 focus:outline-none hover:bg-purple-50 px-3 py-2 rounded-md transition-all disabled:opacity-50 disabled:cursor-wait"
                                aria-label="Select language"
                                aria-expanded={isLangOpen}
                                aria-haspopup="listbox"
                            >
                                {isSwitching ? (
                                    <svg className="w-5 h-5 animate-spin text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                )}
                                <span className="text-sm font-medium hidden sm:inline">
                                    {currentLang?.flag ?? ''}&nbsp;{locale.toUpperCase()}
                                </span>
                                <svg
                                    className={`w-3 h-3 hidden sm:inline transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown */}
                            {isLangOpen && (
                                <div
                                    role="listbox"
                                    aria-label="Language options"
                                    className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50"
                                >
                                    {Object.entries(languages).map(([code, lang]) => {
                                        const isActive = code === locale;
                                        return (
                                            <button
                                                key={code}
                                                role="option"
                                                aria-selected={isActive}
                                                onClick={() => handleSwitchLocale(code)}
                                                className={`w-full text-left px-4 py-2.5 flex items-center gap-3 transition-colors
                                                    first:rounded-t-xl last:rounded-b-xl
                                                    ${isActive
                                                        ? 'bg-purple-50 text-purple-700'
                                                        : 'hover:bg-purple-50 text-gray-700 hover:text-purple-600'
                                                    }`}
                                            >
                                                <span className="text-base w-6 text-center">{lang.flag}</span>
                                                <span className="font-medium flex-1">{lang.name}</span>
                                                {isActive && (
                                                    <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* ── Login Button ── */}
                        <Link
                            href="/login"
                            className="hidden sm:flex items-center gap-2 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md whitespace-nowrap group"
                        >
                            {/* Person icon */}
                            <svg
                                className="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="hidden md:inline">{t('navigation.login')}</span>
                            {/* On sm screens show just icon — already handled by hidden sm:flex + hidden md:inline text */}
                        </Link>

                        {/* ── Login icon-only button on xs (mobile, before hamburger) ── */}
                        <Link
                            href="/login"
                            className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white transition-all duration-200 shadow-sm"
                            aria-label="Login"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </Link>

                        {/* ── Hamburger (mobile only) ── */}
                        <button
                            className="md:hidden text-gray-700 p-2 rounded-md hover:bg-purple-50 transition-all focus:outline-none"
                            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* ── Tablet Navigation (md → lg) ── */}
                <nav className="hidden md:flex lg:hidden items-center justify-center gap-1 pb-4 border-t border-gray-100 pt-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.labelKey}
                            href={link.href}
                            className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md transition-all whitespace-nowrap text-sm font-medium"
                        >
                            {t(link.labelKey)}
                        </Link>
                    ))}
                </nav>

                {/* ── Mobile Menu ── */}
                <div
                    id="mobile-menu"
                    ref={mobileRef}
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <nav className="py-4 space-y-1 border-t border-gray-200">
                        {navLinks.map((link) => (
                            <Link
                                key={link.labelKey}
                                href={link.href}
                                className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-md font-medium transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t(link.labelKey)}
                            </Link>
                        ))}

                        {/* ── Login CTA inside mobile menu ── */}
                        <div className="px-2 pt-1">
                            <Link
                                href="/login"
                                className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                {t('navigation.login')}
                            </Link>
                        </div>

                        {/* Language switcher inside mobile menu */}
                        {/* <div className="border-t border-gray-100 pt-3 mt-3">
                            <p className="px-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                {t('common.language')}
                            </p>
                            <div className="grid grid-cols-2 gap-1 px-2">
                                {Object.entries(languages).map(([code, lang]) => {
                                    const isActive = code === locale;
                                    return (
                                        <button
                                            key={code}
                                            onClick={() => {
                                                handleSwitchLocale(code);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                                                ${isActive
                                                    ? 'bg-purple-100 text-purple-700 ring-1 ring-purple-300'
                                                    : 'hover:bg-purple-50 text-gray-700 hover:text-purple-600'
                                                }`}
                                        >
                                            <span>{lang.flag}</span>
                                            <span className="truncate">{lang.name}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div> */}
                    </nav>
                </div>

            </div>
        </header>
    );
}