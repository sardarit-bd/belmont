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
        <header className="bg-[#fcfaff] border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    
                    {/* Left Side: Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            className='h-[40px] md:h-[50px]'
                            src="https://res.cloudinary.com/dg83pvgls/image/upload/v1769664980/belmont_logo_qjiorc.png" alt="Logo" />
                    </Link>

                    {/* Middle: Desktop Navigation (Hidden on Mobile) */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.label}
                                href={link.href} 
                                className="text-gray-700 hover:text-purple-600 transition"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side: Language & Hamburger */}
                    <div className="flex items-center gap-4">
                        
                        {/* Language Selector */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center text-gray-700 hover:text-purple-600 focus:outline-none"
                            >
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                                <span>US</span>
                            </button>

                            {/* Language Dropdown */}
                            {isLangOpen && (
                                <div className="absolute top-full right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                                    {languages.map((lang) => (
                                        <button 
                                            key={lang.code}
                                            onClick={() => setIsLangOpen(false)}
                                            className="w-full text-left px-5 py-3 hover:bg-gray-50 flex items-center gap-4 transition-colors"
                                        >
                                            <span className="text-gray-700 text-sm uppercase w-6 font-bold">{lang.code}</span>
                                            <span className="text-gray-700 font-medium">{lang.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Desktop Phone Button (Hidden on Mobile) */}
                        <a
                            href="tel:5085804610"
                            className="hidden md:flex bg-[#5c2baa] hover:bg-purple-700 text-white px-6 py-2 rounded-md items-center transition"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            (508) 580-4610
                        </a>

                        {/* Mobile Hamburger Button (Visible only on Mobile) */}
                        <button
                            className="md:hidden text-gray-700 focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? (
                                /* Close (X) Icon */
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                /* Hamburger Icon */
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 px-4 flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link 
                                key={link.label}
                                href={link.href} 
                                className="text-gray-600 hover:text-purple-600 font-medium text-lg block"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        {/* Mobile Menu Phone Button */}
                        <a
                            href="tel:5085804610"
                            className="bg-purple-600 text-white py-3 rounded-md flex justify-center items-center font-semibold"
                        >
                             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            (508) 580-4610
                        </a>
                    </div>
                )}
            </div>
        </header>
    );
}