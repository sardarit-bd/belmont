import React from "react";

const packages = [
    {
        label: "Most Popular",
        title: "Wedding Package",
        description: "Complete care for your entire wedding party",
        features: [
            "Wedding dress cleaning & preservation",
            "Bridal party attire (up to 12 people)",
            "Groomsmen suits & accessories",
            "Veil, gloves, and accessory care",
            "Pre-wedding pressing service",
            "Post wedding preservation boxing",
        ],
        cta: "Custom Quote",
    },
    {
        title: "Corporate Event",
        description: "Bulk service for company events and conferences",
        features: [
            "50-200 garments",
            "Bulk service available",
            "Pickup & delivery included",
            "Individual tailored quotes",
            "Quality inspections",
            "Dedicated project manager",
        ],
        cta: "Volume Discounts",
    },
    {
        title: "Hospitality & Hotels",
        description: "Ongoing partnership for hospitality businesses",
        features: [
            "Daily/weekly pickup routes",
            "Staff uniforms",
            "Linens & tablecloths",
            "Garment services",
            "24-48 hour turnaround",
            "Customized service agreements",
        ],
        cta: "Contact Pricing",
    },
];

export default function EventPackages() {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-white to-purple-50/50">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-5xl mb-2">Event & Enterprise Packages</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Customized solutions for weddings, corporate events, and ongoing business partnerships
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-4">
                {packages.map((pkg, idx) => (
                    <div
                        key={idx}
                        className={`relative bg-white rounded-xl shadow hover:shadow-lg transition border ${
                            pkg.label ? "border-[#361b6b] border-2 shadow-xl" : "border-gray-200 border"
                        }`}
                    >
                        {pkg.label && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <span className=" bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-sm whitespace-nowrap">
                                    {pkg.label}
                                </span>
                            </div>
                        )}

                        <div className="p-6">
                            <h3 className="text-2xl mb-2">{pkg.title}</h3>
                            <p className="text-muted-foreground pb-2">{pkg.description}</p>
                            <ul className="text-gray-500 text-sm mb-4 space-y-3">
                                {pkg.features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-900 text-[15px]">
                                        <span className="text-gray-700 text-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-6 border-t">
                                <p className="text-[#361b6b] mb-4">{pkg.cta}</p>
                            </div>
                            <button className="w-full bg-[#361b6b] text-white py-2 rounded-lg font-semibold hover:bg-[#5c2baa] transition">
                                 Get Quote
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}