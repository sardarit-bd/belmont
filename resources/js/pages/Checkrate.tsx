import React, { useState } from "react";
import AppHeaderLayout from "@/layouts/app/app-header-layout";

export default function CheckRates() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [expandedCategories, setExpandedCategories] = useState({
        shirts: false,
        polos: false,
        bottoms: false,
        tops: false,
    });

    const services = {
        shirts: [
            { id: 1, name: "Shirt (Hanger)", price: 5.5, description: "test" },
            { id: 2, name: "Shirt (Box)", price: 6.0, description: "test" },
            { id: 3, name: "Shirt (Laundry)", price: 4.45, description: "test" },
        ],
        polos: [{ id: 4, name: "Polo Shirt", price: 7.0, description: "test" }],
        bottoms: [
            { id: 5, name: "Pants", price: 8.5, description: "test" },
            { id: 6, name: "Jeans", price: 9.0, description: "test" },
            { id: 7, name: "Shorts", price: 7.5, description: "test" },
        ],
        tops: [
            { id: 8, name: "Blouse", price: 8.0, description: "test" },
            { id: 9, name: "Sweater", price: 10.0, description: "test" },
        ],
    };

    const categoryLabels = {
        shirts: "Shirts",
        polos: "Polos",
        bottoms: "Bottoms",
        tops: "Tops",
    };

    const addToCart = (item) => {
        const existing = cart.find((c) => c.id === item.id);

        if (existing) {
            setCart(
                cart.map((c) =>
                    c.id === item.id
                        ? { ...c, quantity: c.quantity + 1 }
                        : c
                )
            );
        } else {
            setCart([...cart, { ...item, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) =>
        setCart(cart.filter((item) => item.id !== id));

    const updateQuantity = (id, delta) => {
        setCart(
            cart
                .map((item) =>
                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity + delta,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const getTotalItems = () =>
        cart.reduce((sum, item) => sum + item.quantity, 0);

    const getTotalPrice = () =>
        cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const toggleCategory = (cat) => {
        setExpandedCategories((prev) => ({
            ...prev,
            [cat]: !prev[cat],
        }));
    };

    return (
        <AppHeaderLayout>
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    
                    {/* NEW HEADER SECTION */}
                    <div className="text-center mb-8">
                        <h1 className="mb-6 text-5xl md:text-6xl">
                            Check Rates
                        </h1>
                        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                            Browse our services, add items to your cart, and get an estimated quote. All prices are
                            estimates and may vary based on garment condition.
                        </p>
                    </div>

                    {/* CART BAR OR BUTTON */}
                    <div className="max-w-4xl mx-auto">
                        {cart.length === 0 ? (
                        <div className="flex justify-center mb-10">
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="bg-[#8b2cf5] text-white px-4 py-2 rounded-xl shadow-lg hover:bg-purple-700 flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-shopping-cart w-5 h-5 mr-2" aria-hidden="true"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg> View Cart
                            </button>
                        </div>
                    ) : (
                        <div className="bg-[#9300e8] rounded-2xl shadow-xl p-4 px-6 mb-10 flex flex-col md:flex-row items-center justify-between text-white max-w-4xl mx-auto gap-4">
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart w-6 h-6"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium opacity-90 text-purple-100">Your Cart</p>
                                    <p className="text-2xl">{getTotalItems()} {getTotalItems() === 1 ? 'Item' : 'Items'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <div className="text-right">
                                    <p className="text-sm font-medium opacity-90 text-purple-100">Estimated Total</p>
                                    <p className="text-3xl font-bold">~${getTotalPrice().toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => setIsCartOpen(true)}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-10 rounded-md px-6 has-[>svg]:px-4 bg-white text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                                >
                                    View Cart
                                </button>
                            </div>
                        </div>
                    )}
                    </div>

                    {/* NEW IMPORTANT NOTICE BOX */}
                    <div className="bg-[#fffdf2] border border-[#f5e6b3] rounded-2xl p-5 flex items-start gap-4 mb-10 text-left max-w-3xl mx-auto">
                        <div className="bg-[#facc15] text-white p-1 rounded-full flex-shrink-0 mt-0.5 w-5 h-5 flex items-center justify-center text-xs font-bold">
                            !
                        </div>
                        <p className="text-[#854d0e] text-sm leading-relaxed">
                            <span className="font-bold">Important:</span> Prices shown are estimates only. Final pricing will be confirmed after garment inspection and may vary based on fabric type, condition, and special treatments required.
                        </p>
                    </div>

                    {/* SERVICE LIST */}
                    <div className="space-y-4">
                        {Object.entries(services).map(([category, items]) => (
                            <div
                                key={category}
                                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleCategory(category)}
                                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50"
                                >
                                    <h2 className="text-semibold text-gray-800">
                                        {categoryLabels[category]}
                                    </h2>
                                    <div className="flex items-center gap-4">
                                        <span className="inline-flex items-center justify-center rounded-md border border-transparent px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 whitespace-nowrap shrink-0 transition-colors overflow-hidden">
                                            {items.length} items
                                        </span>
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            width="24" 
                                            height="24" 
                                            viewBox="0 0 24 24" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            strokeWidth="2" 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            className={`lucide lucide-chevron-down text-gray-400 pointer-events-none w-4 h-4 shrink-0 transition-transform duration-200 ${expandedCategories[category] ? "rotate-180" : "translate-y-0.5"}`}
                                        >
                                            <path d="m6 9 6 6 6-6"></path>
                                        </svg>
                                    </div>
                                </button>

                                {expandedCategories[category] && (
                                    <div className="grid md:grid-cols-3 gap-4 p-6 border-t border-gray-50">
                                        {items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="border border-gray-100 rounded-lg p-4 flex flex-col justify-between"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="font-semibold text-gray-800">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-purple-600 font-bold shrink-0 ml-2">
                                                        ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                                <div className="mb-2">
                                                    <p className="text-gray-600">{item.description}</p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        addToCart(item)
                                                    }
                                                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4 mr-2" aria-hidden="true"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                                                    Add to Cart
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CART DRAWER */}
            {isCartOpen && (
                <>
                    {/* OVERLAY */}
                    <div
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/30 z-40"
                    />

                    {/* PANEL */}
                    <div className="fixed right-0 top-0 h-full w-full md:w-[420px] bg-[#faf7ff] z-50 shadow-2xl flex flex-col">

                        {/* HEADER */}
                        <div className="flex items-start justify-between p-6 border-b">
                            <div className="flex gap-3">
                                <div className="bg-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                                    🛒
                                </div>
                                <div>
                                    <h2 className="font-bold text-xl">Your Cart</h2>
                                    <p className="text-sm text-gray-500">
                                        {getTotalItems()} item ready for estimate
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="text-xl text-gray-500"
                            >
                                ✕
                            </button>
                        </div>

                        {/* ITEMS */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4">

                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl p-4 shadow-sm border"
                                >
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-semibold">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                Shirts
                                            </p>
                                            <p className="text-purple-600 font-semibold">
                                                ${item.price.toFixed(2)} each
                                            </p>
                                        </div>

                                        <button
                                            onClick={() =>
                                                removeFromCart(item.id)
                                            }
                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:hover:bg-accent/50 h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 -mt-1"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2 lucide-trash-2 w-4 h-4" aria-hidden="true"><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path><path d="M3 6h18"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between bg-purple-50 rounded-lg mt-2">

                                        {/* QTY */}
                                        <div className="flex gap-3 items-center bg-purple-50 px-2 py-1 rounded-xl">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, -1)
                                                }
                                                className="bg-white border rounded-lg w-8 h-8"
                                            >
                                                −
                                            </button>

                                            <span className="font-semibold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.id, 1)
                                                }
                                                className="bg-white border rounded-lg w-8 h-8"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <p className="font-bold text-purple-600 px-2">
                                            ~$
                                            {(item.price * item.quantity).toFixed(
                                                2
                                            )}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* TOTAL BOX */}
                        {cart.length > 0 && (
                            <>
                                <div className="mx-5 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white p-5 space-y-3">

                                    <div className="flex items-center justify-between text-purple-100">
                                        <span>Total Items:</span>
                                        <span className="text-xl">{getTotalItems()}</span>
                                    </div>

                                    <hr className="opacity-30" />

                                    <div className="flex justify-between items-center">
                                        <span className="text-lg">
                                            Estimated Total:
                                        </span>
                                        <span className="text-3xl font-bold">
                                            ~${getTotalPrice().toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* WARNING */}
                                <div className="mx-5 mt-4 bg-yellow-50 border border-yellow-300 rounded-xl p-4 text-sm text-yellow-800">
                                    <strong>Important:</strong> Prices are
                                    estimates only.
                                    Text{" "}
                                    <span className="font-bold">
                                        508-718-7711
                                    </span>{" "}
                                    to confirm the final amount.
                                </div>

                                {/* ACTIONS */}
                                <div className="p-5 space-y-3">

                                    <button className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold flex justify-center gap-2">
                                        🛒 Text for Quote Confirmation
                                    </button>

                                    <button className="w-full border py-4 rounded-xl font-semibold flex justify-center gap-2">
                                        📞 Call to Schedule Pickup
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}

        </AppHeaderLayout>
    );
}