'use client';

import { Link } from '@inertiajs/react';
import React from 'react';

export default function Pricing() {
    // 1. Main Service Headers (No Prices)
    const serviceCategories = [
        {
            title: 'Dry Cleaning',
            description: 'Premium care for professional wardrobes.',
            icon: (
                <path d="M12 2L2 7V12C2 18.28 6.27 24.07 12 26C17.73 24.07 22 18.28 22 12V7L12 2Z" />
            ),
        },
        {
            title: 'Premium Shirt Service',
            description: 'Hand-finished collars and crisp cuffs.',
            icon: (
                <path d="M7 3L5 5H2V21H22V5H19L17 3H7Z" />
            ),
        },
        {
            title: 'Daily Wear & Essentials',
            description: 'Meticulous laundry for everyday favorites.',
            icon: (
                <path d="M6 2L3 22H9L12 11L15 22H21L18 2H6Z" />
            ),
        },
        {
            title: 'Specialty & Household',
            description: 'Care for robes, linens, and unique items.',
            icon: (
                <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 8v4l3 3" />
            ),
        }
    ];

    // 2. Sneak Peek Data (Dry Cleaning Only)
    const sneakPeekData = {
        title: 'Sneak Peek: Dry Cleaning',
        description: 'Curious about our rates? Here is a glimpse of our most popular dry cleaning items. We use eco-friendly solvents that are tough on stains but gentle on your fabrics.',
        items: [
            { name: 'Suit (2-piece)', price: '$16.00' },
            { name: 'Dresses', price: '$15.00' },
            { name: 'Pants / Trousers', price: '$7.75' },
            { name: 'Blouses', price: '$7.00' }
        ]
    };

    return (
        <section id="pricing" className="relative py-24 bg-[#fafafa] overflow-hidden font-sans">
            {/* Subtle background decoration - Top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#5c2baa]/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            {/* Subtle background decoration - Bottom Right */}
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-[#361b6b]/5 blur-[100px] rounded-full pointer-events-none -z-10 translate-y-1/3 translate-x-1/4" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                
                {/* --- PART 1: HEADER --- */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-5xl text-gray-900 mb-6 tracking-tight">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-md text-gray-500 leading-relaxed">
                        Pay only for what you need. Browse our core services below or check our full rate card.
                    </p>
                </div>

                {/* --- PART 2: SERVICES GRID (NO PRICES) --- */}
                <div className="bg-white rounded-[2.5rem] border border-[#5c2baa]/20 shadow-xl shadow-[#361b6b]/5 overflow-hidden mb-16 relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#361b6b]/10">
                        {serviceCategories.map((category, idx) => (
                            <div 
                                key={idx} 
                                className="group relative p-8 flex flex-col items-center text-center transition-all duration-500 hover:bg-[#fcfaff]"
                            >
                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#f3e9ff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Icon */}
                                <div className="relative z-10 w-14 h-14 mb-5 rounded-2xl bg-[#fcfaff] border border-[#5c2baa]/20 flex items-center justify-center text-[#5c2baa] shadow-sm group-hover:bg-[#361b6b] group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                        {category.icon}
                                    </svg>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold text-[#361b6b] mb-2 group-hover:text-[#5c2baa] transition-colors">
                                        {category.title}
                                    </h3>
                                    <p className="text-[#361b6b]/60 text-sm leading-relaxed font-medium">
                                        {category.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative max-w-4xl mx-auto mb-16">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#5c2baa] to-[#361b6b] rounded-[2.5rem] opacity-20 blur-lg" />
                    <div className="relative bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/80 p-8 md:p-12 overflow-hidden">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                            {/* Left: Text & Button */}
                            <div className="space-y-6">
                                <div className="inline-flex items-center gap-2 text-[#5c2baa] font-bold uppercase tracking-wider text-xs">
                                    <span className="w-2 h-2 rounded-full bg-[#5c2baa] animate-pulse" />
                                    Featured Service
                                </div>
                                <h3 className="text-3xl font-bold text-[#361b6b]">
                                    {sneakPeekData.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {sneakPeekData.description}
                                </p>
                                
                                {/* Specific "Learn More" for Sneak Peek - UPDATED TO LINK */}
                                <Link 
                                    href="/checkrate" 
                                    className="group inline-flex items-center gap-2 text-[#361b6b] font-bold border-b-2 border-[#5c2baa]/30 hover:border-[#5c2baa] pb-1 transition-all"
                                >
                                    Learn more about Dry Cleaning
                                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                                </Link>
                            </div>

                            {/* Right: Price List */}
                            <div className="bg-white/80 rounded-2xl p-6 border border-[#5c2baa]/10 shadow-lg shadow-[#361b6b]/5">
                                <div className="space-y-4">
                                    {sneakPeekData.items.map((item, idx) => (
                                        <div key={idx} className="flex items-baseline justify-between">
                                            <span className="text-[#361b6b] font-medium">{item.name}</span>
                                            <div className="flex-grow mx-3 border-b border-dotted border-[#361b6b]/30" />
                                            <span className="text-[#5c2baa] font-bold">{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MAIN CTA --- */}
                <div className="flex flex-col items-center justify-center text-center space-y-6">
                    <Link 
                            href="/checkrate" 
                            className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#361b6b] text-white text-md rounded-2xl overflow-hidden transition-transform duration-300 active:scale-95 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                Check Full Rates
                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                            {/* Button Hover Effect */}
                            <div className="absolute inset-0 bg-[#5c2baa] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                        </Link>
                    
                    <p className="text-sm text-[#361b6b]/50 italic">
                        *Full pricing available for all service categories.
                    </p>
                </div>
            </div>
        </section>
    );
}