import { useState, cloneElement } from 'react'; // Added cloneElement to imports
import { Link } from '@inertiajs/react';

export default function Services() {
    const [selectedService, setSelectedService] = useState(null);

    const services = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shirt w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-flame w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"></path></svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-wind w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"></path><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"></path><path d="M9.8 4.4A2 2 0 1 1 11 8H2"></path></svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-droplets w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-package w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
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
            <section className="py-20 scroll-mt-8 bg-gradient-to-b from-white to-purple-50/50" id='services'>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-5xl mb-4">
                            Our Services
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            From dry cleaning to alterations, we offer comprehensive garment care services to keep your wardrobe looking its best.
                        </p>
                    </div>

                    {/* Service Cards Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <div
                            key={index}
                            onClick={() => setSelectedService(service)}
                            className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 hover:border-purple-200"
                            >
                            <div className="absolute inset-0 bg-[#5c2baa] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-16 h-16 bg-purple-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 text-purple-600 group-hover:text-white">
                                {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="mb-3 group-hover:text-white transition-colors duration-500">
                                {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-500 mb-4">
                                {service.description}
                                </p>

                                {/* Learn More Link */}
                                <div class="mt-6 flex items-center gap-2 text-purple-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-0 group-hover:translate-x-2"><span>Learn more</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                                </div>
                            </div>
                            </div>
                        ))}
                    </div>
                    <div class="text-center mt-16">
                        <p class="text-gray-600 mb-6">Need a custom service? We're here to help!</p>

                        <a href="#contact" class="inline-flex items-center gap-2 bg-[#5c2baa] text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-xl"><span>Contact Us</span><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </a>
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
                                <div className="bg-[#5c2baa] w-14 h-14 rounded-2xl flex items-center justify-center text-white">
                                    {/* Used cloneElement to force text-white without changing data structure */}
                                    {cloneElement(selectedService.icon, { className: "w-8 h-8 text-white" })}
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
                                <h3 className="text-[#5c2baa] font-bold text-lg mb-2">Our Process</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    {selectedService.process}
                                </p>
                            </div>

                            {/* What We Handle */}
                            <div>
                                <h3 className="text-[#5c2baa] font-bold text-lg mb-3">What We Handle</h3>
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
                                <h3 className="text-[#5c2baa] font-bold text-lg mb-3">Why Choose Us</h3>
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
                                <svg className="w-6 h-6 text-[#5c2baa] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                href="/#pricing"
                                className="block w-full bg-[#361b6b] hover:bg-[#5c2baa] text-white text-center px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
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