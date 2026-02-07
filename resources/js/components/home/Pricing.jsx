'use client';

import { useState } from 'react';

export default function Pricing() {
    // Categorizing the items into 4 main "Service Boxes" as requested
    const serviceCategories = [
        {
            title: 'Dry Cleaning & Pressing',
            description: 'Combined premium care for your professional wardrobe.',
            icon: (
                <path d="M12 2L2 7V12C2 18.28 6.27 24.07 12 26C17.73 24.07 22 18.28 22 12V7L12 2Z" />
            ),
            groups: [
                {
                    name: 'Suits & Formal',
                    items: [
                        { name: 'Suit (2-piece)', price: '$16.00' },
                        { name: 'Suit (3-piece)', price: '$22.00' },
                        { name: 'Dresses', price: '$15.00' },
                        { name: 'Long Dress', price: '$17.25' },
                        { name: 'Fancy Dress', price: '$55.00' }
                    ]
                },
                {
                    name: 'Outerwear',
                    items: [
                        { name: 'Sports Jacket', price: '$8.75' },
                        { name: 'Rain Coat', price: '$25.00' },
                        { name: 'Over Coat', price: '$25.00' }
                    ]
                }
            ]
        },
        {
            title: 'Premium Shirt Service',
            description: 'Professional laundry and dry cleaning for a crisp finish.',
            icon: (
                <path d="M7 3L5 5H2V21H22V5H19L17 3H7Z" />
            ),
            groups: [
                {
                    name: 'Business Shirts',
                    items: [
                        { name: 'Shirt (Hanger)', price: '$5.45' },
                        { name: 'Shirt (Box)', price: '$6.00' },
                        { name: 'Shirt (Laundry)', price: '$4.45' }
                    ]
                },
                {
                    name: 'Casual Tops',
                    items: [
                        { name: 'Polos / T-Shirts', price: '$6.25' },
                        { name: 'Sweaters (Light)', price: '$7.25' },
                        { name: 'Sweaters (Long)', price: '$9.75' }
                    ]
                }
            ]
        },
        {
            title: 'Daily Wear & Essentials',
            description: 'Meticulous attention for your everyday favorites.',
            icon: (
                <path d="M6 2L3 22H9L12 11L15 22H21L18 2H6Z" />
            ),
            groups: [
                {
                    name: 'Bottoms',
                    items: [
                        { name: 'Pants', price: '$7.75' },
                        { name: 'Jeans', price: '$8.00' },
                        { name: 'Shorts', price: '$7.25' }
                    ]
                },
                {
                    name: 'Tops & Skirts',
                    items: [
                        { name: 'Blouses', price: '$7.00' },
                        { name: 'Skirts', price: '$7.00' }
                    ]
                }
            ]
        },
        {
            title: 'Specialty & Household',
            description: 'Specialized cleaning for unique garments and robes.',
            icon: (
                <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM12 8v4l3 3" />
            ),
            groups: [
                {
                    name: 'Specialty Items',
                    items: [
                        { name: 'Robes', price: '$20.00' },
                        { name: 'Joggers (2pc)', price: '$18.00' },
                        { name: 'Lab Coat', price: '$18.50' },
                        { name: 'Jump Suit', price: '$18.50' }
                    ]
                },
                {
                    name: 'Other Items',
                    items: [
                        { name: 'Waist Coat', price: '$6.45' },
                        { name: 'Vests', price: '$13.50' }
                    ]
                }
            ]
        }
    ];

    return (
        <section id="pricing" className="py-24 scroll-mt-10 bg-[#fafafa] font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-sans mb-6 tracking-tight">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        Pay only for what you need. All items include our quality guarantee and eco-friendly cleaning products.
                    </p>
                </div>

                {/* Main 4-Box Grid (Landscape Redesign) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                    {serviceCategories.map((category, idx) => (
                        <div 
                            key={idx} 
                            className="flex flex-col bg-white border border-[#f3e9ff] rounded-[2rem] shadow-xl shadow-purple-900/[0.03] overflow-hidden transition-all duration-300 hover:shadow-purple-900/[0.08] hover:border-[#d9b6ff] hover:-translate-y-1"
                        >
                            {/* Card Header */}
                            <div className="p-8 bg-[#fcfaff] border-b border-[#f3e9ff]">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#5c2baa] mb-6 shadow-sm border border-[#f3e9ff]">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                        {category.icon}
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-[#361b6b] leading-tight mb-2">
                                    {category.title}
                                </h3>
                                <p className="text-sm text-[#5c2baa] font-medium leading-relaxed">
                                    {category.description}
                                </p>
                            </div>

                            {/* Static Pricing Content (No Scroll) */}
                            <div className="p-8 flex-grow space-y-8">
                                {category.groups.map((group, gIdx) => (
                                    <div key={gIdx} className="space-y-4">
                                        <h4 className="text-[14px] uppercase tracking-[0.15em] text-gray-50 text-center bg-[#361b6b] py-1 rounded-xl font-bold">
                                            {group.name}
                                        </h4>
                                        <div className="space-y-3">
                                            {group.items.map((item, iIdx) => (
                                                <div key={iIdx} className="flex justify-between items-baseline gap-2">
                                                    <span className="text-[#361b6b] font-semibold text-md">
                                                        {item.name}
                                                    </span>
                                                    <div className="flex-grow border-b border-dotted border-[#361b6b] mb-1 opacity-20" />
                                                    <span className="text-[#5c2baa] font-black text-md tabular-nums">
                                                        {item.price}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Card Decorative Footer */}
                            <div className="p-4 bg-[#fcfaff]/50 flex justify-center">
                                <div className="h-1 w-12 bg-[#d9b6ff] rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Notes & CTA */}
                <div className="mt-10">
                    <div className="bg-[#fcfaff] rounded-3xl p-8 border border-[#f3e9ff] grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-[#5c2baa] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">*</span>
                                <p className="text-sm text-[#361b6b] font-medium">Linen garments are subject to a $0.75 extra care fee.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-[#5c2baa] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">**</span>
                                <p className="text-sm text-[#361b6b] font-medium">Free pickup and delivery for all orders exceeding $15.00.</p>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <p className="text-[#361b6b] text-sm mb-4 font-medium">Need a custom quote for bulk or household items?</p>
                            <a 
                                href="#contact" 
                                className="inline-flex items-center gap-2 px-8 py-4 bg-[#361b6b] text-white font-bold rounded-2xl hover:bg-[#5c2baa] transition-all shadow-lg shadow-purple-900/10 active:scale-95"
                            >
                                Contact Our Team
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}