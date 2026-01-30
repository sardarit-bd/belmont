import React from "react";

const packages = [
    {
        label: "Most Popular",
        title: "Wedding Package",
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
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-semibold mb-2">Event & Enterprise Packages</h2>
                <p className="text-gray-600">
                    Customized solutions for weddings, corporate events, and ongoing business partnerships
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {packages.map((pkg, idx) => (
                    <div
                        key={idx}
                        className={`bg-white rounded-xl shadow hover:shadow-lg transition border ${pkg.label ? "border-purple-600" : "border-transparent"
                            }`}
                    >
                        <div className="p-6">
                            {pkg.label && (
                                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs mb-2">
                                    {pkg.label}
                                </span>
                            )}
                            <h3 className="font-semibold text-lg mb-4">{pkg.title}</h3>
                            <ul className="text-gray-500 text-sm mb-4 space-y-1">
                                {pkg.features.map((f, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span className="text-green-500 font-bold">✔</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition">
                                {pkg.cta} & Get Quote
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
