import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-[#361b6b] text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 justify-center md:justify-start">
                            {/* Logo */}
                            <div className="w-36 h-10 rounded-lg flex items-center justify-center">
                                <img src="/images/footer.png" alt="Logo" className="" />
                            </div>
                        </div>
                        <p className="mb-4">
                            Premium dry cleaning and laundry services with convenient pickup and delivery.
                        </p>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-lg mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    Dry Cleaning
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    Wash & Fold
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    Pressing & Ironing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    Alterations
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    Stain Removal
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h3 className="text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="/about-us" className="text-purple-100 hover:text-white transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/#contact" className="text-purple-100 hover:text-white transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="/privacy-policy" className="text-purple-100 hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="/terms" className="text-purple-100 hover:text-white transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="/faq" className="text-purple-100 hover:text-white transition-colors">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="/refund" className="text-purple-100 hover:text-white transition-colors">
                                    Refund Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-[#f3e9ff] pt-8 text-center">
                    <p className="text-purple-200">
                        © {new Date().getFullYear()} Belmont Dry Cleaners. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}