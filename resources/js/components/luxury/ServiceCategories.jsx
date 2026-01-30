import { FaCrown, FaHeart, FaCubes, FaBuilding } from "react-icons/fa";

const categories = [
    {
        icon: <FaCrown className="text-white w-6 h-6" />,
        title: "Designer & Couture",
        items: ["Gucci, Prada, Versace", "Custom Couture", "Evening Gowns", "Luxury Suits"],
        color: "bg-purple-600",
    },
    {
        icon: <FaHeart className="text-white w-6 h-6" />,
        title: "Wedding Services",
        items: ["Wedding Dress Cleaning", "Preservation & Boxing", "Bridal Party Attire", "Veil & Accessories"],
        color: "bg-pink-500",
    },
    {
        icon: <FaCubes className="text-white w-6 h-6" />,
        title: "Luxury Textiles",
        items: ["Leather & Suede", "Silk & Cashmere", "Fine Linens", "Fur Storage"],
        color: "bg-purple-700",
    },
    {
        icon: <FaBuilding className="text-white w-6 h-6" />,
        title: "Corporate Accounts",
        items: ["Volume Discounts", "Dedicated Account Rep", "Priority Service", "Monthly Billing"],
        color: "bg-purple-800",
    },
];

export default function ServiceCategories() {
    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-3xl font-semibold mb-2">Premium Service Categories</h2>
                <p className="text-gray-600">Expert care for your most valuable garments and large-scale cleaning needs</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                {categories.map((cat, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition upperAnimation">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${cat.color}`}>
                            {cat.icon}
                        </div>
                        <h3 className="font-semibold mb-2">{cat.title}</h3>
                        <ul className="text-gray-500 text-sm list-disc list-inside space-y-1">
                            {cat.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
