import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Services() {
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
            title: "Dry Cleaning",
            description: "Professional dry cleaning for delicate garments, suits, and formal wear with expert stain removal.",
            process: "Our eco-friendly dry cleaning process uses gentle solvents that effectively clean without water, protecting delicate fabrics and maintaining garment integrity.",
            handles: {
                column1: ["Suits & Blazers", "Silk & Satin Items", "Formal Wear"],
                column2: ["Dresses", "Wool Coats", "Delicate Fabrics"]
            },
            benefits: [
                "Preserves fabric quality",
                "Expert stain treatment",
                "Professional finishing",
                "Gentle on delicate items"
            ],
            turnaround: "Standard 2-3 day turnaround, rush service available"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
            ),
            title: "Wash & Fold",
            description: "Convenient wash and fold service for everyday clothing. Fresh, clean, and neatly folded.",
            process: "Professional wash and fold service with premium detergents, proper sorting, and careful folding to keep your everyday clothes fresh and ready to wear.",
            handles: {
                column1: ["T-shirts & Tops", "Jeans & Pants", "Casual Wear"],
                column2: ["Towels & Linens", "Activewear", "Undergarments"]
            },
            benefits: [
                "Time-saving convenience",
                "Professional quality wash",
                "Neatly folded and organized",
                "Same-day service available"
            ],
            turnaround: "Standard 24-hour turnaround, same-day available"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
            ),
            title: "Pressing & Ironing",
            description: "Professional pressing and ironing services to keep your clothes crisp and wrinkle-free.",
            process: "Expert pressing using professional equipment to achieve crisp, wrinkle-free results that last longer than home ironing.",
            handles: {
                column1: ["Dress Shirts", "Blouses", "Pants & Trousers"],
                column2: ["Skirts & Dresses", "Tablecloths", "Bed Linens"]
            },
            benefits: [
                "Professional crisp finish",
                "Wrinkle-free guarantee",
                "Extended fabric life",
                "Quick turnaround"
            ],
            turnaround: "Standard 1-2 day turnaround"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
                </svg>
            ),
            title: "Alterations",
            description: "Expert tailoring and alterations to ensure your clothes fit perfectly every time.",
            process: "Skilled tailors provide precise alterations to ensure perfect fit and style for all your garments.",
            handles: {
                column1: ["Hemming", "Taking In/Out", "Zipper Replacement"],
                column2: ["Sleeve Adjustments", "Waist Alterations", "Custom Fitting"]
            },
            benefits: [
                "Expert craftsmanship",
                "Perfect fit guaranteed",
                "All garment types",
                "Reasonable pricing"
            ],
            turnaround: "Standard 5-7 day turnaround"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            title: "Stain Removal",
            description: "Advanced stain removal techniques for even the toughest stains on your garments.",
            process: "Advanced stain removal techniques using specialized treatments for different stain types, ensuring maximum success while protecting fabric integrity.",
            handles: {
                column1: ["Oil & Grease", "Wine & Beverages", "Food Stains"],
                column2: ["Ink & Dye", "Blood & Protein", "Grass & Dirt"]
            },
            benefits: [
                "Advanced techniques",
                "High success rate",
                "Fabric-safe treatments",
                "No damage guarantee"
            ],
            turnaround: "Standard 3-5 day turnaround"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
            title: "Pickup & Delivery",
            description: "Convenient pickup and delivery service at your convenience. Schedule online in minutes.",
            process: "Convenient pickup and delivery service that saves you time. Schedule online and we'll handle the rest.",
            handles: {
                column1: ["Residential Pickup", "Commercial Service", "Scheduled Routes"],
                column2: ["Same-Day Service", "Contactless Delivery", "Text Notifications"]
            },
            benefits: [
                "Ultimate convenience",
                "Flexible scheduling",
                "Real-time tracking",
                "Safe & secure"
            ],
            turnaround: "Pickup within 24 hours of request"
        }
    ];

    return (
        <>
            <section className="py-20 scroll-mt-8" id='services'>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Our Services
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            From dry cleaning to alterations, we offer comprehensive garment care services to keep your wardrobe looking its best.
                        </p>
                    </div>

                    {/* Service Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedService(service)}
                                className="group bg-white hover:bg-gradient-to-br hover:from-purple-600 hover:to-purple-700 rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
                            >
                                {/* Icon */}
                                <div className="bg-purple-100 group-hover:bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-purple-600 group-hover:text-white transition-all ">
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-white mb-3 transition-colors">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 group-hover:text-white/90 leading-relaxed mb-4 transition-colors">
                                    {service.description}
                                </p>

                                {/* Learn More Link */}
                                <div className="flex items-center text-purple-600 group-hover:text-white font-semibold transition-colors">
                                    <span>Learn more</span>
                                    <svg
                                        className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Modal */}
            {selectedService && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setSelectedService(null)}
                >
                    <div
                        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-600 w-14 h-14 rounded-2xl flex items-center justify-center text-white">
                                    {selectedService.icon}
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {selectedService.title}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedService(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="px-8 py-6 space-y-6">
                            {/* Our Process */}
                            <div>
                                <h3 className="text-purple-600 font-bold text-lg mb-2">Our Process</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {selectedService.process}
                                </p>
                            </div>

                            {/* What We Handle */}
                            <div>
                                <h3 className="text-purple-600 font-bold text-lg mb-3">What We Handle</h3>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                    <div>
                                        {selectedService.handles.column1.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 mb-2">
                                                <span className="text-purple-600">•</span>
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        {selectedService.handles.column2.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-2 mb-2">
                                                <span className="text-purple-600">•</span>
                                                <span className="text-gray-700">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Why Choose Us */}
                            <div>
                                <h3 className="text-purple-600 font-bold text-lg mb-3">Why Choose Us</h3>
                                <div className="space-y-2">
                                    {selectedService.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Turnaround Time */}
                            <div className="bg-purple-50 rounded-xl p-4 flex items-start gap-3">
                                <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">Turnaround Time</h4>
                                    <p className="text-gray-700">{selectedService.turnaround}</p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6 rounded-b-3xl">
                            <Link
                                href="/pricing"
                                className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
                            >
                                View Pricing
                                <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
