import { Link } from '@inertiajs/react';

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center">
                        <img
                            className='h-[50px]'
                            src="https://res.cloudinary.com/dg83pvgls/image/upload/v1769664980/belmont_logo_qjiorc.png" alt="Logo" />
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            href="/#services"
                            className="text-gray-700 hover:text-purple-600 transition"
                        >
                            Services
                        </Link>
                        <Link
                            href="/#pricing"
                            className="text-gray-700 hover:text-purple-600 transition"
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/#Howitworks"
                            className="text-gray-700 hover:text-purple-600 transition"
                        >
                            How It Works
                        </Link>
                        <Link
                            href="/schedule"
                            className="text-gray-700 hover:text-purple-600 transition"
                        >
                            Schedule Pickup
                        </Link>
                        <Link
                            href="/checkrate"
                            className="text-gray-700 hover:text-purple-600 transition"
                        >
                            Check Rates
                        </Link>
                        <Link
                            href="/luxury"
                            className="text-gray-700 hover:text-purple-600 transition"
                        >
                            Luxury
                        </Link>
                        <Link
                            href="/#contact"
                            className="text-gray-700 hover:text-purple-600 transition"
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Right Side */}
                    <div className="flex items-center space-x-4">
                        {/* Language Selector */}
                        <button className="flex items-center text-gray-700 hover:text-purple-600">
                            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            <span>US</span>
                        </button>

                        {/* Phone Button */}
                        <a
                            href="tel:5085804610"
                            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md flex items-center transition"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            (508) 580-4610
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}
