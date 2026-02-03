import { FaCrown, FaHeart, FaCubes, FaBuilding } from "react-icons/fa";

const categories = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-crown w-8 h-8 text-white" aria-hidden="true"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"></path><path d="M5 21h14"></path></svg>
        ),
        title: "Designer & Couture",
        description: "Expert care for high-end designer garments and couture pieces",
        items: ["Gucci, Prada, Versace", "Custom Couture", "Evening Gowns", "Luxury Suits"],
        color: "bg-gradient-to-br from-purple-600 to-indigo-600",
        // Added explicit hover string for Tailwind detection
        hoverColor: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-indigo-600",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-heart w-8 h-8 text-white" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path></svg>
        ),
        title: "Wedding Services",
        description: "Specialized wedding dress preservation and bridal party services",
        items: ["Wedding Dress Cleaning", "Preservation & Boxing", "Bridal Party Attire", "Veil & Accessories"],
        color: "bg-gradient-to-br from-pink-500 to-purple-600",
        hoverColor: "hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-600",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sparkles w-8 h-8 text-white" aria-hidden="true"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
        ),
        title: "Luxury Textiles",
        description: "Premium care for fine linens, leather, suede, and exotic materials",
        items: ["Leather & Suede", "Silk & Cashmere", "Fine Linens", "Fur Storage"],
        color: "bg-gradient-to-br from-indigo-600 to-purple-700",
        hoverColor: "hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-700",
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-building2 lucide-building-2 w-8 h-8 text-white" aria-hidden="true"><path d="M10 12h4"></path><path d="M10 8h4"></path><path d="M14 21v-3a2 2 0 0 0-4 0v3"></path><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"></path><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"></path></svg>
        ),
        title: "Corporate Accounts",
        description: "Dedicated service for businesses with regular dry cleaning needs",
        items: ["Volume Discounts", "Dedicated Account Rep", "Priority Service", "Monthly Billing"],
        color: "bg-gradient-to-br from-purple-700 to-indigo-800",
        hoverColor: "hover:bg-gradient-to-br hover:from-purple-700 hover:to-indigo-800",
    },
];

export default function ServiceCategories() {
    return (
        <section className="py-20 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 className="text-5xl mb-2">Premium Service Categories</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Expert care for your most valuable garments and large-scale cleaning needs</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {categories.map((cat, idx) => (
                    <div 
                        key={idx} 
                        // Changed from hover:${cat.color} to explicit ${cat.hoverColor}
                        className={`group bg-white rounded-xl p-6 shadow hover:shadow-lg transition upperAnimation ${cat.hoverColor}`}
                    >
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${cat.color} group-hover:border-white group-hover:border-2`}>
                            {cat.icon}
                        </div>
                        
                        <h3 className="mb-3 group-hover:text-white transition-colors">
                            {cat.title}
                        </h3>
                        
                        <p className="text-gray-600 group-hover:text-white/90 transition-colors mb-4">
                            {cat.description}
                        </p>
                        <ul className="opacity-99 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                            {cat.items.map((item, i) => (
                                <li key={i} className="flex items-center gap-3">

                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 group-hover:bg-white shrink-0 transition-colors duration-300"></span>

                                    <span className="text-gray-500 text-sm group-hover:text-white transition-colors duration-300">
                                        {item}
                                    </span>
                                    
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}