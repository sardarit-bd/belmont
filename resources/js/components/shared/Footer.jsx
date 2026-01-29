import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-purple-800 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Logo and Description */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            {/* Logo */}
                            <div className="w-16 h-16 bg-purple-500 rounded-lg flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                        </div>
                        <p className="text-purple-100 text-sm leading-relaxed max-w-xs">
                            Premium dry cleaning and laundry services with convenient pickup and delivery.
                        </p>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Services</h3>
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
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-purple-100 hover:text-white transition-colors">
                                    Refund Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-purple-600 pt-6">
                    <p className="text-center text-purple-200 text-sm">
                        © 2025 Belmont Dry Cleaners. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
