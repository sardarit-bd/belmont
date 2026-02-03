'use client';

import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Pricing() {
    const [openCategory, setOpenCategory] = useState(null);
    const [showFullList, setShowFullList] = useState(false);

    const pricingData = [
        {
            id: 'shirts',
            title: 'Shirts',
            items: [
                { name: 'Shirt (Hanger)', price: '$5.45' },
                { name: 'Shirt (Box)', price: '$6.00' },
                { name: 'Shirt (Laundry)', price: '$4.45' },
                { name: 'Shirt (Press only)', price: '$3.99' }
            ]
        },
        {
            id: 'polos',
            title: 'Polos/T-Shirts',
            items: [
                { name: 'Polos/T-Shirts (Dry Clean)', price: '$6.25' },
                { name: 'Polos/T-Shirts (Press Only)', price: '$4.50' }
            ]
        },
        {
            id: 'sports-jacket',
            title: 'Sports Jacket',
            items: [
                { name: 'Dry Clean', price: '$8.75' },
                { name: 'Press Only', price: '$7.49' }
            ]
        },
        {
            id: 'bottoms',
            title: 'Bottoms',
            items: [
                { name: 'Pants', price: '$7.75' },
                { name: 'Jeans', price: '$8.00' },
                { name: 'Shorts', price: '$7.25' },
                { name: 'Press Only', price: '$5.50' }
            ]
        },
        {
            id: 'robes',
            title: 'Robes',
            items: [
                { name: 'Dry Clean', price: '$20.00' },
                { name: 'Press Only', price: '$15.00' }
            ]
        },
        {
            id: 'skirts',
            title: 'Skirts',
            items: [
                { name: 'Dry Clean', price: '$7.00' },
                { name: 'Press Only', price: '$4.50' }
            ]
        },
        {
            id: 'tops-blouses',
            title: 'Blouses',
            items: [
                { name: 'Dry Clean', price: '$7.00' },
                { name: 'Press Only', price: '$5.45' }
            ]
        },
        {
            id: 'sweaters',
            title: 'Sweaters (Dry Clean)',
            items: [
                { name: 'Light', price: '$7.25' },
                { name: 'Long', price: '$9.75' },
                { name: 'Hoodie', price: '$12.00' },
                { name: 'Press Only', price: '$5.50/$7/$10' }
            ]
        },
        {
            id: 'jackets-coats',
            title: 'Coats (Dry Clean)',
            items: [
                { name: 'Jacket', price: '$18.00' },
                { name: 'Rain Coat', price: '$25.00' },
                { name: 'Over Coat', price: '$25.00' },
                { name: 'Down Coat', price: 'TBD' },
                { name: 'Press Only', price: '$15/$17/$20' }
            ]
        },
        {
            id: 'suits-formal',
            title: 'Suits',
            items: [
                { name: 'Suit (2-piece)', price: '$16.00' },
                { name: 'Suit (3-piece)', price: '$22.00' },
                { name: 'Press Only', price: '$13.50/$17.50' }
            ]
        },
        {
            id: 'dresses',
            title: 'Dresses (with Linen $0.75 extra)',
            items: [
                { name: 'Dry Clean', price: '$15.00' },
                { name: 'Long', price: '$17.25' },
                { name: 'Fancy', price: '$55.00' },
                { name: 'Press Only', price: '$13/$15/$30' }
            ]
        },
        {
            id: 'jogger-suit',
            title: 'Joggers',
            items: [
                { name: '2 pc', price: '$18.00' },
                { name: 'Press Only', price: '$15.00' }
            ]
        },
        {
            id: 'vests-specialty',
            title: 'Vests (Dry Clean)',
            items: [
                { name: 'Waist Coat', price: '$6.45' },
                { name: 'Jacket', price: '$13.50' },
                { name: 'Press Only', price: 'TBD' }
            ]
        },
        {
            id: 'lab-coat',
            title: 'Lab Coat',
            items: [
                { name: 'Dry Clean', price: '$18.50' },
                { name: 'Press Only', price: '$14.00' }
            ]
        },

        {
            id: 'jump-suit',
            title: 'Jump Suit',
            items: [
                { name: 'Dry Clean', price: '$18.50' },
                { name: 'Press Only', price: '$15.00' }
            ]
        },
    ];

    const toggleCategory = (categoryId) => {
        setOpenCategory(openCategory === categoryId ? null : categoryId);
    };

    const displayedData = showFullList ? pricingData : pricingData.slice(0, 5);

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
                        {displayedData.map((category) => (
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

                    {/* Show Full Price List Button */}
                    {!showFullList && (
                        <div className="px-6 py-5 border-t border-gray-200 flex justify-center">
                            <button
                                onClick={() => setShowFullList(true)}
                                className="px-4 py-2 text-sm text-white hover:bg-purple-700 font-medium rounded-lg transition-all duration-300 hover:opacity-90 transform"
                                style={{ backgroundColor: '#361b6b' }}
                            >
                                Show Full Price List
                            </button>
                        </div>
                    )}

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