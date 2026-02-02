'use client';

import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Pricing() {
    const [openCategory, setOpenCategory] = useState(null);

    const pricingData = [
        {
            id: 'shirts',
            title: 'Shirts',
            items: [
                { name: 'Shirt (Hanger)', price: '$5.50' },
                { name: 'Shirt (Box)', price: '$6.00' }
            ]
        },
        {
            id: 'polos',
            title: 'Polos & T-Shirts',
            items: [
                { name: 'Polo Shirt', price: '$5.50' },
                { name: 'T-Shirt', price: '$4.50' }
            ]
        },
        {
            id: 'bottoms',
            title: 'Bottoms',
            items: [
                { name: 'Pants', price: '$7.50' },
                { name: 'Jeans', price: '$7.50' },
                { name: 'Shorts', price: '$6.50' }
            ]
        },
        {
            id: 'tops-blouses',
            title: 'Tops & Blouses',
            items: [
                { name: 'Blouse', price: '$7.50' },
                { name: 'Sweater', price: '$8.50' }
            ]
        },
        {
            id: 'sweaters',
            title: 'Sweaters',
            items: [
                { name: 'Sweater (Regular)', price: '$8.50' },
                { name: 'Sweater (Cashmere)', price: '$12.00' }
            ]
        },
        {
            id: 'jackets-coats',
            title: 'Jackets & Coats',
            items: [
                { name: 'Jacket', price: '$12.00' },
                { name: 'Coat', price: '$15.00' },
                { name: 'Winter Coat', price: '$18.00' }
            ]
        },
        {
            id: 'suits-formal',
            title: 'Suits & Formal',
            items: [
                { name: 'Suit (2-piece)', price: '$18.00' },
                { name: 'Suit (3-piece)', price: '$24.00' },
                { name: 'Tuxedo', price: '$20.00' }
            ]
        },
        {
            id: 'dresses-robes',
            title: 'Dresses & Robes',
            items: [
                { name: 'Dress (Simple)', price: '$12.00' },
                { name: 'Dress (Fancy)', price: '$18.00' },
                { name: 'Evening Gown', price: '$25.00' },
                { name: 'Robe', price: '$10.00' }
            ]
        },
        {
            id: 'vests-specialty',
            title: 'Vests & Specialty',
            items: [
                { name: 'Vest', price: '$7.50' },
                { name: 'Tie', price: '$5.00' },
                { name: 'Scarf', price: '$6.00' }
            ]
        },
        {
            id: 'accessories',
            title: 'Accessories',
            items: [
                { name: 'Hat/Cap', price: '$8.00' },
                { name: 'Gloves', price: '$6.00' },
                { name: 'Belt', price: '$5.00' }
            ]
        },
        {
            id: 'comforters',
            title: 'Comforters',
            items: [
                { name: 'Comforter (Twin)', price: '$25.00' },
                { name: 'Comforter (Full/Queen)', price: '$30.00' },
                { name: 'Comforter (King)', price: '$35.00' }
            ]
        },
        {
            id: 'down-comforters',
            title: 'Down Comforters',
            items: [
                { name: 'Down Comforter (Twin)', price: '$30.00' },
                { name: 'Down Comforter (Full/Queen)', price: '$35.00' },
                { name: 'Down Comforter (King)', price: '$40.00' }
            ]
        },
        {
            id: 'blankets',
            title: 'Blankets',
            items: [
                { name: 'Blanket (Regular)', price: '$15.00' },
                { name: 'Blanket (Large)', price: '$20.00' }
            ]
        },
        {
            id: 'table-cloths',
            title: 'Table Cloths',
            items: [
                { name: 'Table Cloth (Small)', price: '$12.00' },
                { name: 'Table Cloth (Large)', price: '$18.00' }
            ]
        },
        {
            id: 'drapes',
            title: 'Drapes',
            items: [
                { name: 'Drapes (per panel)', price: '$20.00' },
                { name: 'Curtains (per panel)', price: '$15.00' }
            ]
        }
    ];

    const toggleCategory = (categoryId) => {
        setOpenCategory(openCategory === categoryId ? null : categoryId);
    };

    return (
        <section id="pricing" className="py-20 scroll-mt-10 bg-gradient-to-l from-pink-50/50 to-white" animation="fade-up">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl text-gray-900 mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Pay only for what you need. All items include our quality guarantee and eco-friendly cleaning products.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    {/* Card Header */}
                    <div className="bg-gray-50 px-6 py-5 border-b border-gray-200">
                        <h3 className="text-xl text-gray-900">Price List by Item Type</h3>
                        <p className="text-md text-gray-600 mt-1">Click each category to view detailed pricing</p>
                    </div>

                    {/* Accordion */}
                    <div className="divide-y divide-gray-200">
                        {pricingData.map((category) => (
                            <div key={category.id} className="overflow-hidden">
                                {/* Accordion Header */}
                                <button
                                    onClick={() => toggleCategory(category.id)}
                                    className="w-full px-6 py-4 flex items-center justify-between transition-all duration-300"
                                >
                                    <span className="text-gray-900 hover:text-purple-700 hover:underline">{category.title}</span>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 transition-transform duration-300 ease-in-out ${openCategory === category.id ? 'rotate-180' : 'rotate-0'
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Accordion Content with smooth animation */}
                                <div
                                    className={`transition-all duration-300 ease-in-out ${openCategory === category.id
                                        ? 'max-h-96 opacity-100'
                                        : 'max-h-0 opacity-0'
                                        }`}
                                    style={{
                                        overflow: 'hidden'
                                    }}
                                >
                                    <div className="px-6 py-3">
                                        {/* CHANGED: grid-cols-1 for mobile, md:grid-cols-2 for tablet/desktop */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {category.items.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-gray-50 rounded-lg px-4 py-2 flex items-center justify-between transform transition-all duration-300 ease-out"
                                                    style={{
                                                        transitionDelay: `${idx * 50}ms`
                                                    }}
                                                >
                                                    <span className="text-gray-700">{item.name}</span>
                                                    <span className="text-purple-600 font-medium">{item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Notes */}
                    <div className="bg-gray-50 px-6 py-5 border-t border-gray-200 space-y-2">
                        <p className="text-sm text-gray-600">
                            * Prices may vary based on garment condition and special treatments required.
                        </p>
                        <p className="text-sm text-gray-600">
                            ** Minimum order of $15 for free pickup and delivery.
                        </p>
                    </div>
                </div>

                {/* Contact CTA */}
                <div className="text-center mt-8">
                    <p className="text-gray-600">
                        Questions about pricing?{' '}
                        <Link href="/#contact" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                            Contact us
                        </Link>
                        {' '}for a custom quote.
                    </p>
                </div>
            </div>
        </section>
    );
}