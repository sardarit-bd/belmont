import React, { useState, useEffect, cloneElement } from "react";
import { Shirt, Sparkles, Wind, Package, X, Check } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function Services() {
    const [selectedService, setSelectedService] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const services = [
        {
            icon: <Shirt className="w-8 h-8" />,
            title: "Dry Cleaning",
            description: "Professional care for delicate garments, suits, and formal wear.",
            process: "Our eco-friendly dry cleaning process uses gentle solvents that effectively clean without water, protecting delicate fabrics and maintaining garment integrity.",
            handles: {
                column1: ["Suits & Blazers", "Silk & Satin Items", "Formal Wear"],
                column2: ["Dresses", "Wool Coats", "Delicate Fabrics"]
            },
            benefits: ["Preserves fabric quality", "Expert stain treatment", "Professional finishing", "Gentle on delicate items"],
            turnaround: "Standard 2-3 day turnaround, rush service available"
        },
        {
            icon: <Sparkles className="w-8 h-8" />,
            title: "Wash & Fold",
            description: "Fresh, clean, and neatly folded laundry for your everyday needs.",
            process: "Professional wash and fold service with premium detergents, proper sorting, and careful folding to keep your everyday clothes fresh and ready to wear.",
            handles: {
                column1: ["T-shirts & Tops", "Jeans & Pants", "Casual Wear"],
                column2: ["Towels & Linens", "Activewear", "Undergarments"]
            },
            benefits: ["Time-saving convenience", "Professional quality wash", "Neatly folded and organized", "Same-day service available"],
            turnaround: "Standard 24-hour turnaround, same-day available"
        },
        {
            icon: <Wind className="w-8 h-8" />,
            title: "Alterations",
            description: "Expert tailoring to ensure your clothes fit perfectly every time.",
            process: "Skilled tailors provide precise alterations to ensure perfect fit and style for all your garments.",
            handles: {
                column1: ["Hemming", "Taking In/Out", "Zipper Replacement"],
                column2: ["Sleeve Adjustments", "Waist Alterations", "Custom Fitting"]
            },
            benefits: ["Expert craftsmanship", "Perfect fit guaranteed", "All garment types", "Reasonable pricing"],
            turnaround: "Standard 5-7 day turnaround"
        },
        {
            icon: <Package className="w-8 h-8" />,
            title: "Pickup & Delivery",
            description: "Convenient doorstep service. Schedule online in minutes.",
            process: "Convenient pickup and delivery service that saves you time. Schedule online and we will handle the rest.",
            handles: {
                column1: ["Residential Pickup", "Commercial Service", "Scheduled Routes"],
                column2: ["Same-Day Service", "Contactless Delivery", "Text Notifications"]
            },
            benefits: ["Ultimate convenience", "Flexible scheduling", "Real-time tracking", "Safe & secure"],
            turnaround: "Pickup within 24 hours of request"
        }
    ];

    // Automatic slider logic matching the HowItWorks component
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % services.length);
        }, 3000); // Changes slide every 3 seconds
        return () => clearInterval(timer);
    }, [services.length]);

    return (
        <section className="py-24 bg-[#fafafa] font-sans" id="services">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#5c2baa]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-5xl text-gray-900 mb-6 tracking-tight">Our Services</h2>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        From dry cleaning to alterations, we offer comprehensive garment care services to keep your wardrobe looking its best.
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-[#5c2baa]/20 shadow-2xl shadow-[#361b6b]/5 overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#361b6b] via-[#5c2baa] to-[#361b6b]" />

                    {/* Outer overflow-hidden wrapper specifically for mobile */}
                    <div className="overflow-hidden md:overflow-visible">
                        {/* Flex track translating X on mobile.
                            md:divide-x ensures the borders only appear on desktop.
                        */}
                        <div 
                            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 md:divide-x md:divide-[#361b6b]/10 transition-transform duration-500 ease-in-out md:!transform-none"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedService(service)}
                                    // w-full and flex-shrink-0 ensure it perfectly fits the container width on mobile
                                    className="group relative cursor-pointer p-6 md:p-8 hover:bg-[#fcfaff] transition-all duration-300 flex flex-col h-full w-full flex-shrink-0 md:w-auto md:[&:nth-child(n+3)]:border-t md:[&:nth-child(n+3)]:border-[#361b6b]/10 lg:[&:nth-child(n+3)]:border-t-0"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-b from-[#f3e9ff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="relative z-10 flex-grow">
                                        <div className="w-14 h-14 md:w-16 md:h-16 bg-[#fcfaff] border border-[#5c2baa]/10 rounded-2xl flex items-center justify-center mb-5 md:mb-6 text-[#5c2baa] group-hover:bg-[#361b6b] group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-lg group-hover:shadow-[#361b6b]/20">
                                            {cloneElement(service.icon, { className: "w-7 h-7 md:w-8 md:h-8 transition-transform duration-300 group-hover:rotate-6" })}
                                        </div>
                                        <h3 className="text-lg md:text-xl font-bold text-[#361b6b] mb-2 md:mb-3 group-hover:text-[#5c2baa] transition-colors">{service.title}</h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4 md:mb-6">{service.description}</p>
                                    </div>

                                    <div className="relative z-10 mt-auto pt-4 border-t border-transparent group-hover:border-[#361b6b]/10 transition-colors">
                                        <span className="inline-flex items-center gap-2 text-sm font-bold text-[#5c2baa] group-hover:translate-x-2 transition-transform duration-300">
                                            Learn more
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Removed the "swipe hint" since it slides automatically now */}

                <div className="text-center mt-16">
                    <p className="text-[#361b6b]/60 font-medium mb-6">Need a custom service or specific requirement?</p>
                    <Link
                        href="/#contact"
                        className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#361b6b] text-white text-md rounded-2xl overflow-hidden transition-transform duration-300 active:scale-95 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            Contact Us
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-[#5c2baa] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                    </Link>
                </div>
            </div>

            {selectedService && (
                <div
                    className="fixed inset-0 bg-[#C4C4C4]/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedService(null)}
                >
                    <div
                        className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-8 py-6 flex items-center justify-between z-10">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#5c2baa] w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#5c2baa]/30">
                                    {cloneElement(selectedService.icon, { className: "w-6 h-6 text-white" })}
                                </div>
                                <h2 className="text-2xl font-bold text-[#361b6b]">{selectedService.title}</h2>
                            </div>
                            <button
                                onClick={() => setSelectedService(null)}
                                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8">
                            <div className="bg-[#fcfaff] p-6 rounded-2xl border border-[#f3e9ff]">
                                <h3 className="text-[#5c2baa] font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Our Process
                               </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">{selectedService.process}</p>
                            </div>

                            <div>
                                <h3 className="text-[#361b6b] font-bold text-lg mb-4">What We Handle</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        {selectedService.handles.column1.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#5c2baa]" />
                                                <span className="text-gray-700 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-2">
                                        {selectedService.handles.column2.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#5c2baa]" />
                                                <span className="text-gray-700 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[#361b6b] font-bold text-lg mb-4">Benefits</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {selectedService.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center gap-3 bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                                            <div className="bg-green-100 text-green-600 rounded-full p-1">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="text-gray-700 text-sm font-medium">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#361b6b] rounded-2xl p-6 flex items-start gap-4 text-white shadow-xl shadow-[#361b6b]/10">
                                <div className="bg-white/10 p-2 rounded-lg">
                                    <Wind className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Turnaround Time</h4>
                                    <p className="text-purple-100/90">{selectedService.turnaround}</p>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-6 flex justify-end">
                            <a
                                href="/checkrate"
                                className="inline-flex items-center justify-center px-8 py-3 bg-[#5c2baa] hover:bg-[#361b6b] text-white rounded-xl font-bold transition-colors shadow-lg shadow-[#5c2baa]/20"
                            >
                                Check Rates
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}