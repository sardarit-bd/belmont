import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Header() {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const languages = [
        { code: 'US', label: 'English' },
        { code: 'ES', label: 'Español' },
        { code: 'BR', label: 'Português' },
        { code: 'FR', label: 'Français' },
        { code: 'CN', label: '中文' },
        { code: 'HT', label: 'Kreyòl' },
    ];

    const navLinks = [
        { href: "/#services", label: "Services" },
        { href: "/#pricing", label: "Pricing" },
        { href: "/#Howitworks", label: "How It Works" },
        { href: "/schedule", label: "Schedule Pickup" },
        { href: "/checkrate", label: "Check Rates" },
        { href: "/luxury", label: "Luxury" },
        { href: "/#contact", label: "Contact" },
    ];

    return (
        <header className="bg-[#fcfaff] border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Main Row */}
                <div className="flex items-center justify-between h-16 lg:h-20">
                    
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            className='h-8 sm:h-10 lg:h-12'
                            src="https://res.cloudinary.com/dg83pvgls/image/upload/v1769664980/belmont_logo_qjiorc.png" 
                            alt="Belmont Dry Cleaners" 
                        />
                    </Link>

                    {/* Desktop Navigation - Single row for large screens */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.label}
                                href={link.href} 
                                className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 xl:px-4 py-2 rounded-md transition-all whitespace-nowrap text-sm xl:text-base font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        
                        {/* Language Selector */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-1.5 text-gray-700 hover:text-purple-600 focus:outline-none hover:bg-purple-50 px-3 py-2 rounded-md transition-all"
                                aria-label="Select language"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                                <span className="text-sm font-medium hidden sm:inline">US</span>
                                <svg className="w-3 h-3 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Language Dropdown */}
                            {isLangOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                                    <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                                        {languages.map((lang) => (
                                            <button 
                                                key={lang.code}
                                                onClick={() => setIsLangOpen(false)}
                                                className="w-full text-left px-4 py-2.5 hover:bg-purple-50 flex items-center gap-3 transition-colors group"
                                            >
                                                <span className="text-gray-500 group-hover:text-purple-600 text-xs uppercase w-6 font-bold">{lang.code}</span>
                                                <span className="text-gray-700 group-hover:text-purple-600 font-medium">{lang.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Hamburger - Shows ONLY on small mobile screens where menu is hidden */}
                        <button
                            className="md:hidden text-gray-700 p-2 rounded-md hover:bg-purple-50 transition-all focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            aria-expanded={isMobileMenuOpen}
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

                {/* Second Row: Tablet Navigation - Shows ONLY on tablets (md to lg breakpoint) */}
                <nav className="hidden md:flex lg:hidden items-center justify-center gap-1 pb-4 border-t border-gray-100 pt-3">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.label}
                            href={link.href} 
                            className="text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-3 py-2 rounded-md transition-all whitespace-nowrap text-sm font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Dropdown - Shows ONLY on small mobile where menu is hidden */}
                <div 
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <nav className="py-4 space-y-1 border-t border-gray-200">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.label}
                                href={link.href} 
                                className="block text-gray-700 hover:text-purple-600 hover:bg-purple-50 px-4 py-3 rounded-md font-medium transition-all"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}