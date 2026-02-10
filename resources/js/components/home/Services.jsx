// import { useState, cloneElement } from 'react'; // Added cloneElement to imports
// import { Link } from '@inertiajs/react';

// export default function Services() {
//     const [selectedService, setSelectedService] = useState(null);

//     const services = [
//         {
//             icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shirt w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
//                 </svg>
//             ),
//             title: "Dry Cleaning",
//             description: "Professional dry cleaning for delicate garments, suits, and formal wear with expert stain removal.",
//             process: "Our eco-friendly dry cleaning process uses gentle solvents that effectively clean without water, protecting delicate fabrics and maintaining garment integrity.",
//             handles: {
//                 column1: ["Suits & Blazers", "Silk & Satin Items", "Formal Wear"],
//                 column2: ["Dresses", "Wool Coats", "Delicate Fabrics"]
//             },
//             benefits: [
//                 "Preserves fabric quality",
//                 "Expert stain treatment",
//                 "Professional finishing",
//                 "Gentle on delicate items"
//             ],
//             turnaround: "Standard 2-3 day turnaround, rush service available"
//         },
//         {
//             icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle>
//                 </svg>
//             ),
//             title: "Wash & Fold",
//             description: "Convenient wash and fold service for everyday clothing. Fresh, clean, and neatly folded.",
//             process: "Professional wash and fold service with premium detergents, proper sorting, and careful folding to keep your everyday clothes fresh and ready to wear.",
//             handles: {
//                 column1: ["T-shirts & Tops", "Jeans & Pants", "Casual Wear"],
//                 column2: ["Towels & Linens", "Activewear", "Undergarments"]
//             },
//             benefits: [
//                 "Time-saving convenience",
//                 "Professional quality wash",
//                 "Neatly folded and organized",
//                 "Same-day service available"
//             ],
//             turnaround: "Standard 24-hour turnaround, same-day available"
//         },
//         {
//             icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-wind w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"></path><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"></path><path d="M9.8 4.4A2 2 0 1 1 11 8H2"></path></svg>
//             ),
//             title: "Alterations",
//             description: "Expert tailoring and alterations to ensure your clothes fit perfectly every time.",
//             process: "Skilled tailors provide precise alterations to ensure perfect fit and style for all your garments.",
//             handles: {
//                 column1: ["Hemming", "Taking In/Out", "Zipper Replacement"],
//                 column2: ["Sleeve Adjustments", "Waist Alterations", "Custom Fitting"]
//             },
//             benefits: [
//                 "Expert craftsmanship",
//                 "Perfect fit guaranteed",
//                 "All garment types",
//                 "Reasonable pricing"
//             ],
//             turnaround: "Standard 5-7 day turnaround"
//         },
//         // {
//         //     icon: (
//         //         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-droplets w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"></path><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"></path>
//         //         </svg>
//         //     ),
//         //     title: "Stain Removal",
//         //     description: "Advanced stain removal techniques for even the toughest stains on your garments.",
//         //     process: "Advanced stain removal techniques using specialized treatments for different stain types, ensuring maximum success while protecting fabric integrity.",
//         //     handles: {
//         //         column1: ["Oil & Grease", "Wine & Beverages", "Food Stains"],
//         //         column2: ["Ink & Dye", "Blood & Protein", "Grass & Dirt"]
//         //     },
//         //     benefits: [
//         //         "Advanced techniques",
//         //         "High success rate",
//         //         "Fabric-safe treatments",
//         //         "No damage guarantee"
//         //     ],
//         //     turnaround: "Standard 3-5 day turnaround"
//         // },
//         {
//             icon: (
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-package w-8 h-8 text-[#5c2baa] group-hover:text-white transition-all duration-500 group-hover:scale-110" aria-hidden="true"><path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"></path><path d="M12 22V12"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><path d="m7.5 4.27 9 5.15"></path></svg>
//             ),
//             title: "Pickup & Delivery",
//             description: "Convenient pickup and delivery service at your convenience. Schedule online in minutes.",
//             process: "Convenient pickup and delivery service that saves you time. Schedule online and we'll handle the rest.",
//             handles: {
//                 column1: ["Residential Pickup", "Commercial Service", "Scheduled Routes"],
//                 column2: ["Same-Day Service", "Contactless Delivery", "Text Notifications"]
//             },
//             benefits: [
//                 "Ultimate convenience",
//                 "Flexible scheduling",
//                 "Real-time tracking",
//                 "Safe & secure"
//             ],
//             turnaround: "Pickup within 24 hours of request"
//         }
//     ];

//     return (
//         <>
//             <section className="py-20 scroll-mt-8 bg-gradient-to-b from-white to-purple-50/50" id='services'>
//                 <div className="max-w-7xl mx-auto px-6 lg:px-8">
//                     {/* Header */}
//                     <div className="text-center mb-16">
//                         <h2 className="text-5xl mb-4">
//                             Our Services
//                         </h2>
//                         <p className="text-gray-600 max-w-2xl mx-auto">
//                             From dry cleaning to alterations, we offer comprehensive garment care services to keep your wardrobe looking its best.
//                         </p>
//                     </div>

//                     {/* Service Cards Grid */}
//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                         {services.map((service, index) => (
//                             <div
//                             key={index}
//                             onClick={() => setSelectedService(service)}
//                             className="group relative bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-gray-100 hover:border-purple-200"
//                             >
//                             <div className="absolute inset-0 bg-[#5c2baa] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

//                             <div className="relative z-10">
//                                 {/* Icon */}
//                                 <div className="w-12 h-12 bg-purple-100 group-hover:bg-white/20 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 text-purple-600 group-hover:text-white">
//                                 {service.icon}
//                                 </div>

//                                 {/* Title */}
//                                 <h3 className="mb-3 group-hover:text-white transition-colors duration-500">
//                                 {service.title}
//                                 </h3>

//                                 {/* Description */}
//                                 <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-500 mb-1">
//                                 {service.description}
//                                 </p>

//                                 {/* Learn More Link */}
//                                 <div class=" flex items-center gap-2 text-purple-600 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-0 group-hover:translate-x-2"><span>Learn more</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
//                                 </div>
//                             </div>
//                             </div>
//                         ))}
//                     </div>
//                     <div class="text-center mt-16">
//                         <p class="text-gray-600 mb-6">Need a custom service? We're here to help!</p>

//                         <Link 
//                             href="/#contact" 
//                             className="group relative inline-flex items-center justify-center px-8 py-3 bg-[#361b6b] text-white text-md rounded-2xl overflow-hidden transition-transform duration-300 active:scale-95 shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30"
//                         >
//                             <span className="relative z-10 flex items-center gap-3">
//                                 Contact Us
//                                 <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                                 </svg>
//                             </span>
//                             {/* Button Hover Effect */}
//                             <div className="absolute inset-0 bg-[#5c2baa] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
//                         </Link>
//                     </div>
//                 </div>
//             </section>

//             {/* Modal */}
//             {selectedService && (
//                 <div
//                     className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//                     onClick={() => setSelectedService(null)}
//                 >
//                     <div
//                         className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         {/* Modal Header */}
//                         <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between rounded-t-3xl">
//                             <div className="flex items-center gap-4">
//                                 <div className="bg-[#5c2baa] w-14 h-14 rounded-2xl flex items-center justify-center text-white">
//                                     {/* Used cloneElement to force text-white without changing data structure */}
//                                     {cloneElement(selectedService.icon, { className: "w-8 h-8 text-white" })}
//                                 </div>
//                                 <h2 className="text-2xl font-bold text-gray-900">
//                                     {selectedService.title}
//                                 </h2>
//                             </div>
//                             <button
//                                 onClick={() => setSelectedService(null)}
//                                 className="text-gray-400 hover:text-gray-600 transition-colors"
//                             >
//                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                 </svg>
//                             </button>
//                         </div>

//                         {/* Modal Content */}
//                         <div className="px-8 py-6 space-y-6">
//                             {/* Our Process */}
//                             <div>
//                                 <h3 className="text-[#5c2baa] font-bold text-lg mb-2">Our Process</h3>
//                                 <p className="text-gray-700 leading-relaxed">
//                                     {selectedService.process}
//                                 </p>
//                             </div>

//                             {/* What We Handle */}
//                             <div>
//                                 <h3 className="text-[#5c2baa] font-bold text-lg mb-3">What We Handle</h3>
//                                 <div className="grid grid-cols-2 gap-x-8 gap-y-2">
//                                     <div>
//                                         {selectedService.handles.column1.map((item, idx) => (
//                                             <div key={idx} className="flex items-center gap-2 mb-2">
//                                                 <span className="text-purple-600">•</span>
//                                                 <span className="text-gray-700">{item}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                     <div>
//                                         {selectedService.handles.column2.map((item, idx) => (
//                                             <div key={idx} className="flex items-center gap-2 mb-2">
//                                                 <span className="text-purple-600">•</span>
//                                                 <span className="text-gray-700">{item}</span>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Why Choose Us */}
//                             <div>
//                                 <h3 className="text-[#5c2baa] font-bold text-lg mb-3">Why Choose Us</h3>
//                                 <div className="space-y-2">
//                                     {selectedService.benefits.map((benefit, idx) => (
//                                         <div key={idx} className="flex items-center gap-3">
//                                             <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                             </svg>
//                                             <span className="text-gray-700">{benefit}</span>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Turnaround Time */}
//                             <div className="bg-purple-50 rounded-xl p-4 flex items-start gap-3">
//                                 <svg className="w-6 h-6 text-[#5c2baa] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                                 </svg>
//                                 <div>
//                                     <h4 className="font-semibold text-gray-900 mb-1">Turnaround Time</h4>
//                                     <p className="text-gray-700">{selectedService.turnaround}</p>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Modal Footer */}
//                         <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6 rounded-b-3xl">
//                             <Link
//                                 href="/#pricing"
//                                 className="block w-full bg-[#361b6b] hover:bg-[#5c2baa] text-white text-center px-8 py-4 rounded-xl font-semibold transition-colors shadow-lg"
//                             >
//                                 View Pricing
//                                 <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                                 </svg>
//                             </Link>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }


import React, { useState, cloneElement } from 'react';
import { Shirt, Sparkles, Wind, Package, X, Check } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Services() {
    const [selectedService, setSelectedService] = useState(null);

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
            benefits: [
                "Preserves fabric quality",
                "Expert stain treatment",
                "Professional finishing",
                "Gentle on delicate items"
            ],
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
            benefits: [
                "Time-saving convenience",
                "Professional quality wash",
                "Neatly folded and organized",
                "Same-day service available"
            ],
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
            benefits: [
                "Expert craftsmanship",
                "Perfect fit guaranteed",
                "All garment types",
                "Reasonable pricing"
            ],
            turnaround: "Standard 5-7 day turnaround"
        },
        {
            icon: <Package className="w-8 h-8" />,
            title: "Pickup & Delivery",
            description: "Convenient doorstep service. Schedule online in minutes.",
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
        <section className="py-24 bg-[#fafafa] font-sans" id="services">
            {/* Subtle background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-[#5c2baa]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-5xl text-gray-900 mb-6 tracking-tight">
                        Our Services
                    </h2>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        From dry cleaning to alterations, we offer comprehensive garment care services to keep your wardrobe looking its best.
                    </p>
                </div>

                {/* Unified Card Container */}
                <div className="bg-white rounded-[2.5rem] border border-[#5c2baa]/20 shadow-2xl shadow-[#361b6b]/5 overflow-hidden">
                    {/* Decorative Top Line */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-[#361b6b] via-[#5c2baa] to-[#361b6b]" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#361b6b]/10">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                onClick={() => setSelectedService(service)}
                                className="group relative p-8 cursor-pointer hover:bg-[#fcfaff] transition-all duration-300 h-full flex flex-col"
                            >
                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-[#f3e9ff]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                <div className="relative z-10 flex-grow">
                                    {/* Icon Box */}
                                    <div className="w-16 h-16 bg-[#fcfaff] border border-[#5c2baa]/10 rounded-2xl flex items-center justify-center mb-6 text-[#5c2baa] group-hover:bg-[#361b6b] group-hover:text-white transition-all duration-300 group-hover:scale-110 shadow-sm group-hover:shadow-lg group-hover:shadow-[#361b6b]/20">
                                        {cloneElement(service.icon, { className: "w-8 h-8 transition-transform duration-300 group-hover:rotate-6" })}
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-[#361b6b] mb-3 group-hover:text-[#5c2baa] transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Learn More Link */}
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

                {/* Bottom CTA */}
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
                        {/* Button Hover Effect */}
                        <div className="absolute inset-0 bg-[#5c2baa] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                    </Link>
                </div>
            </div>

            {/* Modal */}
            {selectedService && (
                <div
                    className="fixed inset-0 bg-[#C4C4C4]/60 backdrop-blur-xs flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200"
                    onClick={() => setSelectedService(null)}
                >
                    <div
                        className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-8 py-6 flex items-center justify-between z-10">
                            <div className="flex items-center gap-4">
                                <div className="bg-[#5c2baa] w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#5c2baa]/30">
                                    {cloneElement(selectedService.icon, { className: "w-6 h-6 text-white" })}
                                </div>
                                <h2 className="text-2xl font-bold text-[#361b6b]">
                                    {selectedService.title}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedService(null)}
                                className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 space-y-8">
                            {/* Process Section */}
                            <div className="bg-[#fcfaff] p-6 rounded-2xl border border-[#f3e9ff]">
                                <h3 className="text-[#5c2baa] font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" /> Our Process
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {selectedService.process}
                                </p>
                            </div>

                            {/* What We Handle */}
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

                            {/* Why Choose Us */}
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

                            {/* Turnaround Time */}
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

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-8 py-6 flex justify-end">
                            <a
                                href="/check-rates"
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